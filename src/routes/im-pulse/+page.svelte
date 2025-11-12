<script lang="ts">
	import { onMount } from 'svelte';
	import { derived, get, writable } from 'svelte/store';
	import './+page.css';
	import GameCanvas from './components/GameCanvas.svelte';
	import MovementDetector from './components/MovementDetector.svelte';
	import type GameCanvasComponent from './components/GameCanvas.svelte';
	import type MovementDetectorComponent from './components/MovementDetector.svelte';
	import {
		EXERCISES,
		LEGACY_STORAGE_KEYS,
		LEVELS,
		STORAGE_KEYS,
		type ExerciseCard,
		type ExerciseId,
		type LevelConfig,
		type LevelId,
		TUTORIAL_GUIDES,
	} from './config';

	type FlowStep =
		| 'exercise'
		| 'levels'
		| 'preflight'
		| 'countdown'
		| 'playing'
		| 'paused'
		| 'results';
	type Outcome = 'success' | 'failed';
	type DetectorMode = 'loading' | 'pose' | 'manual';

	const flow = writable<FlowStep>('exercise');
	const gameState = writable<'idle' | 'countdown' | 'running' | 'paused' | 'finished'>('idle');
	const outcome = writable<Outcome | null>(null);

	const selectedExerciseId = writable<ExerciseId | null>(null);
	const selectedLevelId = writable<LevelId | null>(null);
	const unlockedLevels = writable<LevelId[]>(['tutorial', 'beginner']);
	const score = writable(0);
	const bestScore = writable(0);
	const countdownValue = writable<'3' | '2' | '1' | '¡Vamos!'>('3');
	const detectorMode = writable<DetectorMode>('loading');
	type CoachingTone = 'info' | 'warn' | 'success';
	const detectorMessage = writable<string>('Iniciando cámara…');
	const detectorCoaching = writable<{ message: string; tone: CoachingTone }>({
		message: 'Colócate dentro del encuadre para comenzar.',
		tone: 'warn',
	});
	const manualHintVisible = writable(false);
	const bodySegments = writable<{ label: string; ok: boolean }[]>([]);
	type TutorialStageStatus = 'active' | 'complete';
	type TutorialStage = {
		id: string;
		message: string;
		progress: number;
		status: TutorialStageStatus;
	};
	const tutorialStages = writable<TutorialStage[]>([]);
	const tutorialActiveStage = derived(tutorialStages, ($stages) => {
		const active = $stages.find((stage) => stage.status === 'active');
		return active ?? $stages[$stages.length - 1] ?? null;
	});

	const selectedExercise = derived(
		selectedExerciseId,
		($id) => EXERCISES.find((ex) => ex.id === $id) ?? null,
	);
	const selectedLevel = derived(
		selectedLevelId,
		($id) => LEVELS.find((level) => level.id === $id) ?? null,
	);

	const isInfiniteLevel = derived(selectedLevel, ($level) => $level?.id === 'infinite');
	const scoreLabel = derived(selectedLevel, ($level) =>
		$level?.id === 'tutorial' ? 'Repeticiones' : 'Puntos',
	);
	const remainingGoal = derived([selectedLevel, score], ([$level, $score]) => {
		if (!$level || $level.targetReps === null) {
			return null;
		}
		return Math.max($level.targetReps - $score, 0);
	});
	const pipesGoal = derived(selectedLevel, ($level) => {
		if (!$level || $level.id === 'tutorial') return null;
		return $level.targetReps;
	});

	const showGameHud = derived(flow, ($flow) => $flow === 'playing' || $flow === 'paused');
	const showCountdownOverlay = derived(flow, ($flow) => $flow === 'countdown');
	const isManualMode = derived(detectorMode, ($mode) => $mode === 'manual');

	const isBrowser = typeof window !== 'undefined';
	const unsubscribers: Array<() => void> = [];

	let gameCanvas: GameCanvasComponent | null = null;
	let movementDetector: MovementDetectorComponent | null = null;
	let countdownTimer: ReturnType<typeof setInterval> | null = null;
	let lockedAnnouncement = '';

	function clearBodySegments() {
		bodySegments.set([]);
		tutorialStages.set([]);
	}

	function isValidExercise(value: string | null): value is ExerciseId {
		if (!value) return false;
		return EXERCISES.some((exercise) => exercise.id === value);
	}

	function isValidLevel(value: string | null): value is LevelId {
		if (!value) return false;
		return LEVELS.some((level) => level.id === value);
	}

	function getLevelById(id: LevelId | null): LevelConfig | null {
		if (!id) return null;
		const match = LEVELS.find((level) => level.id === id);
		return match ?? null;
	}

	function ensureBaseLevelsIncluded(values: LevelId[]): LevelId[] {
		const base: LevelId[] = ['tutorial', 'beginner'];
		const merged = Array.from(new Set([...base, ...values]));
		return merged;
	}

	function hydrateFromStorage() {
		if (!isBrowser) return;

		const savedUnlocked = localStorage.getItem(STORAGE_KEYS.unlockedLevels);
		if (savedUnlocked) {
			try {
				const parsed = JSON.parse(savedUnlocked) as LevelId[];
				if (Array.isArray(parsed)) {
					unlockedLevels.set(ensureBaseLevelsIncluded(parsed));
				}
			} catch (error) {
				console.warn('Unable to parse unlocked levels', error);
			}
		}

		const savedBest = localStorage.getItem(STORAGE_KEYS.bestScore);
		if (savedBest) {
			const parsedBest = Number.parseInt(savedBest, 10);
			if (!Number.isNaN(parsedBest)) {
				bestScore.set(parsedBest);
			}
		} else {
			for (const legacyKey of LEGACY_STORAGE_KEYS) {
				const legacyValue = localStorage.getItem(legacyKey);
				if (legacyValue) {
					const parsedLegacy = Number.parseInt(legacyValue, 10);
					if (!Number.isNaN(parsedLegacy)) {
						bestScore.set(parsedLegacy);
						localStorage.setItem(STORAGE_KEYS.bestScore, parsedLegacy.toString());
					}
					localStorage.removeItem(legacyKey);
					break;
				}
			}
		}

		const savedExercise = localStorage.getItem(STORAGE_KEYS.lastExercise);
		if (isValidExercise(savedExercise)) {
			selectedExerciseId.set(savedExercise);
		}

		const savedLevel = localStorage.getItem(STORAGE_KEYS.lastLevel);
		if (isValidLevel(savedLevel)) {
			const available = get(unlockedLevels);
			if (available.includes(savedLevel)) {
				selectedLevelId.set(savedLevel);
			}
		}
	}

	function persistSubscriptions() {
		if (!isBrowser) return;

		unsubscribers.push(
			unlockedLevels.subscribe((value) => {
				const sanitized = ensureBaseLevelsIncluded(Array.from(new Set(value)));
				localStorage.setItem(STORAGE_KEYS.unlockedLevels, JSON.stringify(sanitized));
			}),
		);

		unsubscribers.push(
			bestScore.subscribe((value) => {
				localStorage.setItem(STORAGE_KEYS.bestScore, Math.max(0, value).toString());
			}),
		);

		unsubscribers.push(
			selectedExerciseId.subscribe((value) => {
				if (value) {
					localStorage.setItem(STORAGE_KEYS.lastExercise, value);
				} else {
					localStorage.removeItem(STORAGE_KEYS.lastExercise);
				}
			}),
		);

		unsubscribers.push(
			selectedLevelId.subscribe((value) => {
				if (value) {
					localStorage.setItem(STORAGE_KEYS.lastLevel, value);
				} else {
					localStorage.removeItem(STORAGE_KEYS.lastLevel);
				}
			}),
		);

		unsubscribers.push(
			flow.subscribe((value) => {
				if (value !== 'playing' && value !== 'countdown') {
					detectorCoaching.set({
						message: 'Colócate dentro del encuadre para comenzar.',
						tone: 'warn',
					});
					tutorialStages.set([]);
				}
			}),
		);
	}

	function isLevelUnlocked(levelId: LevelId) {
		return get(unlockedLevels).includes(levelId);
	}

	function levelRequirementLabel(level: LevelConfig) {
		if (!level.unlockRequirement) return 'Disponible desde el inicio';
		const requirement = getLevelById(level.unlockRequirement);
		return requirement
			? `Completa ${requirement.name} para desbloquear`
			: 'Completa los niveles anteriores para desbloquear';
	}

	function resetForPreflight(level: LevelConfig) {
		score.set(0);
		gameState.set('idle');
		outcome.set(null);
		manualHintVisible.set(get(detectorMode) === 'manual');
		clearBodySegments();
		if (gameCanvas) {
			gameCanvas.reset();
		}
		if (level.targetReps === null) {
			countdownValue.set('3');
		}
	}

	function chooseExercise(id: ExerciseId) {
		selectedExerciseId.set(id);
		clearBodySegments();
		flow.set('levels');
	}

	function chooseLevel(level: LevelConfig) {
		if (!isLevelUnlocked(level.id)) {
			lockedAnnouncement = levelRequirementLabel(level);
			return;
		}
		lockedAnnouncement = '';
		selectedLevelId.set(level.id);
		clearBodySegments();
		resetForPreflight(level);
		flow.set('preflight');
	}

	function unlockNextLevel(currentId: LevelId) {
		const index = LEVELS.findIndex((level) => level.id === currentId);
		if (index === -1) return;
		const next = LEVELS[index + 1];
		if (!next) return;
		const currentUnlocked = get(unlockedLevels);
		if (!currentUnlocked.includes(next.id)) {
			unlockedLevels.set([...currentUnlocked, next.id]);
		}
	}

	function clearCountdown() {
		if (countdownTimer) {
			clearInterval(countdownTimer);
			countdownTimer = null;
		}
	}

	function startCountdown() {
		const level = get(selectedLevel);
		if (!level) return;

		score.set(0);
		gameState.set('countdown');
		flow.set('countdown');
		manualHintVisible.set(get(detectorMode) === 'manual');

		if (gameCanvas) {
			gameCanvas.reset();
		}

		const sequence: Array<'3' | '2' | '1' | '¡Vamos!'> = ['3', '2', '1', '¡Vamos!'];
		let index = 0;
		countdownValue.set(sequence[index]);
		clearCountdown();

		countdownTimer = setInterval(() => {
			index += 1;
			if (index >= sequence.length) {
				clearCountdown();
				beginGameplay();
				return;
			}
			countdownValue.set(sequence[index]);
		}, 900);
	}

	function beginGameplay() {
		gameState.set('running');
		flow.set('playing');
		manualHintVisible.set(get(detectorMode) === 'manual');
		if (gameCanvas) {
			gameCanvas.resume();
		}
		if (movementDetector) {
			movementDetector.start();
		}
	}

	function handlePauseToggle() {
		const currentFlow = get(flow);
		if (currentFlow === 'playing') {
			gameState.set('paused');
			flow.set('paused');
			if (gameCanvas) {
				gameCanvas.pause();
			}
		} else if (currentFlow === 'paused') {
			gameState.set('running');
			flow.set('playing');
			if (gameCanvas) {
				gameCanvas.resume();
			}
		}
	}

	function handleLevelFailed() {
		gameState.set('finished');
		flow.set('results');
		outcome.set('failed');
		manualHintVisible.set(get(detectorMode) === 'manual');
	}

	function handleRep(source: 'pose' | 'manual') {
		if (get(gameState) !== 'running') return;

		const level = get(selectedLevel);
		if (!level) return;

		if (gameCanvas) {
			gameCanvas.jump();
		}

		if (level.id === 'tutorial') {
			const updatedScore = get(score) + 1;
			score.set(updatedScore);

			if (level.targetReps !== null && updatedScore >= level.targetReps) {
				gameState.set('finished');
				flow.set('results');
				outcome.set('success');
				unlockNextLevel(level.id);
				manualHintVisible.set(false);
				if (gameCanvas) {
					gameCanvas.freeze();
				}
			}
		}

		if (source === 'manual' && get(detectorMode) === 'manual') {
			manualHintVisible.set(true);
		}
	}

	function handlePipeCleared() {
		if (get(gameState) !== 'running') return;

		const level = get(selectedLevel);
		if (!level || level.id === 'tutorial') return;

		const updatedScore = get(score) + 1;
		score.set(updatedScore);

		if (level.targetReps !== null) {
			if (updatedScore >= level.targetReps) {
				gameState.set('finished');
				flow.set('results');
				outcome.set('success');
				unlockNextLevel(level.id);
				manualHintVisible.set(false);
				if (gameCanvas) {
					gameCanvas.freeze();
				}
			}
		} else if (level.id === 'infinite' && updatedScore > get(bestScore)) {
			bestScore.set(updatedScore);
		}
	}

	function retryLevel() {
		const level = get(selectedLevel);
		if (!level) {
			flow.set('levels');
			return;
		}
		resetForPreflight(level);
		flow.set('preflight');
	}

	function changeLevel() {
		gameState.set('idle');
		flow.set('levels');
		outcome.set(null);
		clearBodySegments();
	}

	function changeExercise() {
		gameState.set('idle');
		selectedLevelId.set(null);
		flow.set('exercise');
		outcome.set(null);
		clearBodySegments();
	}

	function handleDetectorModeChange(
		event: CustomEvent<{ mode: DetectorMode; message?: string }>,
	) {
		const { mode, message } = event.detail;
		detectorMode.set(mode);
		detectorMessage.set(
			message ??
				(mode === 'manual'
					? 'Modo manual activado: usa Espacio o toca la pantalla.'
					: 'Seguimiento corporal listo'),
		);
		manualHintVisible.set(
			mode === 'manual' && (get(flow) === 'playing' || get(flow) === 'preflight'),
		);
	}

	function handleDetectorError(event: CustomEvent<string>) {
		const message = event.detail ?? 'La cámara no está disponible';
		detectorMessage.set(message);
		detectorMode.set('manual');
		manualHintVisible.set(true);
	}

	function handleDetectorStatus(event: CustomEvent<string>) {
		detectorMessage.set(event.detail);
	}

	function handleDetectorCoaching(event: CustomEvent<{ message: string; tone: CoachingTone }>) {
		detectorCoaching.set(event.detail);
	}

	function handleDetectorSegments(event: CustomEvent<Array<{ label: string; ok: boolean }>>) {
		bodySegments.set(event.detail);
	}

	type TutorialTelemetryPayload =
		| { reset: true }
		| {
				reset?: false;
				stage: string;
				message: string;
				progress: number;
				status?: TutorialStageStatus;
		  };

	function handleTutorialTelemetry(event: CustomEvent<TutorialTelemetryPayload>) {
		const detail = event.detail;
		if ('reset' in detail && detail.reset) {
			tutorialStages.set([]);
			return;
		}

		const { stage, message, progress, status: incomingStatus } = detail;
		const status: TutorialStageStatus = incomingStatus === 'complete' ? 'complete' : 'active';
		const clampedProgress = Math.min(Math.max(progress, 0), 1);
		tutorialStages.update((current) => {
			const stages: TutorialStage[] = [...current];
			const existingIndex = stages.findIndex((entry) => entry.id === stage);
			if (existingIndex >= 0) {
				stages[existingIndex] = {
					...stages[existingIndex],
					message,
					progress: clampedProgress,
					status,
				};
				return stages.slice(0, existingIndex + 1);
			}

			for (let index = 0; index < stages.length; index += 1) {
				if (stages[index].status === 'active') {
					stages[index] = { ...stages[index], status: 'complete', progress: 1 };
				}
			}

			stages.push({
				id: stage,
				message,
				progress: status === 'complete' ? 1 : clampedProgress,
				status,
			});
			return stages;
		});
	}

	function handleManualKeydown(event: KeyboardEvent) {
		if (get(flow) !== 'playing') return;
		if (get(detectorMode) !== 'manual') return;

		if (event.code === 'Space' || event.code === 'Enter') {
			event.preventDefault();
			handleRep('manual');
		}
	}

	function handleManualPointer(event: PointerEvent | TouchEvent) {
		if (get(flow) !== 'playing') return;
		if (get(detectorMode) !== 'manual') return;
		if (event instanceof PointerEvent && event.pointerType === 'mouse' && event.button !== 0)
			return;

		const target = (event.target as HTMLElement | null) ?? null;
		if (target && target.closest('[data-ignore-manual]')) {
			return;
		}
		handleRep('manual');
	}

	onMount(() => {
		if (!isBrowser) return;

		hydrateFromStorage();
		persistSubscriptions();

		const keyListener = (event: KeyboardEvent) => handleManualKeydown(event);
		const pointerListener = (event: PointerEvent) => handleManualPointer(event);
		const touchListener = (event: TouchEvent) => handleManualPointer(event);

		window.addEventListener('keydown', keyListener);
		window.addEventListener('pointerdown', pointerListener);
		window.addEventListener('touchstart', touchListener);

		return () => {
			clearCountdown();
			unsubscribers.forEach((unsubscribe) => unsubscribe());
			window.removeEventListener('keydown', keyListener);
			window.removeEventListener('pointerdown', pointerListener);
			window.removeEventListener('touchstart', touchListener);
		};
	});
</script>

<main class="game-root" data-flow={$flow}>
	<GameCanvas
		bind:this={gameCanvas}
		gameState={$gameState}
		invincible={$selectedLevel?.invincible ?? false}
		pipesGoal={$pipesGoal}
		ignoreGround={$selectedLevel ? $selectedLevel.id !== 'tutorial' : false}
		on:levelFailed={handleLevelFailed}
		on:pipeCleared={handlePipeCleared}
	/>

	<header class="hud-top" class:hidden={!$showGameHud} aria-live="polite">
		<div class="score-pill">
			<span>🔥 {$scoreLabel}: <b>{$score}</b></span>
			{#if $remainingGoal !== null}
				<span>🎯 Restantes: <b>{$remainingGoal}</b></span>
			{:else if $isInfiniteLevel}
				<span>🏆 Récord: <b>{$bestScore}</b></span>
			{/if}
		</div>
		<button
			class="btn-ghost"
			type="button"
			on:click={handlePauseToggle}
			aria-label={$flow === 'paused'
				? 'Reanudar la sesión de I’m-pulse'
				: 'Pausar la sesión de I’m-pulse'}
		>
			{$flow === 'paused' ? '▶️' : '⏸️'}
		</button>
	</header>

	<section class="pip" aria-live="polite" aria-label="Detector de movimiento">
		<MovementDetector
			bind:this={movementDetector}
			exerciseId={$selectedExercise?.id ?? null}
			tutorial={$selectedLevel?.id === 'tutorial'}
			active={$flow === 'countdown' || $flow === 'playing'}
			on:rep={() => handleRep('pose')}
			on:modechange={handleDetectorModeChange}
			on:error={handleDetectorError}
			on:status={handleDetectorStatus}
			on:coaching={handleDetectorCoaching}
			on:segments={handleDetectorSegments}
			on:telemetry={handleTutorialTelemetry}
		/>
		<p class="pip-status" role="status">{$detectorMessage}</p>
		<p class="pip-coaching" data-tone={$detectorCoaching.tone}>
			{$detectorCoaching.message}
		</p>
		{#if $bodySegments.length}
			<ul class="segment-checklist" aria-label="Partes detectadas por la cámara">
				{#each $bodySegments as segment}
					<li class:ok={segment.ok}>
						<span aria-hidden="true">{segment.ok ? '✔' : '○'}</span>
						<span>{segment.label}</span>
					</li>
				{/each}
			</ul>
		{/if}
	</section>

	{#if $flow === 'exercise'}
		<section class="screen exercise-screen ui-panel" data-ignore-manual>
			<h1>I’m-pulse</h1>
			<p class="screen-lead">
				Elige el movimiento que impulsará tu vuelo. Cada repetición ayuda al ave a volar.
			</p>
			<div class="exercise-grid">
				{#each EXERCISES as exercise}
					<button
						type="button"
						class="exercise-card"
						on:click={() => chooseExercise(exercise.id)}
						aria-pressed={$selectedExercise?.id === exercise.id}
					>
						<img
							src={exercise.image}
							alt={`Ilustración de ${exercise.name}`}
							loading="lazy"
							decoding="async"
						/>
						<div class="exercise-body">
							<h2>{exercise.name}</h2>
							<p class="tagline">{exercise.tagline}</p>
							<p>{exercise.description}</p>
							<ul>
								{#each exercise.checkpoints as checkpoint}
									<li>{checkpoint}</li>
								{/each}
							</ul>
						</div>
					</button>
				{/each}
			</div>
			{#if $selectedExercise}
				<button
					class="btn-primary primary-cta"
					type="button"
					on:click={() => flow.set('levels')}
				>
					Elegir nivel
				</button>
			{/if}
		</section>
	{:else if $flow === 'levels'}
		<section class="screen level-screen ui-panel" data-ignore-manual>
			<div class="screen-header">
				<button
					class="btn-ghost"
					type="button"
					on:click={changeExercise}
					aria-label="Volver a la selección de ejercicio"
				>
					← Ejercicio
				</button>
				<h1>Elige tu desafío</h1>
			</div>
			<p class="screen-lead">
				Atravesar compuertas suma puntos para superar el nivel. El Tutorial registra
				repeticiones y está disponible desde el inicio.
			</p>
			<div class="level-list">
				{#each LEVELS as level}
					<button
						type="button"
						class="level-card"
						class:locked={!isLevelUnlocked(level.id)}
						on:click={() => chooseLevel(level)}
						disabled={!isLevelUnlocked(level.id)}
						aria-pressed={$selectedLevel?.id === level.id}
						aria-describedby={`level-desc-${level.id}`}
					>
						<div class="level-header">
							<span class="badge">{level.badge}</span>
							<h2>{level.name}</h2>
						</div>
						<p id={`level-desc-${level.id}`}>
							{#if level.id === 'tutorial'}
								Repeticiones libres
							{:else if level.targetReps !== null}
								{level.targetReps} puntos
							{:else}
								Puntos infinitos
							{/if}
						</p>
						<p class="level-detail">{level.description}</p>
						{#if !isLevelUnlocked(level.id)}
							<span class="lock-label" aria-hidden="true"
								>{levelRequirementLabel(level)}</span
							>
						{/if}
					</button>
				{/each}
			</div>
			<p class="sr-only" aria-live="polite">{lockedAnnouncement}</p>
		</section>
	{:else if $flow === 'preflight' && $selectedExercise && $selectedLevel}
		<section class="screen preflight-screen ui-panel" data-ignore-manual>
			<div class="screen-header">
				<button
					class="btn-ghost"
					type="button"
					on:click={changeLevel}
					aria-label="Volver a la selección de nivel"
				>
					← Niveles
				</button>
				<h1>Vista previa</h1>
			</div>
			<div class="preflight-body">
				<div class="summary-card">
					<h2>{$selectedExercise.name}</h2>
					<p>{$selectedExercise.description}</p>
					<ul>
						{#each $selectedExercise.checkpoints as checkpoint}
							<li>{checkpoint}</li>
						{/each}
					</ul>
				</div>
				<div class="summary-card">
					<h2>{$selectedLevel.name}</h2>
					<p>{$selectedLevel.description}</p>
					<p class="target">
						{#if $selectedLevel.id === 'tutorial'}
							Practica libremente registrando tus repeticiones
						{:else if $selectedLevel.targetReps !== null}
							{$selectedLevel.targetReps} puntos para completar
						{:else}
							Puntos infinitos: supera tu propio récord
						{/if}
					</p>
					{#if $selectedLevel.id === 'tutorial'}
						<div class="tutorial-guide">
							<h3>Guía rápida</h3>
							<ul>
								{#each TUTORIAL_GUIDES[$selectedExercise.id] as tip}
									<li>{tip}</li>
								{/each}
							</ul>
							<p class="tutorial-note">
								Practica la técnica sin preocuparte por las colisiones.
							</p>
						</div>
					{/if}
					{#if $isManualMode}
						<p class="manual-note">
							Modo manual activo. Usa la barra espaciadora o toca la pantalla para
							sumar {$scoreLabel.toLowerCase()}.
						</p>
					{/if}
				</div>
			</div>
			<div class="preflight-actions">
				<button class="btn-primary" type="button" on:click={startCountdown}>
					Comenzar
				</button>
				<button class="btn-ghost" type="button" on:click={changeExercise}>
					Cambiar ejercicio
				</button>
			</div>
		</section>
	{:else if $flow === 'paused'}
		<section class="modal-overlay ui-panel" data-ignore-manual>
			<div class="card">
				<h1>Pausa</h1>
				<p>Toma aire y vuelve cuando estés listo.</p>
				<button class="btn-primary" type="button" on:click={handlePauseToggle}
					>Reanudar</button
				>
				<div class="modal-actions">
					<button type="button" class="btn-ghost" on:click={retryLevel}
						>Reiniciar nivel</button
					>
					<button type="button" class="btn-ghost" on:click={changeLevel}
						>Cambiar nivel</button
					>
				</div>
			</div>
		</section>
	{:else if $flow === 'results' && $selectedLevel}
		<section class="modal-overlay ui-panel" data-ignore-manual>
			<div class="card">
				{#if $outcome === 'success'}
					<h1>¡Nivel superado!</h1>
					<p>Buen trabajo: abriste el siguiente cielo.</p>
				{:else}
					<h1>Vuelo interrumpido</h1>
					<p>Intenta otra vez o prueba con otro nivel.</p>
				{/if}
				<div class="final-scores">
					<p class="sub">{$scoreLabel}: <strong>{$score}</strong></p>
					{#if $isInfiniteLevel}
						<p class="sub">Mejor racha: <strong>{$bestScore}</strong></p>
					{/if}
				</div>
				<div class="modal-actions">
					<button class="btn-primary" type="button" on:click={retryLevel}>
						Intentar de nuevo
					</button>
					<button class="btn-ghost" type="button" on:click={changeLevel}>
						Seleccionar otro nivel
					</button>
					<button class="btn-ghost" type="button" on:click={changeExercise}>
						Seleccionar otro ejercicio
					</button>
				</div>
			</div>
		</section>
	{/if}

	{#if $showCountdownOverlay}
		<div class="countdown-overlay" data-ignore-manual>
			<span class:go={$countdownValue === '¡Vamos!'}>{$countdownValue}</span>
			<p>
				{$countdownValue === '¡Vamos!' ? '¡A volar!' : 'Comenzamos en…'}
			</p>
		</div>
	{/if}

	<div class="toast" class:hidden={!$manualHintVisible}>
		Modo manual: usa la barra espaciadora o Enter, o toca la pantalla para volar.
	</div>
	{#if $selectedLevel?.id === 'tutorial' && ($flow === 'countdown' || $flow === 'playing' || $flow === 'paused')}
		<aside class="tutorial-panel" data-tone={$detectorCoaching.tone}>
			<h2>Domina el movimiento</h2>
			<p>{$tutorialActiveStage?.message ?? $detectorCoaching.message}</p>
			{#if $tutorialStages.length}
				<ul class="tutorial-stage-list">
					{#each $tutorialStages as stage, index}
						<li class="tutorial-stage" class:complete={stage.status === 'complete'}>
							<div class="tutorial-stage-label">
								<span class="stage-index" aria-hidden="true">{index + 1}.</span>
								<span>{stage.message}</span>
							</div>
							<div class="tutorial-progress">
								<div style={`width: ${Math.round(stage.progress * 100)}%`} />
							</div>
						</li>
					{/each}
				</ul>
			{/if}
		</aside>
	{:else if $showGameHud}
		<div class="coaching-banner" data-tone={$detectorCoaching.tone}>
			{$detectorCoaching.message}
		</div>
	{/if}
</main>
