<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import {
		FilesetResolver,
		PoseLandmarker,
		type NormalizedLandmark,
	} from '@mediapipe/tasks-vision';
	import type { ExerciseId } from '../config';

	type DetectorMode = 'loading' | 'pose' | 'manual';
	type SegmentStatus = { label: string; ok: boolean };
	type TutorialStageStatus = 'active' | 'complete';
	type TutorialTelemetryPayload =
		| { reset: true }
		| { stage: string; message: string; progress: number; status?: TutorialStageStatus };

	export let exerciseId: ExerciseId | null = null;
	export let active = false;
	export let tutorial = false;

	const dispatch = createEventDispatcher<{
		rep: void;
		modechange: { mode: DetectorMode; message?: string };
		status: string;
		error: string;
		coaching: { message: string; tone: 'info' | 'warn' | 'success' };
		segments: SegmentStatus[];
		telemetry: TutorialTelemetryPayload;
	}>();

	let video: HTMLVideoElement;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;

	let poseLandmarker: PoseLandmarker | null = null;
	let detectionHandle: number | null = null;
	let mediaStream: MediaStream | null = null;
	let detectorMode: DetectorMode = 'loading';
	let detectionReady = false;
	let fallbackMessage = '';
	let feedbackPulse = false;
	let pulseTimeout: ReturnType<typeof setTimeout> | null = null;
	let repCooldown = false;
	const cooldownMs = 420;
	const visibilityThreshold = 0.3;
	const SQUAT_STANDING_ANGLE = 165;
	const SQUAT_TARGET_ANGLE = 90;
	const SQUAT_DESCENT_THRESHOLD = 0.75;
	const SQUAT_ASCENT_THRESHOLD = 0.9;
	const PUSHUP_DEPTH_TARGET = 0.05;
	const PUSHUP_EXTENSION_TARGET = 0.08;
	const PUSHUP_EXTENSION_DELTA = 0.08;
	const PUSHUP_ALIGNMENT_TOLERANCE = 0.12;
	const SITUP_LIFT_DELTA = 0.18;
	const SITUP_RETURN_THRESHOLD = 0.05;
	const SITUP_SIDE_ALIGNMENT_THRESHOLD = 0.08;
	let lastCoaching = '';
	let coachingText = 'Colócate dentro del encuadre para comenzar.';
	let coachingTone: 'info' | 'warn' | 'success' = 'info';
	let tutorialTimelineActive = false;
	let tutorialHasMovementStage = false;
	let postureStageComplete = false;
	let lastTutorialStage: string | null = null;
	let previousTutorial = tutorial;

	const state = {
		squats: { phase: 'up' as 'up' | 'down', lastTransition: 0 },
		pushups: {
			phase: 'up' as 'up' | 'down',
			lastTransition: 0,
			depthReached: false,
			minChestToGround: Number.POSITIVE_INFINITY,
		},
		situps: {
			phase: 'down' as 'up' | 'down',
			lastTransition: 0,
			baseShoulderY: null as number | null,
			maxLift: 0,
		},
	};

	const SEGMENT_REQUIREMENTS: Record<ExerciseId, Array<{ label: string; indices: number[] }>> = {
		squats: [
			{ label: 'Hombros', indices: [11, 12] },
			{ label: 'Caderas', indices: [23, 24] },
			{ label: 'Rodillas', indices: [25, 26] },
		],
		pushups: [
			{ label: 'Hombros', indices: [11, 12] },
			{ label: 'Caderas', indices: [23, 24] },
			{ label: 'Muñecas', indices: [15, 16] },
		],
		situps: [
			{ label: 'Hombros', indices: [11, 12] },
			{ label: 'Caderas', indices: [23, 24] },
			{ label: 'Rodillas', indices: [25, 26] },
		],
	};

	let lastDetectTime = 0;
	const detectIntervalMs = 70;

	onMount(async () => {
		if (typeof navigator === 'undefined') {
			enableFallback(
				'La cámara no está disponible en este entorno. Usa los controles manuales.',
			);
			return;
		}

		await initializeCamera();
		await initializeLandmarker();
	});

	onDestroy(() => {
		stopDetection();
		stopCamera();
		disposeLandmarker();
	});

	async function initializeCamera() {
		try {
			dispatch('status', 'Solicitando acceso a la cámara…');
			mediaStream = await navigator.mediaDevices.getUserMedia({
				video: {
					width: { ideal: 640 },
					height: { ideal: 480 },
					facingMode: 'user',
				},
			});

			if (video) {
				video.srcObject = mediaStream;
				await video.play();
			}

			if (canvas) {
				canvas.width = 320;
				canvas.height = 240;
				ctx = canvas.getContext('2d', { alpha: true });
			}

			dispatch('status', 'Cámara lista');
		} catch (error) {
			console.error('Camera initialization failed', error);
			enableFallback(
				'No pudimos acceder a la cámara. Usa la barra espaciadora o toca la pantalla.',
			);
		}
	}

	async function initializeLandmarker() {
		if (detectorMode === 'manual') return;

		try {
			dispatch('status', 'Cargando modelo de postura…');
			const resolver = await FilesetResolver.forVisionTasks(
				'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8/wasm',
			);

			poseLandmarker = await PoseLandmarker.createFromOptions(resolver, {
				baseOptions: {
					modelAssetPath: '/models/pose_landmarker_full.task',
				},
				runningMode: 'VIDEO',
				numPoses: 1,
			});

			detectionReady = true;
			setDetectorMode('pose', 'Seguimiento corporal listo');
			if (active) {
				startDetection();
			}
		} catch (error) {
			console.error('Pose model failed to load', error);
			enableFallback('No se pudo cargar el modelo de postura. Usa los controles manuales.');
		}
	}

	function disposeLandmarker() {
		if (poseLandmarker) {
			poseLandmarker.close();
			poseLandmarker = null;
		}
	}

	function setDetectorMode(mode: DetectorMode, message?: string) {
		detectorMode = mode;
		dispatch('modechange', { mode, message });
	}

	function enableFallback(message: string) {
		setDetectorMode('manual', message);
		dispatch('error', message);
		fallbackMessage = message;
		stopDetection();
		lastCoaching = '';
		dispatch('segments', []);
		clearTutorialTimeline(true);
		ensureCoaching(message, 'warn');
	}

	function startDetection() {
		if (!poseLandmarker || !video || !ctx || detectorMode !== 'pose' || !active) {
			return;
		}
		if (detectionHandle !== null) {
			return;
		}
		detectFrame();
	}

	function stopDetection() {
		if (detectionHandle !== null) {
			cancelAnimationFrame(detectionHandle);
			detectionHandle = null;
		}
	}

	function stopCamera() {
		if (!mediaStream) return;
		mediaStream.getTracks().forEach((track) => track.stop());
		mediaStream = null;
	}

	function detectFrame() {
		if (!poseLandmarker || !video || !ctx) {
			detectionHandle = null;
			return;
		}

		const now = performance.now();
		if (now - lastDetectTime < detectIntervalMs) {
			detectionHandle = requestAnimationFrame(detectFrame);
			return;
		}
		lastDetectTime = now;

		const result = poseLandmarker.detectForVideo(video, now);
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		if (result && result.landmarks && result.landmarks.length > 0 && exerciseId) {
			const landmarks = result.landmarks[0];
			drawPose(landmarks);
			const segmentStatuses = emitSegmentStatuses(exerciseId, landmarks);
			updateCoaching(exerciseId, landmarks, segmentStatuses);
			if (evaluateRep(exerciseId, landmarks)) {
				triggerRep();
			}
		} else {
			if (exerciseId) {
				const emptyStatuses = emitSegmentStatuses(exerciseId, []);
				updateCoaching(null, [], emptyStatuses);
			} else {
				dispatch('segments', []);
				updateCoaching(null, []);
			}
		}

		if (detectorMode === 'pose' && active) {
			detectionHandle = requestAnimationFrame(detectFrame);
		} else {
			detectionHandle = null;
		}
	}

	function drawPose(landmarks: NormalizedLandmark[]) {
		if (!ctx) return;
		ctx.save();
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'rgba(34, 211, 238, 0.8)';
		ctx.fillStyle = 'rgba(34, 211, 238, 0.8)';

		const connections: Array<[number, number]> = [
			[11, 13],
			[13, 15],
			[12, 14],
			[14, 16],
			[11, 12],
			[23, 24],
			[11, 23],
			[12, 24],
			[23, 25],
			[25, 27],
			[24, 26],
			[26, 28],
		];

		const width = canvas.width;
		const height = canvas.height;

		for (const [start, end] of connections) {
			const a = landmarks[start];
			const b = landmarks[end];
			if (!a || !b) continue;

			ctx.beginPath();
			ctx.moveTo(a.x * width, a.y * height);
			ctx.lineTo(b.x * width, b.y * height);
			ctx.stroke();
		}

		for (const landmark of landmarks) {
			ctx.beginPath();
			ctx.arc(landmark.x * width, landmark.y * height, 3.4, 0, Math.PI * 2);
			ctx.fill();
		}

		ctx.restore();
	}

	function average(values: number[]) {
		return values.reduce((sum, value) => sum + value, 0) / values.length;
	}

	function toDegrees(radians: number) {
		return radians * (180 / Math.PI);
	}

	function jointAngle(a?: NormalizedLandmark, b?: NormalizedLandmark, c?: NormalizedLandmark) {
		if (!a || !b || !c) return null;
		const abx = a.x - b.x;
		const aby = a.y - b.y;
		const cbx = c.x - b.x;
		const cby = c.y - b.y;
		const abMagnitude = Math.hypot(abx, aby);
		const cbMagnitude = Math.hypot(cbx, cby);
		if (abMagnitude === 0 || cbMagnitude === 0) return null;
		const cosine = Math.max(
			-1,
			Math.min(1, (abx * cbx + aby * cby) / (abMagnitude * cbMagnitude)),
		);
		return toDegrees(Math.acos(cosine));
	}

	function squatAngleForSide(
		landmarks: NormalizedLandmark[],
		hipIndex: number,
		kneeIndex: number,
		ankleIndex: number,
	) {
		const hip = landmarks[hipIndex];
		const knee = landmarks[kneeIndex];
		const ankle = landmarks[ankleIndex];
		if (!isVisible(hip) || !isVisible(knee) || !isVisible(ankle)) {
			return null;
		}
		return jointAngle(hip, knee, ankle);
	}

	function computeSquatProgress(landmarks: NormalizedLandmark[]) {
		const angles = [
			squatAngleForSide(landmarks, 23, 25, 27),
			squatAngleForSide(landmarks, 24, 26, 28),
		].filter((value): value is number => typeof value === 'number');

		if (angles.length === 0) {
			return {
				angle: null as number | null,
				descent: 0,
				extension: 0,
			};
		}

		const averageAngle = average(angles);
		const range = SQUAT_STANDING_ANGLE - SQUAT_TARGET_ANGLE;
		const descent = clamp((SQUAT_STANDING_ANGLE - averageAngle) / range, 0, 1);
		const extension = clamp((averageAngle - SQUAT_TARGET_ANGLE) / range, 0, 1);

		return {
			angle: averageAngle,
			descent,
			extension,
		};
	}

	function selectVisibleLandmark(
		landmarks: NormalizedLandmark[],
		leftIndex: number,
		rightIndex: number,
	) {
		const left = landmarks[leftIndex];
		const right = landmarks[rightIndex];
		const leftVisible = isVisible(left);
		const rightVisible = isVisible(right);

		if (leftVisible && !rightVisible) {
			return { landmark: left, index: leftIndex, side: 'left' as const };
		}
		if (rightVisible && !leftVisible) {
			return { landmark: right, index: rightIndex, side: 'right' as const };
		}
		if (leftVisible && rightVisible) {
			// Prefer the landmark closer to the camera (smaller z approximated by x variance).
			return { landmark: left, index: leftIndex, side: 'left' as const };
		}
		return {
			landmark: leftVisible ? left : right,
			index: leftVisible ? leftIndex : rightIndex,
			side: leftVisible ? ('left' as const) : ('right' as const),
		};
	}

	function computeSitupMetrics(landmarks: NormalizedLandmark[]) {
		const shoulderInfo = selectVisibleLandmark(landmarks, 11, 12);
		const hipInfo = selectVisibleLandmark(landmarks, 23, 24);

		const shoulder = shoulderInfo.landmark;
		const hip = hipInfo.landmark;
		if (!shoulder || !hip || !isVisible(shoulder) || !isVisible(hip)) {
			return null;
		}

		const base = state.situps.baseShoulderY !== null ? state.situps.baseShoulderY : shoulder.y;
		const lift = base - shoulder.y;

		return {
			shoulder,
			hip,
			base,
			lift,
			liftProgress: clamp(lift / Math.max(SITUP_LIFT_DELTA, 0.001), 0, 1),
			returnProgress: clamp(
				1 - lift / Math.max(state.situps.maxLift || SITUP_LIFT_DELTA, 0.001),
				0,
				1,
			),
			side: shoulderInfo.side,
			shoulderGap: Math.abs(
				(landmarks[11]?.x ?? shoulder.x) - (landmarks[12]?.x ?? shoulder.x),
			),
		};
	}

	function landmarkMeanY(landmarks: NormalizedLandmark[], indices: number[]) {
		return average(indices.map((index) => landmarks[index]?.y ?? 0));
	}

	function landmarkMeanX(landmarks: NormalizedLandmark[], indices: number[]) {
		return average(indices.map((index) => landmarks[index]?.x ?? 0));
	}

	function isVisible(landmark?: NormalizedLandmark | null) {
		if (!landmark) return false;
		const { x, y } = landmark;
		const landmarkAny = landmark as unknown as {
			visibility?: number;
			presence?: number;
		};
		const confidence = landmarkAny.visibility ?? landmarkAny.presence;
		if (typeof confidence === 'number' && confidence >= visibilityThreshold) {
			return true;
		}

		// Fallback: consider the landmark visible if it lies reasonably within the frame.
		const withinFrame = x >= -0.05 && x <= 1.05 && y >= -0.05 && y <= 1.05;
		return withinFrame;
	}

	function getSegmentStatuses(id: ExerciseId, landmarks: NormalizedLandmark[]) {
		const equalizeIndices = (indices: number[]) =>
			indices.length === 1 ? [indices[0], indices[0] + 1] : indices;

		const requirements = SEGMENT_REQUIREMENTS[id] ?? [];
		return requirements.map((segment) => {
			const balancedIndices = equalizeIndices(segment.indices);
			return {
				label: segment.label,
				ok: balancedIndices.some((index) => isVisible(landmarks[index])),
			};
		});
	}

	function emitSegmentStatuses(id: ExerciseId, landmarks: NormalizedLandmark[]) {
		const statuses = getSegmentStatuses(id, landmarks);
		dispatch('segments', statuses);
		return statuses;
	}

	function emitTutorialStage(
		stage: string,
		message: string,
		progress = 0,
		status: TutorialStageStatus = 'active',
	) {
		if (!tutorial) return;
		tutorialTimelineActive = true;
		if (stage !== 'postura') {
			tutorialHasMovementStage = true;
		}
		dispatch('telemetry', {
			stage,
			message,
			progress: clamp(progress, 0, 1),
			status,
		});
		lastTutorialStage = stage;
	}

	function clearTutorialTimeline(force = false) {
		if (!tutorial) return;
		if (force || tutorialTimelineActive) {
			dispatch('telemetry', { reset: true });
		}
		tutorialTimelineActive = false;
		tutorialHasMovementStage = false;
		postureStageComplete = false;
		lastTutorialStage = null;
	}

	function ensureCoaching(message: string, tone: 'info' | 'warn' | 'success' = 'info') {
		if (message === lastCoaching && tone === coachingTone) return;
		lastCoaching = message;
		coachingText = message;
		coachingTone = tone;
		dispatch('coaching', { message, tone });
	}

	function updateCoaching(
		id: ExerciseId | null,
		landmarks: NormalizedLandmark[],
		statuses?: SegmentStatus[],
	) {
		if (!id || !statuses || statuses.length === 0) {
			clearTutorialTimeline(true);
			if (tutorial) {
				emitTutorialStage(
					'postura',
					'Colócate dentro del encuadre para comenzar.',
					0,
					'active',
				);
			}
			ensureCoaching('Colócate dentro del encuadre para comenzar.', 'warn');
			return;
		}

		const totalSegments = statuses.length;
		const visibleSegments = statuses.filter((segment) => segment.ok).length;
		const postureProgress = totalSegments > 0 ? visibleSegments / totalSegments : 0;
		const missing = detectMissingParts(statuses);

		if (tutorial) {
			const postureStatus: TutorialStageStatus =
				postureProgress >= 0.999 ? 'complete' : 'active';

			if (postureStatus === 'active' && tutorialHasMovementStage) {
				clearTutorialTimeline(true);
			}

			const postureMessage =
				missing?.message ??
				(postureStatus === 'complete'
					? 'Postura detectada. Respira y mantén el cuerpo en el encuadre.'
					: 'Ajusta tu posición hasta que hombros, caderas y rodillas estén visibles.');

			emitTutorialStage('postura', postureMessage, postureProgress, postureStatus);
			postureStageComplete = postureStatus === 'complete';
		}

		if (missing) {
			ensureCoaching(missing.message, missing.tone);
			return;
		}

		if (landmarks.length === 0) {
			ensureCoaching('Colócate dentro del encuadre para comenzar.', 'warn');
			return;
		}

		let tutorialStageMessage: string | null = null;
		let tutorialStageTone: 'info' | 'success' = 'info';

		if (tutorial && postureStageComplete) {
			const tutorialFeedback = generateTutorialFeedback(id, landmarks);
			if (tutorialFeedback) {
				emitTutorialStage(
					tutorialFeedback.stage,
					tutorialFeedback.message,
					tutorialFeedback.progress,
					tutorialFeedback.status,
				);

				if (tutorialFeedback.stage !== 'postura') {
					tutorialStageMessage = tutorialFeedback.message;
					tutorialStageTone = tutorialFeedback.status === 'complete' ? 'success' : 'info';
				}
			}
		}

		const cue = techniqueCue(id, landmarks);
		if (cue) {
			ensureCoaching(cue.message, cue.tone);
			return;
		}

		if (tutorialStageMessage) {
			ensureCoaching(tutorialStageMessage, tutorialStageTone);
			return;
		}

		ensureCoaching('Postura detectada.', 'success');
	}

	function detectMissingParts(statuses: SegmentStatus[]) {
		const missing = statuses.filter((segment) => !segment.ok);
		if (missing.length === 0) return null;

		const names = missing.map((segment) => segment.label.toLowerCase());
		const label =
			names.length === 1
				? names[0]
				: `${names.slice(0, -1).join(', ')} y ${names[names.length - 1]}`;

		return {
			message: `Asegúrate de que tus ${label} se vean en la cámara.`,
			tone: 'warn' as const,
		};
	}

	function clamp(value: number, min: number, max: number) {
		return Math.min(Math.max(value, min), max);
	}

	function generateTutorialFeedback(
		id: ExerciseId,
		landmarks: NormalizedLandmark[],
	): { stage: string; message: string; progress: number; status: TutorialStageStatus } | null {
		switch (id) {
			case 'squats': {
				const squat = computeSquatProgress(landmarks);

				if (squat.angle === null) {
					return {
						stage: 'squats-descenso',
						message:
							'Asegúrate de que caderas, rodillas y tobillos se vean con claridad para medir tu rango.',
						progress: 0,
						status: 'active',
					};
				}

				if (state.squats.phase === 'up') {
					const progress = squat.extension;
					const remaining = Math.max(0, 1 - progress);
					return {
						stage: 'squats-subida',
						message:
							progress < 0.97
								? `Extiende las rodillas. Falta aprox. ${(remaining * 100).toFixed(
										0,
								  )}%`
								: 'Postura lista. Inicia el descenso controlando las rodillas.',
						progress,
						status: progress >= 0.97 ? 'complete' : 'active',
					};
				}

				const progress = squat.descent;
				const remaining = Math.max(0, 1 - progress);
				return {
					stage: 'squats-descenso',
					message:
						progress < 0.97
							? `Baja un poco más hasta que las caderas estén por debajo de las rodillas. Falta aprox. ${(
									remaining * 100
							  ).toFixed(0)}%`
							: 'Profundidad lograda. Mantén el control y permite que el ave gane impulso.',
					progress,
					status: progress >= 0.97 ? 'complete' : 'active',
				};
			}
			case 'pushups': {
				const shoulders = landmarkMeanY(landmarks, [11, 12]);
				const wrists = landmarkMeanY(landmarks, [15, 16]);
				const hips = landmarkMeanY(landmarks, [23, 24]);
				const chestToGround = shoulders - wrists;
				const hipAlignment = Math.abs(shoulders - hips);
				const minChest =
					state.pushups.minChestToGround === Number.POSITIVE_INFINITY
						? chestToGround
						: state.pushups.minChestToGround;

				if (hipAlignment > PUSHUP_ALIGNMENT_TOLERANCE) {
					return {
						stage: 'pushups-descenso',
						message: 'Mantén el cuerpo en línea recta.',
						progress: 0,
						status: 'active',
					};
				}

				if (state.pushups.phase === 'up') {
					const depthProgress = clamp(
						1 - chestToGround / Math.max(PUSHUP_DEPTH_TARGET, 0.001),
						0,
						1,
					);
					return {
						stage: 'pushups-descenso',
						message:
							depthProgress < 1
								? `Flexiona los codos y lleva el pecho firme hacia el suelo. Falta aprox. ${Math.max(
										0,
										(1 - depthProgress) * 100,
								  ).toFixed(0)}%`
								: 'Profundidad alcanzada. Mantén la tensión para impulsar la subida.',
						progress: depthProgress,
						status: depthProgress >= 1 ? 'complete' : 'active',
					};
				}

				const rise = chestToGround - minChest;
				const riseProgress = clamp(rise / Math.max(PUSHUP_EXTENSION_DELTA, 0.001), 0, 1);
				return {
					stage: 'pushups-subida',
					message:
						riseProgress < 1
							? `Empuja el suelo y extiende los brazos hasta bloquearlos. Falta aprox. ${Math.max(
									0,
									(1 - riseProgress) * 100,
							  ).toFixed(0)}%`
							: 'Repetición completada. Prepárate para la siguiente bajada.',
					progress: riseProgress,
					status:
						riseProgress >= 1 && hipAlignment < PUSHUP_ALIGNMENT_TOLERANCE
							? 'complete'
							: 'active',
				};
			}
			case 'situps': {
				const metrics = computeSitupMetrics(landmarks);
				if (!metrics) {
					return {
						stage: 'situps-curl',
						message:
							'Colócate de perfil hacia la cámara y asegúrate de que hombro y cadera se vean.',
						progress: 0,
						status: 'active',
					};
				}

				const { liftProgress, returnProgress, shoulderGap } = metrics;

				if (shoulderGap > SITUP_SIDE_ALIGNMENT_THRESHOLD) {
					return {
						stage: 'situps-curl',
						message:
							'Gira tu cuerpo de perfil hacia la cámara para que detectemos la elevación.',
						progress: 0,
						status: 'active',
					};
				}

				if (state.situps.phase === 'down') {
					return {
						stage: 'situps-curl',
						message:
							liftProgress < 1
								? `Enróllate hacia arriba llevando el pecho hacia las rodillas. Falta aprox. ${Math.max(
										0,
										(1 - liftProgress) * 100,
								  ).toFixed(0)}%`
								: 'Elevación alcanzada. Mantén el abdomen activo para descender con control.',
						progress: liftProgress,
						status: liftProgress >= 1 ? 'complete' : 'active',
					};
				}

				return {
					stage: 'situps-descenso',
					message:
						returnProgress < 1
							? `Baja para acercar los hombros al suelo. Falta aprox. ${Math.max(
									0,
									(1 - returnProgress) * 100,
							  ).toFixed(0)}%`
							: 'Descenso completado. Prepárate para la siguiente elevación.',
					progress: returnProgress,
					status: returnProgress >= 1 ? 'complete' : 'active',
				};
			}
		}
		return null;
	}

	function techniqueCue(id: ExerciseId, landmarks: NormalizedLandmark[]) {
		switch (id) {
			case 'squats': {
				const squat = computeSquatProgress(landmarks);
				if (squat.angle === null) {
					return {
						message: 'Mantén caderas, rodillas y tobillos dentro del encuadre.',
						tone: 'warn' as const,
					};
				}

				if (state.squats.phase === 'up' && squat.extension < 0.7) {
					return {
						message: 'Eleva el torso y abre el pecho antes de iniciar la bajada.',
						tone: 'warn' as const,
					};
				}

				if (state.squats.phase === 'down' && squat.descent < 0.6) {
					return {
						message: 'Desciende más las caderas para impulsar al ave.',
						tone: 'warn' as const,
					};
				}

				return null;
			}
			case 'pushups': {
				const shoulders = landmarkMeanY(landmarks, [11, 12]);
				const wrists = landmarkMeanY(landmarks, [15, 16]);
				const hips = landmarkMeanY(landmarks, [23, 24]);
				const chestToGround = shoulders - wrists;
				const hipAlignment = Math.abs(shoulders - hips);

				if (hipAlignment > PUSHUP_ALIGNMENT_TOLERANCE) {
					return {
						message:
							'Mantén el cuerpo como una tabla: hombros, cadera y tobillos en la misma línea.',
						tone: 'warn' as const,
					};
				}

				if (state.pushups.phase === 'up' && chestToGround > PUSHUP_EXTENSION_TARGET) {
					return {
						message: 'Flexiona más los codos hasta acercar el pecho al suelo.',
						tone: 'warn' as const,
					};
				}

				return null;
			}
			case 'situps': {
				const metrics = computeSitupMetrics(landmarks);
				if (!metrics) {
					return {
						message: 'Asegúrate de que hombro y cadera aparezcan en el encuadre.',
						tone: 'warn' as const,
					};
				}

				const { liftProgress, returnProgress, shoulderGap } = metrics;

				if (shoulderGap > SITUP_SIDE_ALIGNMENT_THRESHOLD) {
					return {
						message:
							'Colócate completamente de perfil para que podamos seguir el movimiento.',
						tone: 'warn' as const,
					};
				}

				if (state.situps.phase === 'down' && liftProgress < 0.6) {
					return {
						message: 'Enróllate más hacia la rodilla manteniendo el abdomen firme.',
						tone: 'warn' as const,
					};
				}

				if (state.situps.phase === 'up' && returnProgress < 0.4) {
					return {
						message:
							'Desciende despacio hasta apoyar de nuevo los hombros antes de la siguiente repetición.',
						tone: 'warn' as const,
					};
				}

				return null;
			}
		}
		return null;
	}

	function evaluateRep(id: ExerciseId, landmarks: NormalizedLandmark[]) {
		const now = performance.now();
		switch (id) {
			case 'squats': {
				const squat = computeSquatProgress(landmarks);
				if (squat.angle === null) {
					break;
				}

				if (state.squats.phase === 'up' && squat.extension >= SQUAT_ASCENT_THRESHOLD) {
					state.squats.phase = 'down';
					state.squats.lastTransition = now;
				} else if (
					state.squats.phase === 'down' &&
					squat.descent >= SQUAT_DESCENT_THRESHOLD &&
					now - state.squats.lastTransition > 180
				) {
					state.squats.phase = 'up';
					return true;
				}
				break;
			}
			case 'pushups': {
				const shoulders = landmarkMeanY(landmarks, [11, 12]);
				const wrists = landmarkMeanY(landmarks, [15, 16]);
				const hips = landmarkMeanY(landmarks, [23, 24]);
				const chestToGround = shoulders - wrists;
				const hipAlignment = Math.abs(shoulders - hips);

				if (
					state.pushups.phase === 'up' &&
					chestToGround < PUSHUP_DEPTH_TARGET &&
					hipAlignment < PUSHUP_ALIGNMENT_TOLERANCE
				) {
					state.pushups.phase = 'down';
					state.pushups.lastTransition = now;
					state.pushups.depthReached = true;
					state.pushups.minChestToGround = chestToGround;
				} else if (state.pushups.phase === 'down') {
					state.pushups.minChestToGround = Math.min(
						state.pushups.minChestToGround,
						chestToGround,
					);

					const rise = chestToGround - state.pushups.minChestToGround;
					if (
						state.pushups.depthReached &&
						rise >= PUSHUP_EXTENSION_DELTA &&
						hipAlignment < PUSHUP_ALIGNMENT_TOLERANCE &&
						now - state.pushups.lastTransition > 200
					) {
						state.pushups.phase = 'up';
						state.pushups.depthReached = false;
						state.pushups.minChestToGround = Number.POSITIVE_INFINITY;
						return true;
					}
				}
				break;
			}
			case 'situps': {
				const metrics = computeSitupMetrics(landmarks);
				if (!metrics) {
					break;
				}

				const { shoulder, base, lift, liftProgress } = metrics;
				const shoulderY = shoulder.y;

				if (state.situps.phase === 'down') {
					if (
						state.situps.baseShoulderY === null ||
						shoulderY > state.situps.baseShoulderY
					) {
						state.situps.baseShoulderY = shoulderY;
					}

					if (liftProgress >= 1 && now - state.situps.lastTransition > 200) {
						state.situps.phase = 'up';
						state.situps.lastTransition = now;
						state.situps.maxLift = lift;
					}
				} else {
					state.situps.maxLift = Math.max(state.situps.maxLift, lift);
					if (
						base - shoulderY <= SITUP_RETURN_THRESHOLD &&
						now - state.situps.lastTransition > 220
					) {
						state.situps.phase = 'down';
						state.situps.lastTransition = now;
						state.situps.baseShoulderY = shoulderY;
						state.situps.maxLift = 0;
						return true;
					}
				}
				break;
			}
		}
		return false;
	}

	function triggerRep() {
		if (repCooldown) return;
		repCooldown = true;
		if (tutorial) {
			clearTutorialTimeline(true);
		}
		dispatch('rep');
		showFeedbackPulse();
		setTimeout(() => {
			repCooldown = false;
		}, cooldownMs);
	}

	function showFeedbackPulse() {
		feedbackPulse = true;
		if (pulseTimeout) {
			clearTimeout(pulseTimeout);
		}
		pulseTimeout = setTimeout(() => {
			feedbackPulse = false;
		}, 400);
	}

	export function start() {
		if (detectorMode === 'pose') {
			startDetection();
		}
	}

	async function retry() {
		stopDetection();
		disposeLandmarker();
		stopCamera();
		fallbackMessage = '';
		setDetectorMode('loading', 'Reiniciando detector…');
		await initializeCamera();
		await initializeLandmarker();
		if (detectorMode === 'pose') {
			startDetection();
		}
	}

	$: if (active && detectorMode === 'pose') {
		startDetection();
	} else if (!active) {
		stopDetection();
	}

	$: if (exerciseId) {
		state.squats.phase = 'up';
		state.squats.lastTransition = 0;
		state.pushups.phase = 'up';
		state.pushups.lastTransition = 0;
		state.pushups.depthReached = false;
		state.pushups.minChestToGround = Number.POSITIVE_INFINITY;
		state.situps.phase = 'down';
		state.situps.lastTransition = 0;
		state.situps.baseShoulderY = null;
		state.situps.maxLift = 0;
		if (tutorial) {
			clearTutorialTimeline(true);
		} else {
			tutorialTimelineActive = false;
			tutorialHasMovementStage = false;
			postureStageComplete = false;
			lastTutorialStage = null;
		}
	}

	$: if (!tutorial && previousTutorial) {
		tutorialTimelineActive = false;
		tutorialHasMovementStage = false;
		postureStageComplete = false;
		lastTutorialStage = null;
	}

	$: previousTutorial = tutorial;
</script>

<div class="detector-shell" data-mode={detectorMode}>
	<div class="pip-frame">
		{#if detectorMode === 'manual'}
			<div class="fallback" role="alert">
				<p>{fallbackMessage}</p>
				<button type="button" class="btn-ghost" on:click={retry}>Reintentar cámara</button>
			</div>
		{:else}
			<video bind:this={video} class="pip-video" autoplay muted playsinline playsInline />
			<canvas bind:this={canvas} class="pip-canvas" />
			{#if feedbackPulse}
				<div class="pulse">¡Repetición!</div>
			{/if}
		{/if}
	</div>
</div>

<style>
	.detector-shell {
		position: relative;
		width: 100%;
		border-radius: var(--border-radius);
		overflow: hidden;
		background: var(--card);
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: var(--shadow);
		backdrop-filter: blur(14px);
		aspect-ratio: 3 / 4;
		min-height: 180px;
	}

	.pip-frame {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.pip-video,
	.pip-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.pip-canvas {
		pointer-events: none;
	}

	.detector-shell[data-mode='manual'] {
		background: linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.85));
		display: grid;
		place-items: center;
	}

	.fallback {
		padding: 0.75rem 1rem;
		text-align: center;
		color: var(--text);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.fallback p {
		margin: 0;
		font-size: 0.85rem;
		line-height: 1.4;
	}

	.pulse {
		position: absolute;
		bottom: 16px;
		left: 50%;
		transform: translateX(-50%);
		padding: 6px 12px;
		background: rgba(34, 211, 238, 0.85);
		color: #0f172a;
		font-weight: 600;
		border-radius: var(--border-radius-full);
		box-shadow: 0 0 0 12px rgba(34, 211, 238, 0.12);
		animation: pulse 0.4s ease;
	}

	@keyframes pulse {
		from {
			transform: translateX(-50%) scale(0.95);
			opacity: 0.8;
		}
		to {
			transform: translateX(-50%) scale(1);
			opacity: 1;
		}
	}
</style>
