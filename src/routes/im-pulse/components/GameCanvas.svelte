<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	type CanvasGameState = 'idle' | 'countdown' | 'running' | 'paused' | 'finished';

	export let gameState: CanvasGameState = 'idle';
	export let invincible = false;
	export let pipesGoal: number | null = null;
	export let ignoreGround = false;

	const dispatch = createEventDispatcher<{ levelFailed: void; pipeCleared: void }>();

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;
	let animationId: number | null = null;
	let dpr = 1;
	let width = 0;
	let height = 0;

	const GRAVITY = 0.14;
	const JUMP_FORCE = -7;
	const PIPE_WIDTH = 52;
	const PIPE_GAP = 360;
	const PIPE_SPEED = 1.65;
	const PIPE_SPAWN_INTERVAL = 140;

	let bird = {
		x: 100,
		y: 0,
		velocity: 0,
		size: 26,
	};

	type Pipe = {
		x: number;
		topHeight: number;
		cleared: boolean;
	};

	let pipes: Pipe[] = [];
	let frameCount = 0;
	let collisionNotified = false;
	let frozen = false;
	let lastState: CanvasGameState = 'idle';
	let spawnedPipes = 0;
	let previousPipesGoal: number | null = pipesGoal;

	onMount(() => {
		if (!canvas) return;
		ctx = canvas.getContext('2d');
		if (!ctx) return;

		setupCanvas();
		startLoop();
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', handleResize);
			window.addEventListener('orientationchange', handleResize);
		}
	});

	onDestroy(() => {
		if (animationId) {
			cancelAnimationFrame(animationId);
			animationId = null;
		}
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('orientationchange', handleResize);
		}
	});

	function handleResize() {
		if (!canvas || !ctx) return;
		dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
		width = typeof window !== 'undefined' ? window.innerWidth : 400;
		height = typeof window !== 'undefined' ? window.innerHeight : 600;

		canvas.width = Math.floor(width * dpr);
		canvas.height = Math.floor(height * dpr);
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.scale(dpr, dpr);

		if (gameState === 'idle' || gameState === 'countdown') {
			centerBird();
		}
	}

	function setupCanvas() {
		if (!canvas || !ctx) return;
		canvas.style.width = '100vw';
		canvas.style.height = '100vh';
		canvas.style.display = 'block';
		canvas.style.touchAction = 'manipulation';
		canvas.style.userSelect = 'none';
		handleResize();
		resetWorld();
	}

	function startLoop() {
		const loop = () => {
			if (!ctx) return;

			if (!frozen && gameState === 'running') {
				updateWorld();
			} else if (gameState === 'idle' || gameState === 'countdown') {
				bird.velocity *= 0.85;
				bird.y += bird.velocity;
				applyBounds();
			}

			renderWorld();
			animationId = requestAnimationFrame(loop);
		};

		loop();
	}

	function resetWorld() {
		centerBird();
		bird.velocity = 0;
		pipes = [];
		frameCount = 0;
		collisionNotified = false;
		frozen = false;
		spawnedPipes = 0;
	}

	function centerBird() {
		bird.y = height * 0.5;
	}

	function randomPipeHeight() {
		return Math.random() * (height - PIPE_GAP - 160) + 60;
	}

	function updateWorld() {
		bird.velocity += GRAVITY;
		bird.y += bird.velocity;
		applyBounds();

		if (invincible) {
			frameCount += 1;
			return;
		}

		if (
			(pipesGoal === null || spawnedPipes < pipesGoal) &&
			frameCount % PIPE_SPAWN_INTERVAL === 0
		) {
			pipes.push({
				x: width + PIPE_WIDTH,
				topHeight: randomPipeHeight(),
				cleared: false,
			});
			spawnedPipes += 1;
		}

		pipes.forEach((pipe) => {
			pipe.x -= PIPE_SPEED;
			if (!pipe.cleared && pipe.x + PIPE_WIDTH < bird.x - bird.size) {
				pipe.cleared = true;
				dispatch('pipeCleared');
			}
		});

		pipes = pipes.filter((pipe) => pipe.x + PIPE_WIDTH > -120);

		if (checkCollision() && !collisionNotified) {
			collisionNotified = true;
			dispatch('levelFailed');
		}

		frameCount += 1;
	}

	function applyBounds() {
		if (bird.y - bird.size < 0) {
			bird.y = bird.size;
			bird.velocity = 0;
		}
		if (bird.y + bird.size > height - 52) {
			bird.y = height - 52 - bird.size;
			bird.velocity = 0;
		}
	}

	function checkCollision() {
		if (invincible) {
			return false;
		}
		if (!ignoreGround && bird.y + bird.size >= height - 52) {
			return true;
		}

		for (const pipe of pipes) {
			const withinPipeX =
				bird.x + bird.size > pipe.x && bird.x - bird.size < pipe.x + PIPE_WIDTH;
			if (!withinPipeX) continue;

			const hitsTop = bird.y - bird.size < pipe.topHeight;
			const hitsBottom = bird.y + bird.size > pipe.topHeight + PIPE_GAP;
			if (hitsTop || hitsBottom) {
				return true;
			}
		}
		return false;
	}

	function renderWorld() {
		if (!ctx) return;

		ctx.clearRect(0, 0, width, height);

		const gradient = ctx.createLinearGradient(0, 0, width, height);
		gradient.addColorStop(0, '#1b1534');
		gradient.addColorStop(1, '#162a47');
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, width, height);

		drawBackdrop();
		if (!invincible) {
			drawPipes();
		}
		drawGround();
		drawBird();
	}

	function drawBackdrop() {
		if (!ctx) return;
		ctx.save();
		ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
		for (let i = 0; i < 10; i += 1) {
			const radius = 40 + Math.random() * 60;
			const x = (i * width) / 10 + Math.sin(frameCount * 0.01 + i) * 30;
			const y = height * 0.3 + Math.cos(frameCount * 0.008 + i) * 80;
			ctx.beginPath();
			ctx.arc(x, y, radius, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.restore();
	}

	function drawGround() {
		if (!ctx) return;
		ctx.save();
		ctx.fillStyle = '#0f172a';
		ctx.fillRect(0, height - 52, width, 52);
		ctx.fillStyle = '#1f2937';
		for (let x = 0; x < width; x += 32) {
			ctx.fillRect(x, height - 52, 16, 52);
		}
		ctx.restore();
	}

	function drawPipes() {
		if (!ctx) return;
		ctx.save();
		for (const pipe of pipes) {
			const topGradient = ctx.createLinearGradient(pipe.x, 0, pipe.x + PIPE_WIDTH, 0);
			topGradient.addColorStop(0, '#4c1d95');
			topGradient.addColorStop(1, '#7c3aed');
			ctx.fillStyle = topGradient;
			ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);

			const bottomGradient = ctx.createLinearGradient(
				pipe.x,
				pipe.topHeight + PIPE_GAP,
				pipe.x + PIPE_WIDTH,
				pipe.topHeight + PIPE_GAP + 200,
			);
			bottomGradient.addColorStop(0, '#7c3aed');
			bottomGradient.addColorStop(1, '#22d3ee');
			ctx.fillStyle = bottomGradient;
			ctx.fillRect(
				pipe.x,
				pipe.topHeight + PIPE_GAP,
				PIPE_WIDTH,
				height - pipe.topHeight - PIPE_GAP - 52,
			);

			ctx.strokeStyle = 'rgba(255,255,255,0.2)';
			ctx.lineWidth = 4;
			ctx.strokeRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
			ctx.strokeRect(
				pipe.x,
				pipe.topHeight + PIPE_GAP,
				PIPE_WIDTH,
				height - pipe.topHeight - PIPE_GAP - 52,
			);
		}
		ctx.restore();
	}

	function drawBird() {
		if (!ctx) return;
		ctx.save();
		ctx.translate(bird.x, bird.y);

		ctx.beginPath();
		ctx.fillStyle = '#f59e0b';
		ctx.arc(0, 0, bird.size, 0, Math.PI * 2);
		ctx.fill();

		ctx.fillStyle = '#fde68a';
		ctx.beginPath();
		ctx.ellipse(-6, 6, 18, 10, -0.3, 0, Math.PI * 2);
		ctx.fill();

		ctx.fillStyle = '#fb7185';
		ctx.beginPath();
		ctx.moveTo(bird.size - 2, -6);
		ctx.lineTo(bird.size + 16, 0);
		ctx.lineTo(bird.size - 2, 6);
		ctx.closePath();
		ctx.fill();

		ctx.fillStyle = '#fff';
		ctx.beginPath();
		ctx.arc(8, -8, 6, 0, Math.PI * 2);
		ctx.fill();

		ctx.fillStyle = '#1f2937';
		ctx.beginPath();
		ctx.arc(9, -8, 2.5, 0, Math.PI * 2);
		ctx.fill();

		ctx.restore();
	}

	function handleStateChange(next: CanvasGameState, prev: CanvasGameState) {
		if (next === 'idle') {
			resetWorld();
		}

		if (next === 'finished') {
			freeze();
		}

		if (prev === 'paused' && next === 'running') {
			frozen = false;
		}

		if (next === 'paused') {
			frozen = true;
		}

		if (next === 'running') {
			frozen = false;
		}

		if (next === 'countdown') {
			frozen = false;
			collisionNotified = false;
			centerBird();
		}
	}

	export function jump() {
		if (gameState !== 'running' || frozen) return;
		bird.velocity = JUMP_FORCE;
	}

	export function pause() {
		frozen = true;
	}

	export function resume() {
		if (gameState === 'running') {
			frozen = false;
		}
	}

	export function freeze() {
		frozen = true;
	}

	export function reset() {
		resetWorld();
	}

	$: if (gameState !== lastState) {
		handleStateChange(gameState, lastState);
		lastState = gameState;
	}

	$: if (invincible) {
		pipes = [];
	}

	$: if (pipesGoal !== previousPipesGoal) {
		previousPipesGoal = pipesGoal;
		spawnedPipes = 0;
		if (gameState === 'idle' || gameState === 'countdown') {
			resetWorld();
		}
	}
</script>

<canvas bind:this={canvas} class="game-canvas" aria-hidden="true" />
