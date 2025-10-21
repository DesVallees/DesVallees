<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	// Props del componente
	export let gameState: 'welcome' | 'running' | 'paused' | 'gameover' = 'welcome';
	export let score: any;
	export const bestScore: any = null; // No se usa en este componente

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let animationId: number;
	let gameRunning = false;
	let isPaused = false;
	let dpr = 1;
	let currentGameState: 'welcome' | 'running' | 'paused' | 'gameover' = 'welcome';

	// Configuración del juego
	const GRAVITY = 0.1;
	const JUMP_FORCE = -5;
	const PIPE_WIDTH = 50;
	const PIPE_GAP = 400; // Aumentado para mejor espaciado
	const PIPE_SPEED = 1.5;
	const PIPE_SPAWN_DISTANCE = 200; // Distancia inicial desde el ave

	// Estado del juego
	let bird = {
		x: 80,
		y: 0,
		velocity: 0,
		size: 25,
	};

	let pipes: any[] = [];
	let currentScore = 0;
	let frameCount = 0;
	let gameWidth = 0;
	let gameHeight = 0;

	onMount(() => {
		if (canvas) {
			ctx = canvas.getContext('2d')!;
			setupCanvas();
			startGameLoop();
			setupEventListeners();
			setupKeyboardControls();
			setupTouchControls();
		}
	});

	onDestroy(() => {
		if (animationId) {
			cancelAnimationFrame(animationId);
		}
		removeEventListeners();
		removeKeyboardControls();
		removeTouchControls();
	});

	// =====================
	// CONFIGURACIÓN DEL CANVAS
	// =====================
	function setupCanvas() {
		if (!canvas || !ctx) return;

		// Obtener DPR para pantallas retina
		dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

		// Configurar tamaño del canvas
		resizeCanvas();

		// Configurar estilo del canvas
		canvas.style.width = '100vw';
		canvas.style.height = '100vh';
		canvas.style.display = 'block';
		canvas.style.cursor = 'pointer';
		canvas.style.touchAction = 'manipulation';
	}

	function resizeCanvas() {
		if (!canvas || !ctx) return;

		// Obtener dimensiones del viewport
		gameWidth = typeof window !== 'undefined' ? window.innerWidth : 400;
		gameHeight = typeof window !== 'undefined' ? window.innerHeight : 600;

		// Configurar tamaño real del canvas (para nitidez)
		canvas.width = Math.floor(gameWidth * dpr);
		canvas.height = Math.floor(gameHeight * dpr);

		// Escalar el contexto para pantallas retina
		ctx.scale(dpr, dpr);

		// Ajustar posición inicial del ave
		bird.y = gameHeight / 2;
	}

	function setupEventListeners() {
		if (typeof window === 'undefined') return;

		window.addEventListener('resize', handleResize);
		window.addEventListener('orientationchange', handleResize);
	}

	function removeEventListeners() {
		if (typeof window === 'undefined') return;

		window.removeEventListener('resize', handleResize);
		window.removeEventListener('orientationchange', handleResize);
	}

	function handleResize() {
		resizeCanvas();
	}

	// =====================
	// CONTROLES DE TECLADO
	// =====================
	function setupKeyboardControls() {
		if (typeof document === 'undefined') return;

		document.addEventListener('keydown', handleKeyPress);
	}

	function removeKeyboardControls() {
		if (typeof document === 'undefined') return;

		document.removeEventListener('keydown', handleKeyPress);
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.code === 'Space') {
			event.preventDefault();
			// Llamar directamente a la función de salto
			jump();
		}
	}

	// =====================
	// CONTROLES TÁCTILES
	// =====================
	function setupTouchControls() {
		if (!canvas) return;

		canvas.addEventListener('touchstart', handleTouch, { passive: false });
		canvas.addEventListener('click', handleClick);
	}

	function removeTouchControls() {
		if (!canvas) return;

		canvas.removeEventListener('touchstart', handleTouch);
		canvas.removeEventListener('click', handleClick);
	}

	function handleTouch(event: TouchEvent) {
		event.preventDefault();
		jump();
	}

	function handleClick(event: MouseEvent) {
		event.preventDefault();
		jump();
	}

	function startGameLoop() {
		function gameLoop() {
			update();
			draw();
			animationId = requestAnimationFrame(gameLoop);
		}
		gameLoop();
	}

	function update() {
		// Solo actualizar si el juego está corriendo y no está pausado
		if (currentGameState !== 'running' || isPaused) return;

		// Actualizar ave
		bird.velocity += GRAVITY;
		bird.y += bird.velocity;

		// Generar tuberías con espaciado adaptativo
		const pipeSpawnInterval = gameWidth > 800 ? 150 : 120; // Más espaciado en pantallas grandes
		if (frameCount % pipeSpawnInterval === 0) {
			generatePipe();
		}

		// Actualizar tuberías
		pipes.forEach((pipe, index) => {
			pipe.x -= PIPE_SPEED;

			// Verificar puntuación
			if (pipe.x + PIPE_WIDTH < bird.x && !pipe.scored) {
				pipe.scored = true;
				currentScore++;
				score.set(currentScore);
				dispatch('scoreUpdate', currentScore);
			}
		});

		// Eliminar tuberías fuera de pantalla
		pipes = pipes.filter((pipe) => pipe.x + PIPE_WIDTH > 0);

		// Verificar colisiones
		if (checkCollisions()) {
			dispatch('gameOver');
			return;
		}

		frameCount++;
	}

	function draw() {
		if (!ctx) return;

		// Limpiar canvas
		ctx.fillStyle = '#87CEEB';
		ctx.fillRect(0, 0, gameWidth, gameHeight);

		// Dibujar suelo
		ctx.fillStyle = '#8B4513';
		ctx.fillRect(0, gameHeight - 50, gameWidth, 50);

		// Dibujar tuberías
		pipes.forEach((pipe) => {
			drawPipe(pipe);
		});

		// Dibujar ave
		drawBird();

		// Dibujar mensaje de inicio
		if (currentGameState === 'welcome') {
			drawStartMessage();
		}
	}

	function drawBird() {
		ctx.save();
		ctx.translate(bird.x, bird.y);

		// Cuerpo del ave
		ctx.fillStyle = '#FFD700';
		ctx.beginPath();
		ctx.arc(0, 0, bird.size, 0, Math.PI * 2);
		ctx.fill();

		// Ojo
		ctx.fillStyle = '#000';
		ctx.beginPath();
		ctx.arc(8, -5, 5, 0, Math.PI * 2);
		ctx.fill();

		// Pico
		ctx.fillStyle = '#FF6347';
		ctx.beginPath();
		ctx.moveTo(bird.size, 0);
		ctx.lineTo(bird.size + 10, -3);
		ctx.lineTo(bird.size + 10, 3);
		ctx.closePath();
		ctx.fill();

		// Ala
		ctx.fillStyle = '#FFA500';
		ctx.beginPath();
		ctx.ellipse(-5, 0, 15, 8, 0, 0, Math.PI * 2);
		ctx.fill();

		ctx.restore();
	}

	function drawPipe(pipe: any) {
		ctx.fillStyle = '#228B22';

		// Tubería superior
		ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);

		// Tubería inferior
		ctx.fillRect(
			pipe.x,
			pipe.topHeight + PIPE_GAP,
			PIPE_WIDTH,
			gameHeight - pipe.topHeight - PIPE_GAP,
		);

		// Bordes de las tuberías
		ctx.strokeStyle = '#006400';
		ctx.lineWidth = 3;
		ctx.strokeRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
		ctx.strokeRect(
			pipe.x,
			pipe.topHeight + PIPE_GAP,
			PIPE_WIDTH,
			gameHeight - pipe.topHeight - PIPE_GAP,
		);
	}

	function drawStartMessage() {
		ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
		ctx.fillRect(0, 0, gameWidth, gameHeight);

		ctx.fillStyle = '#FFFFFF';
		ctx.font = 'bold 24px Arial';
		ctx.textAlign = 'center';
		ctx.fillText('¡Juego de Apan!', gameWidth / 2, gameHeight / 2 - 50);

		ctx.font = '16px Arial';
		ctx.fillText('Mueve un objeto rojo o presiona ESPACIO', gameWidth / 2, gameHeight / 2);
		ctx.fillText('para empezar a volar', gameWidth / 2, gameHeight / 2 + 25);
	}

	function generatePipe() {
		const topHeight = Math.random() * (gameHeight - PIPE_GAP - 100) + 50;
		pipes.push({
			x: gameWidth,
			topHeight: topHeight,
			scored: false,
		});
	}

	// Generar primera tubería con distancia adaptativa
	function generateFirstPipe() {
		const topHeight = Math.random() * (gameHeight - PIPE_GAP - 100) + 50;
		// Distancia inicial adaptativa: más cerca en pantallas pequeñas, más lejos en grandes
		const adaptiveDistance = gameWidth > 800 ? PIPE_SPAWN_DISTANCE * 1.5 : PIPE_SPAWN_DISTANCE;
		pipes.push({
			x: bird.x + adaptiveDistance,
			topHeight: topHeight,
			scored: false,
		});
	}

	function checkCollisions() {
		// Colisión con el suelo
		if (bird.y + bird.size > gameHeight - 50) {
			return true;
		}

		// Colisión con tuberías
		for (let pipe of pipes) {
			if (bird.x + bird.size > pipe.x && bird.x - bird.size < pipe.x + PIPE_WIDTH) {
				if (
					bird.y - bird.size < pipe.topHeight ||
					bird.y + bird.size > pipe.topHeight + PIPE_GAP
				) {
					return true;
				}
			}
		}

		return false;
	}

	// =====================
	// FUNCIONES PÚBLICAS
	// =====================
	export function jump() {
		if (currentGameState === 'running') {
			bird.velocity = JUMP_FORCE;
		}
	}

	export function pause() {
		isPaused = true;
	}

	export function resume() {
		isPaused = false;
	}

	export function reset() {
		bird = {
			x: 80,
			y: gameHeight / 2,
			velocity: 0,
			size: 25,
		};
		pipes = [];
		currentScore = 0;
		frameCount = 0;
		score.set(0);

		// Generar primera tubería con distancia adaptativa
		generateFirstPipe();
	}

	// =====================
	// REACTIVIDAD
	// =====================
	// Actualizar estado cuando cambie la prop
	$: currentGameState = gameState;
</script>

<canvas bind:this={canvas} class="game-canvas" tabindex="0" />
