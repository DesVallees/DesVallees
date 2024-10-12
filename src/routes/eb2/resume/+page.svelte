<script lang="ts">
	import { fade } from 'svelte/transition';
	import { baseImageRoute, email, fullName, phone } from '../stores';
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';

	let fileInput: HTMLInputElement;
	let fileName: string;
	let cvLabel: HTMLLabelElement;
	let linkedinURL = '';

	export let form;
	$: form, feedbackMessage();

	let isSubmitting = false;

	// Function to update the label when a file is selected
	function updateLabel() {
		if (fileInput && fileInput.files?.length && fileInput.files?.length > 0) {
			const file = fileInput.files[0];
			fileName = file.name;
			const fileSize = (file.size / 1024).toFixed(2); // File size in KB
			if (cvLabel) {
				cvLabel.textContent = `${fileName} (${fileSize} KB)`;
			}
		}
	}

	// After the component is mounted, set up event listeners
	$: if (fileInput) {
		fileInput.addEventListener('change', updateLabel);
	}

	function deleteFile() {
		if (fileInput) {
			fileInput.value = ''; // Clear the file input
			fileName = '';
			if (cvLabel) {
				cvLabel.textContent = 'Haz clic aquí para seleccionar un archivo'; // Reset the label text
			}
		}
	}

	function feedbackMessage() {
		if (form?.success) {
			deleteFile();
			toast.success('Solicitud enviada correctamente.', { style: 'font-size: 0.9em;' });
		} else if (form?.error && isSubmitting) {
			toast.error('La solicitud no ha podido ser enviada. Intenta más tarde.', {
				style: 'font-size: 0.9em;',
			});
		}

		isSubmitting = false;
	}
</script>

<div in:fade class="resumePage" style="background-image: url('{baseImageRoute}/backFlag.jpg');">
	<div class="contentContainer">
		<div class="content">
			<img src="{baseImageRoute}/logo-small.jpg" alt="Canto Legal Logo" class="logo" />

			<h1>Ingresa tu CV o enlace de Linkedin</h1>

			<p>
				Para hacer una evaluación completa de tu perfil profesional y determinar tu
				elegibilidad es necesario evaluar tu currículum. Puedes ingresar un archivo DOC,
				PDF, JPG o PNG de tu CV o ingresar la URL de tu perfil de Linkedin (asegúrate de que
				esté actualizado).
			</p>

			<form
				method="post"
				enctype="multipart/form-data"
				on:submit={(event) => {
					if ((!fileInput || !fileInput.files?.length) && !linkedinURL.trim()) {
						event.preventDefault();
						toast.error('Por favor ingresa un archivo CV o una URL de Linkedin.', {
							style: 'font-size: 0.9em;',
						});
					} else {
						isSubmitting = true;
					}
				}}
			>
				<div class="inputGroup">
					<div class="previousInfo hide">
						<input
							required
							type="text"
							bind:value={$fullName}
							placeholder="Nombre Completo"
							name="fullName"
						/>
						<input
							required
							type="email"
							bind:value={$email}
							placeholder="Correo Electrónico"
							name="email"
						/>
						<input type="tel" bind:value={$phone} placeholder="Teléfono" name="phone" />
					</div>

					<label for="cv">CV:</label>
					<label
						bind:this={cvLabel}
						style="color: {fileName ? 'white' : ''};"
						id="cv-label"
						for="cv"
					>
						<span> Haz clic aquí para seleccionar un archivo</span>
					</label>
					{#if fileName}
						<button on:click={deleteFile} class="deleteFile"
							><ion-icon name="close-outline" /></button
						>
					{/if}
					<input
						bind:this={fileInput}
						type="file"
						id="cv"
						accept=".doc,.docx,.pdf,.jpg,.png"
						style="display: none;"
						name="cv"
					/>

					<label for="linkedin">URL de Linkedin:</label>
					<input
						type="url"
						id="linkedin"
						name="linkedin"
						placeholder="Enlace de perfil de Linkedin"
						bind:value={linkedinURL}
					/>
				</div>

				<button type="submit" class="submitButton" disabled={isSubmitting}>
					{#if isSubmitting}
						Enviando...
					{:else}
						Enviar
					{/if}
				</button>
			</form>
		</div>
	</div>
</div>

<svelte:head>
	<title>Ingresa tu CV o enlace de Linkedin</title>
	<meta name="description" content="" />
</svelte:head>

<style>
	/* Main container styling */
	.resumePage {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 25vh;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-color: #0c3a6b;
		font-size: 1rem;
	}

	/* Content container styling */
	.contentContainer {
		background-color: rgba(0, 16, 48); /* Dark blue overlay */
		padding: 0 1rem;
		padding-bottom: 6rem;
		width: 100%;
	}

	.content {
		position: relative;

		max-width: 700px;
		padding-top: 80px;
		margin: auto;
	}

	/* Logo styling */
	.logo {
		position: absolute;
		top: 0;
		left: 0;
		transform: translateY(-50%);

		width: 100px;
		height: 100px;
		border-radius: 50%;
		margin-bottom: 20px;

		object-fit: cover;
	}

	/* Header styling */
	h1 {
		color: #fff;
		font-size: 1.8em;
		font-weight: 900;
		margin-bottom: 20px;
		max-width: 80%;
	}

	/* Paragraph styling */
	p {
		color: #d3d3d3;
		font-size: 0.8em;
		line-height: 1.5;
		margin-bottom: 1.25em;
	}

	/* Input group styling */
	.inputGroup {
		text-align: left;
		margin-bottom: 30px;
	}

	label {
		display: block;
		font-size: 0.75em;
		color: #fff;
		margin-bottom: 8px;
	}

	#cv-label,
	input[type='url'] {
		width: 100%;
		padding: 0.75em;
		background-color: #122b4a;
		color: #fff;
		border: none;
		border-radius: 6px;
		margin-bottom: 0.75em;
		font-size: 0.9em;
	}

	input[type='url']::placeholder {
		color: #a8b2d1;
	}

	#cv-label {
		cursor: pointer;
		font-size: 0.9em;
		color: #a8b2d1;
		margin-bottom: 1.25em;
	}

	input[type='url']:hover,
	#cv-label:hover,
	#cv-label:focus-visible {
		background-color: #103058;
	}

	.deleteFile {
		display: flex;
		justify-content: center;
		align-items: center;

		float: right;

		background-color: rgba(228, 9, 9, 0.8);
		color: white;
		border-radius: 50%;
		aspect-ratio: 1 / 1;

		margin-top: -1.25em;
		transform: translate(-50%, -125%);

		font-size: 1em;

		cursor: pointer;
		z-index: 1;
	}

	/* Submit button styling */
	.submitButton {
		width: 100%;
		padding: 14px;
		background-color: #ff6d00;
		color: #fff;
		font-size: 0.85em;
		font-weight: bold;
		border: none;
		border-radius: 8px;
		cursor: pointer;
	}

	.submitButton:hover {
		background-color: #e66000;
	}

	@media screen and (max-width: 768px) {
		.resumePage {
			font-size: 1.2rem;
		}
	}
</style>
