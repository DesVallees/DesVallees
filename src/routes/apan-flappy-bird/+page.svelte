<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import './+page.css';
	import GameCanvas from './components/GameCanvas.svelte';
	import MovementDetector from './components/MovementDetector.svelte';

	// =====================
	// ESTADO GLOBAL DEL JUEGO
	// =====================
	export const gameState = writable<'welcome' | 'running' | 'paused' | 'gameover'>('welcome');
	export const score = writable(0);
	export const bestScore = writable(0);
	export const needsRedObject = writable(false);
	export const isPaused = writable(false);

	// Referencias a componentes
	let gameCanvas: any = null;
	let movementDetector: any = null;

	// Estado local para reactividad
	let currentScore = 0;
	let currentBestScore = 0;
	let currentGameState: 'welcome' | 'running' | 'paused' | 'gameover' = 'welcome';
	let currentNeedsRedObject = false;
	let currentIsPaused = false;

	// =====================
	// SUSCRIPCIONES AL STORE
	// =====================
	onMount(() => {
		// Cargar mejor puntuación del localStorage
		if (typeof localStorage !== 'undefined') {
			const savedBestScore = localStorage.getItem('apan-flappy-best-score');
			if (savedBestScore) {
				const best = parseInt(savedBestScore);
				bestScore.set(best);
				currentBestScore = best;
			}
		}

		// Suscribirse a cambios del store
		const unsubscribeScore = score.subscribe((value) => {
			currentScore = value;
		});

		const unsubscribeBestScore = bestScore.subscribe((value) => {
			currentBestScore = value;
		});

		const unsubscribeGameState = gameState.subscribe((value) => {
			currentGameState = value;
		});

		const unsubscribeNeedsRedObject = needsRedObject.subscribe((value) => {
			currentNeedsRedObject = value;
		});

		const unsubscribeIsPaused = isPaused.subscribe((value) => {
			currentIsPaused = value;
		});

		// Cleanup
		onDestroy(() => {
			unsubscribeScore();
			unsubscribeBestScore();
			unsubscribeGameState();
			unsubscribeNeedsRedObject();
			unsubscribeIsPaused();
		});
	});

	// =====================
	// MÉTODOS DEL JUEGO
	// =====================
	function startGame() {
		gameState.set('running');
		score.set(0);
		isPaused.set(false);
	}

	function pauseGame() {
		if (currentGameState === 'running') {
			gameState.set('paused');
			isPaused.set(true);
			if (gameCanvas) {
				gameCanvas.pause();
			}
		}
	}

	function resumeGame() {
		if (currentGameState === 'paused') {
			gameState.set('running');
			isPaused.set(false);
			if (gameCanvas) {
				gameCanvas.resume();
			}
		}
	}

	function endGame() {
		gameState.set('gameover');
		isPaused.set(false);

		// Actualizar mejor puntuación
		if (currentScore > currentBestScore) {
			bestScore.set(currentScore);
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('apan-flappy-best-score', currentScore.toString());
			}
		}

		// Vibración háptica en colisión
		if (typeof navigator !== 'undefined' && navigator.vibrate) {
			navigator.vibrate(100);
		}
	}

	function resetGame() {
		gameState.set('welcome');
		score.set(0);
		isPaused.set(false);
		if (gameCanvas) {
			gameCanvas.reset();
		}
	}

	function flap() {
		if (currentGameState === 'welcome') {
			startGame();
		} else if (currentGameState === 'running') {
			if (gameCanvas) {
				gameCanvas.jump();
			}
		} else if (currentGameState === 'paused') {
			resumeGame();
		}
	}

	function togglePause() {
		if (currentGameState === 'running') {
			pauseGame();
		} else if (currentGameState === 'paused') {
			resumeGame();
		}
	}

	// =====================
	// MANEJADORES DE EVENTOS
	// =====================
	function onScoreUpdate(event: CustomEvent<number>) {
		score.set(event.detail);
	}

	function onGameOver() {
		endGame();
	}

	function onRedObjectDetection(detected: boolean) {
		needsRedObject.set(!detected);
	}

	function onJump() {
		flap();
	}
</script>

<!-- =====================
     RAÍZ DEL JUEGO - PANTALLA COMPLETA
     ===================== -->
<main class="game-root">
	<!-- Canvas del juego -->
	<GameCanvas
		bind:this={gameCanvas}
		gameState={$gameState}
		{score}
		{bestScore}
		on:scoreUpdate={onScoreUpdate}
		on:gameOver={onGameOver}
	/>

	<!-- HUD superior flotante -->
	<header aria-live="polite" class="hud-top">
		<div class="score-pill">
			<span>🏅 Puntuación: <b>{currentScore}</b></span>
			<span>⭐ Mejor: <b>{currentBestScore}</b></span>
		</div>
		{#if currentGameState === 'running' || currentGameState === 'paused'}
			<button
				class="btn-ghost"
				on:click={togglePause}
				aria-label={currentGameState === 'running' ? 'Pausar' : 'Reanudar'}
			>
				{currentGameState === 'running' ? '⏸' : '▶️'}
			</button>
		{/if}
	</header>

	<!-- Cámara en PiP -->
	<section class="pip" aria-label="Detección de Movimiento">
		<MovementDetector
			bind:this={movementDetector}
			{onJump}
			on:redObjectDetection={(e) => onRedObjectDetection(e.detail)}
		/>
	</section>

	<!-- Modal central para estados -->
	<section
		class="modal"
		class:hidden={currentGameState !== 'welcome' &&
			currentGameState !== 'paused' &&
			currentGameState !== 'gameover'}
	>
		<div class="card">
			{#if currentGameState === 'welcome'}
				<h1>¡Bienvenido al Juego del Apan! <br /> (No sé qué nombre ponerle)</h1>
				<p class="sub">
					Mueve un objeto rojo hacia arriba para volar y evita las tuberías verdes.
				</p>
				<ul class="tips">
					<li>📸 Colócate a la vista de la cámara con un objeto rojo.</li>
					<li>👆 También puedes tocar la pantalla o usar ESPACIO.</li>
					<li>🕹️ Para empezar, haz clic en el botón o empieza a mover el objeto.</li>
				</ul>
				<button class="btn-primary" on:click={startGame}>🎮 Empezar</button>
			{:else if currentGameState === 'paused'}
				<h1>Juego en Pausa</h1>
				<p class="sub">
					El juego está pausado. Haz clic en el botón o continúa moviéndote para reanudar.
				</p>
				<button class="btn-primary" on:click={resumeGame}>▶️ Reanudar</button>
			{:else if currentGameState === 'gameover'}
				<h1>¡Juego Terminado!</h1>
				<div class="final-scores">
					<p class="sub">Puntuación Final: <strong>{currentScore}</strong></p>
					<p class="sub">Mejor Puntuación: <strong>{currentBestScore}</strong></p>
				</div>
				<button class="btn-primary" on:click={resetGame}>🔄 Jugar de Nuevo</button>
			{/if}
		</div>
	</section>

	<!-- Toast contextual para objeto rojo -->
	<div class="toast" class:hidden={!currentNeedsRedObject}>
		🔴 Muestra un objeto rojo a la cámara
	</div>
</main>
