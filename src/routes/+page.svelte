<script lang="ts">
	import { generateRandomColor, getContrastColor } from '$lib/utils/colors';
	import { enhance } from '$app/forms';
	import { confetti } from '@neoconfetti/svelte';
	import { page } from '$app/state';

	let color1 = generateRandomColor();
	let color2 = generateRandomColor();

	function getNewColors() {
		color1 = generateRandomColor();
		color2 = generateRandomColor();
	}

	$: textColor1 = getContrastColor(color1);
	$: textColor2 = getContrastColor(color2);
</script>

<div class="container">
	<h1>Best Color</h1>
	<p class="subtitle">Which color do you prefer?</p>

	<form method="POST" use:enhance class="color-comparison">
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
				on:click={getNewColors}
			>
				<span class="color-hex">{color1}</span>
				<span class="choose-text">Choose this color</span>
			</button>

			<div class="vs">VS</div>

			<button
				type="submit"
				name="chosenColor"
				value={color2}
				class="color-option"
				style:background-color={color2}
				style:color={textColor2}
				on:click={getNewColors}
			>
				<span class="color-hex">{color2}</span>
				<span class="choose-text">Choose this color</span>
			</button>
		</div>
	</form>

	<div class="actions">
		<button on:click={getNewColors} class="secondary"> Generate New Colors </button>
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
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		text-align: center;
	}

	.subtitle {
		font-size: 1.2rem;
		color: #666;
		margin-bottom: 3rem;
		text-align: center;
	}

	.color-comparison {
		width: 100%;
	}

	.colors-container {
		display: flex;
		gap: 2rem;
		align-items: center;
		justify-content: center;
		margin-bottom: 3rem;
		flex-wrap: wrap;
	}

	.color-option {
		flex: 1;
		min-width: 300px;
		height: 400px;
		border: none;
		border-radius: 20px;
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		font-size: 1.5rem;
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 1px;
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
		color: #666;
		padding: 1rem;
		background: white;
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
		background: #f1f5f9;
		color: #334155;
		border: none;
		border-radius: 10px;
		cursor: pointer;
		transition: all 0.3s ease;
		font-weight: 600;
	}

	button.secondary:hover {
		background: #e2e8f0;
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
