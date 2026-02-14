<script lang="ts">
	import { generateRandomColor, getContrastColor } from '$lib/utils/colors';
	import { enhance } from '$app/forms';
	import Ui from '$lib/components/ui.svelte';
	import '../app.css';

	let color1 = generateRandomColor();
	let color2 = generateRandomColor();

	function getNewColors() {
		color1 = generateRandomColor();
		color2 = generateRandomColor();
	}

	$: textColor1 = getContrastColor(color1);
	$: textColor2 = getContrastColor(color2);
</script>

<div class="bg-base-100 container">
	<h1 class="text-primary">Best Color</h1>
	<p class="subtitle text-secondary">Which color do you prefer?</p>

	<form method="POST" use:enhance class="color-comparison" on:submit={getNewColors}>
		<input type="hidden" name="color1" value={color1} />
		<input type="hidden" name="color2" value={color2} />

		<div class="colors-container">
			<button
				type="submit"
				name="chosenColor"
				value={color1}
				class="color-option"
				style:background-color={color1}
				style:color={textColor1}
			>
				<span class="color-hex">{color1}</span>
				<span class="choose-text">Choose this color</span>
			</button>

			<div class="vs bg-base-200">VS</div>

			<button
				type="submit"
				name="chosenColor"
				value={color2}
				class="color-option"
				style:background-color={color2}
				style:color={textColor2}
			>
				<span class="color-hex">{color2}</span>
				<span class="choose-text">Choose this color</span>
			</button>
		</div>
	</form>

	<div class="bg-base-100 border-base-300 collapse border">
		<input type="checkbox" />
		<div class="collapse-title font-semibold">Show UI Components</div>
		<div class="collapse-content">
			<div class="colors-container">
				<div style="--color-primary: {color1}; --color-primary-content: {textColor1}">
					<Ui name="ui1" name2="radio1" pagination="page1" />
				</div>
				<div class="text-sky-600" style="margin:auto;">|</div>
				<div style="--color-primary: {color2}; --color-primary-content: {textColor2}">
					<Ui name="ui2" name2="radio2" pagination="page2" />
				</div>
			</div>
		</div>
	</div>

	<div class="actions" style="padding-top: 20px">
		<button on:click={getNewColors} class="secondary btn-primary"> Generate New Colors </button>
		<a href="/results" class="results-link"> View Results </a>
	</div>

	<div class="instructions">
		<p>Your choice, along with browser information, will be recorded anonymously.</p>
	</div>
</div>

<style>
	.container {
		max-width: 1000px;
		margin: 0 auto;
		padding: 2rem;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	h1 {
		font-size: 3rem;
		margin-bottom: 0.5rem;
		text-align: center;
	}

	.subtitle {
		font-size: 1.2rem;
		margin-bottom: 3rem;
		text-align: center;
	}

	.color-comparison {
		width: 100%;
	}

	.colors-container {
		display: grid;
		grid-template-columns: 5fr 1fr 5fr;
		gap: 2rem;
		align-items: center;
		justify-content: center;
		margin-bottom: 3rem;
		flex-wrap: wrap;
	}

	.color-option {
		flex: 1;
		min-width: 200px;
		height: 120px;
		border: none;
		border-radius: 20px;
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		font-weight: bold;
		text-transform: uppercase;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	.color-option:hover {
		transform: translateY(-5px);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
	}

	.color-option:active {
		transform: translateY(-2px);
	}

	.color-hex {
		font-size: 2rem;
		font-family: monospace;
		background: rgba(0, 0, 0, 0.1);
		padding: 0.5rem 1rem;
		border-radius: 10px;
		backdrop-filter: blur(10px);
	}

	.choose-text {
		font-size: 1rem;
		opacity: 0.9;
	}

	.vs {
		font-size: 2rem;
		font-weight: bold;
		padding: 1rem;
		border-radius: 50%;
		width: 80px;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
	}

	.actions {
		display: flex;
		gap: 1rem;
		margin-bottom: 2rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	button.secondary {
		padding: 1rem 2rem;
		font-size: 1rem;
		border: none;
		border-radius: 10px;
		cursor: pointer;
		transition: all 0.3s ease;
		font-weight: 600;
	}

	.results-link {
		padding: 1rem 2rem;
		font-size: 1rem;
		background: #3b82f6;
		color: white;
		border: none;
		border-radius: 10px;
		text-decoration: none;
		transition: all 0.3s ease;
		font-weight: 600;
	}

	.results-link:hover {
		background: #2563eb;
	}

	.instructions {
		text-align: center;
		color: #64748b;
		font-size: 0.9rem;
		max-width: 500px;
	}

	@media (max-width: 768px) {
		.colors-container {
			flex-direction: column;
		}

		.color-option {
			width: 100%;
			min-width: unset;
			height: 300px;
		}

		.vs {
			transform: rotate(90deg);
		}
	}
</style>
