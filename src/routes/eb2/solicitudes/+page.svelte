<script lang="ts">
	import { receive, send } from '../transitions.js';
	import { flip } from 'svelte/animate';

	export let data;
	const solicitudes = data.solicitudes;

	let filterText: string;
</script>

<svelte:head>
	<title>Solicitudes de evaluación de perfil</title>
	<meta name="description" content="" />
</svelte:head>

<div class="solicitudes">
	<h1>Lista de Solicitudes</h1>
	<div class="search-container">
		<ion-icon name="search" />
		<input
			type="text"
			name="filter"
			id="filter"
			bind:value={filterText}
			placeholder="Buscar solicitudes..."
		/>
	</div>

	<div class="cards">
		{#each solicitudes.filter((solicitud) => !filterText || `${solicitud.fullName}${solicitud.email}${solicitud.phone}${solicitud.linkedin}`
					.toLowerCase()
					.includes(filterText.toLowerCase())) as solicitud (solicitud.id)}
			<div
				class="solicitudCard"
				in:receive|global={{ key: solicitud.id }}
				out:send|global={{ key: solicitud.id }}
				animate:flip={{ duration: 400 }}
			>
				<div class="solicitudCard-header">
					<h2>{solicitud.fullName}</h2>
				</div>
				<div class="solicitudCard-body">
					<p>
						📧 <strong>Email:</strong>
						{#if solicitud.email}
							<a href="mailto:{solicitud.email}">{solicitud.email}</a>
						{:else}
							<span>No proporcionado.</span>
						{/if}
					</p>
					<p>
						📞 <strong>Teléfono:</strong>
						{#if solicitud.phone}
							<a href="tel:{solicitud.phone}">{solicitud.phone}</a>
						{:else}
							<span>No proporcionado.</span>
						{/if}
					</p>
					<p>
						🔗 <strong>LinkedIn:</strong>
						{#if solicitud.linkedin}
							<a href={solicitud.linkedin} target="_blank">{solicitud.linkedin}</a>
						{:else}
							<span>No proporcionado.</span>
						{/if}
					</p>
				</div>
			</div>
		{:else}
			<p>No hay solicitudes para mostrar.</p>
		{/each}
	</div>
</div>

<style>
	.solicitudes {
		padding: 2rem;
		padding-bottom: 3rem;
		min-height: 90vh;
		min-height: 90dvh;
		font-size: 1rem;
	}

	h1 {
		margin-bottom: 2rem;

		text-align: center;
		color: #333;
		font-size: 1.75em;
	}

	/* Search Bar */
	.search-container {
		position: relative;
		width: 100%;
		max-width: 400px;
		margin: 0 auto 2rem;
	}

	.search-container ion-icon {
		position: absolute;
		left: 12px;
		top: 50%;
		transform: translateY(-50%);
		color: #333;
		font-size: 1.2em;
	}

	.search-container input {
		width: 100%;
		padding: 0.5em 1em 0.5em 2.5em;
		border: 1px solid #ccc;
		border-radius: 15px;
		font-size: 1em;
		box-sizing: border-box;
	}

	.search-container input:focus {
		outline: none;
		border-color: #f27931;
	}

	.search-container input::placeholder {
		color: #555;
	}

	/* Body */
	.cards {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1.5em;
	}

	.solicitudCard {
		background-color: #fff;
		border-radius: 5px;
		overflow: hidden;
		width: 400px;
		max-width: calc(100vw - 4rem);
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s, box-shadow 0.2s;
		display: flex;
		flex-direction: column;
	}

	.solicitudCard:hover {
		transform: translateY(-5px);
		box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
	}

	.solicitudCard-header {
		background-color: #f27931;
		color: #fff;
		padding: 1rem;
	}

	.solicitudCard-header h2 {
		margin: 0;
		font-size: 1.25rem;
	}

	.solicitudCard-body {
		padding: 1rem;
	}

	.solicitudCard-body p {
		margin: 0.5rem 0;
		color: #555;
	}

	.solicitudCard-body p strong {
		color: #333;
	}

	.solicitudCard-body a {
		color: #0077b5;
		text-decoration: none;

		display: block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		max-width: 100%;
	}

	.solicitudCard-body a:hover {
		text-decoration: underline;
	}

	@media screen and (max-width: 500px) {
		.solicitudes {
			padding: 2rem 1rem 3rem;
		}

		.solicitudCard {
			max-width: calc(100vw - 2rem);
		}
	}

	@media screen and (min-width: 1200px) {
		.solicitudes {
			font-size: 1.2rem;
		}
	}

	@media screen and (min-width: 1500px) {
		.solicitudes {
			font-size: 1.3rem;
		}
	}
</style>
