<script lang="ts">
	import Testimonial from '../components/testimonial.svelte'; // Importing the Testimonial component
	import { baseImageRoute } from '../stores'; // Importing the baseImageRoute
</script>

<div class="testimonialsSection">
	<h2>Nuestros Clientes Nos Recomiendan</h2>
	<p>Miles de clientes felices y casos ganados.</p>

	<div class="testimonialsContainer">
		<Testimonial
			content="Estoy agradecida con la abogada mi hijo obtuvo su residencia gracias abogada Katherine y su equipo son personas eficientes y muy amables nunca e tenido una queja sobre su trabajo."
			name="Helen Molina"
			stars={5}
			avatar="{baseImageRoute}/helen.png"
		/>
		<Testimonial
			content="El servicio que he recibido a sido muy bueno, ya tengo mi permiso de trabajo y ahora estoy en la espera de la residencia!"
			name="Jeison Ordoñez"
			stars={5}
			avatar="{baseImageRoute}/jason.jpeg"
		/>
		<Testimonial
			content="Me gusta como trabajan como desarrollan el caso te generan confianza y seguridad, con excelente personal amable y profesionales, los recomiendo"
			name="Kenia Turcios"
			avatar="{baseImageRoute}/kenia.png"
		/>
		<Testimonial
			content="Excelente servicio, 100% recomendable, me ayudaron muchísimo, gracias a dios y ellos ya tengo mis documentos en orden"
			name="Dimas Vasquez"
			stars={5}
			avatar="{baseImageRoute}/dv.svg"
		/>
		<Testimonial
			content="Servicio muy recomendable!!<br>Gracias a las oficinas de Canto legal hoy día recibí mi permiso de trabajo,  después de varios años de consultar a diferentes abogados y de recibir respuestas poco alentadoras.<br><br>Canto legal me dio una nueva esperanza al decidir llevar mi caso.<br><br>Gracias a Canto Legal y a todo su maravilloso equipo !!!!"
			name="ferni1226 vazquez"
			stars={5}
			avatar="{baseImageRoute}/fv.svg"
		/>
	</div>
</div>

<style>
	.testimonialsSection {
		background-color: #f27931; /* Orange background */
		padding: 4rem 50px;
		text-align: center;
		color: white;
	}

	h2 {
		font-size: 2rem;
		margin-bottom: 10px;
	}

	p {
		font-size: 1rem;
		margin-bottom: 40px;
	}

	.testimonialsContainer {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		margin: auto;
		gap: 1.5rem;

		align-items: center;
		justify-content: center;
	}

	@media (min-width: 1200px) {
		.testimonialsContainer {
			max-height: 1500px;
		}
	}

	@media (min-width: 1350px) {
		.testimonialsContainer {
			max-height: 1000px;
		}
	}
</style>
