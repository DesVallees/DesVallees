<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	export let onJump: () => void;

	const dispatch = createEventDispatcher();

	let video: HTMLVideoElement;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let isDetecting = false;
	let cameraActive = false;
	let errorMessage = '';
	let jumpCooldown = false;
	let jumpCooldownTime = 500; // ms
	let movementFeedback = false;
	let feedbackTimeout: ReturnType<typeof setTimeout> | null = null;
	let redObjectDetected = false;
	let lastRedPosition: number | null = null;
	let redObjectThreshold = 10; // Minimum red pixels to detect object
	let movementThreshold = 10; // Minimum movement to trigger jump
	let detectionFPS = 12; // Limitar FPS para ahorrar batería móvil
	let lastDetectionTime = 0;

	onMount(async () => {
		await startCamera();
	});

	onDestroy(() => {
		stopCamera();
	});

	async function startCamera() {
		if (typeof navigator === 'undefined' || !navigator.mediaDevices) return;

		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					width: { ideal: 640 },
					height: { ideal: 480 },
					facingMode: 'user',
				},
			});

			if (video) {
				video.srcObject = stream;
				video.play();
				cameraActive = true;
				startDetection();
			}
		} catch (error) {
			console.error('Error accediendo a la cámara:', error);
			errorMessage =
				'No se pudo acceder a la cámara. Usa la tecla ESPACIO o toca la pantalla.';
		}
	}

	function stopCamera() {
		if (video && video.srcObject) {
			const stream = video.srcObject as MediaStream;
			if (stream && typeof stream.getTracks === 'function') {
				const tracks = stream.getTracks();
				tracks.forEach((track: MediaStreamTrack) => track.stop());
			}
			video.srcObject = null;
		}
		cameraActive = false;
		isDetecting = false;
	}

	async function startDetection() {
		if (!video || !canvas) return;

		isDetecting = true;
		ctx = canvas.getContext('2d')!;
		canvas.width = 320;
		canvas.height = 240;

		function detectRedObject() {
			if (!isDetecting || !video || !ctx) return;

			// Limitar FPS para ahorrar batería móvil
			const now = Date.now();
			if (now - lastDetectionTime < 1000 / detectionFPS) {
				if (isDetecting) {
					requestAnimationFrame(detectRedObject);
				}
				return;
			}
			lastDetectionTime = now;

			try {
				// Draw video frame to canvas
				ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

				// Get image data
				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				const data = imageData.data;

				// Detect red objects
				const redPixels = detectRedPixels(data);
				const wasDetected = redObjectDetected;
				redObjectDetected = redPixels.count > redObjectThreshold;

				// Emitir evento de detección si cambió el estado
				if (redObjectDetected !== wasDetected) {
					dispatch('redObjectDetection', redObjectDetected);
				}

				// If red object detected, track its position
				if (redObjectDetected) {
					const currentPosition = redPixels.centerY;

					// Check for movement (squat detection)
					if (lastRedPosition !== null) {
						const movement = lastRedPosition - currentPosition;

						// If object moved up significantly (squat up motion)
						if (movement > movementThreshold) {
							triggerJump();
						}
					}

					lastRedPosition = currentPosition;

					// Draw red object indicator
					drawRedObjectIndicator(redPixels.centerX, redPixels.centerY);
				} else {
					lastRedPosition = null;
				}

				if (isDetecting) {
					requestAnimationFrame(detectRedObject);
				}
			} catch (error) {
				console.error('Error en detección de color:', error);
				isDetecting = false;
			}
		}

		detectRedObject();
	}

	function detectRedPixels(data: Uint8ClampedArray) {
		let redPixels = 0;
		let totalX = 0;
		let totalY = 0;

		// Scan every 4th pixel for performance
		for (let i = 0; i < data.length; i += 16) {
			const r = data[i];
			const g = data[i + 1];
			const b = data[i + 2];

			// Check if pixel is red (high red, low green, low blue)
			if (r > 150 && g < 100 && b < 100) {
				redPixels++;
				const pixelIndex = i / 4;
				const x = pixelIndex % canvas.width;
				const y = Math.floor(pixelIndex / canvas.width);
				totalX += x;
				totalY += y;
			}
		}

		return {
			count: redPixels,
			centerX: redPixels > 0 ? totalX / redPixels : 0,
			centerY: redPixels > 0 ? totalY / redPixels : 0,
		};
	}

	function drawRedObjectIndicator(x: number, y: number) {
		if (!ctx) return;

		// Draw circle around detected red object
		ctx.strokeStyle = '#00FF00';
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.arc(x, y, 20, 0, 2 * Math.PI);
		ctx.stroke();

		// Draw center point
		ctx.fillStyle = '#00FF00';
		ctx.beginPath();
		ctx.arc(x, y, 3, 0, 2 * Math.PI);
		ctx.fill();
	}

	function triggerJump() {
		if (jumpCooldown) return;

		jumpCooldown = true;

		// Show movement feedback
		showMovementFeedback();

		if (onJump) onJump();

		// Resetear cooldown
		setTimeout(() => {
			jumpCooldown = false;
		}, jumpCooldownTime);
	}

	function showMovementFeedback() {
		movementFeedback = true;

		// Clear existing timeout
		if (feedbackTimeout) {
			clearTimeout(feedbackTimeout);
		}

		// Hide feedback after 1 second
		feedbackTimeout = setTimeout(() => {
			movementFeedback = false;
		}, 1000);
	}

	function toggleCamera() {
		if (cameraActive) {
			stopCamera();
		} else {
			startCamera();
		}
	}

	async function retryStartCamera() {
		errorMessage = '';
		await startCamera();
	}
</script>

<!-- =====================
     PiP CÁMARA - DISEÑO MÓVIL-FIRST
     ===================== -->
<div class="pip-image">
	{#if errorMessage}
		<div class="pip-error">
			<p>❌ Error</p>
			<button class="pip-retry" on:click={retryStartCamera}>🔄</button>
		</div>
	{:else}
		<video bind:this={video} class="pip-video" autoplay muted playsinline />
		<canvas bind:this={canvas} class="pip-canvas" />
	{/if}

	<!-- Badge de estado -->
	<div class="status-badge">
		{#if cameraActive && isDetecting}
			{redObjectDetected ? '✅ Objeto Encontrado' : '❌ Objeto No Encontrado'}
		{:else if cameraActive}
			⏳ Iniciando...
		{:else}
			📹 Cámara desactivada
		{/if}
	</div>

	<!-- Botón de toggle (solo visible en escritorio) -->
	<button class="pip-toggle" on:click={toggleCamera} aria-label="Toggle Camera">
		{cameraActive ? '📹 ENC' : '📹 DES'}
	</button>
</div>

<style>
	/* =====================
	   PiP CÁMARA - ESTILOS MÓVIL-FIRST
	   ===================== */
	.pip-image {
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: var(--border-radius);
		overflow: hidden;
		background: var(--card);
		backdrop-filter: blur(12px);
		box-shadow: var(--shadow);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.pip-video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.pip-canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.pip-error {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		padding: 10px;
		text-align: center;
		color: var(--text);
	}

	.pip-error p {
		margin: 0 0 10px 0;
		font-size: 0.8rem;
		font-weight: 600;
	}

	.pip-retry {
		background: var(--glass);
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: var(--text);
		padding: 6px 12px;
		border-radius: var(--border-radius-full);
		cursor: pointer;
		font-size: 0.8rem;
		transition: all var(--t);
	}

	.pip-retry:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: scale(1.05);
	}

	.status-badge {
		position: absolute;
		bottom: 5px;
		left: 50%;
		transform: translateX(-50%);
		background: var(--glass);
		color: var(--text);
		padding: 2px 8px;
		font-size: 0.6rem;
		border-radius: var(--border-radius-full);
		border: 1px solid rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(8px);
		white-space: nowrap;
		font-weight: 500;
	}

	.pip-toggle {
		position: absolute;
		top: 5px;
		right: 5px;
		background: var(--glass);
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: var(--text);
		padding: 4px 8px;
		border-radius: var(--border-radius-full);
		cursor: pointer;
		font-size: 0.7rem;
		transition: all var(--t);
		opacity: 0.7;
	}

	.pip-toggle:hover {
		opacity: 1;
		background: rgba(255, 255, 255, 0.2);
		transform: scale(1.05);
	}
</style>
