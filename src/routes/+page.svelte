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

<label class="swap swap-rotate">
	<!-- this hidden checkbox controls the state -->
	<input type="checkbox" class="theme-controller" value="bumblebee" />

	<!-- sun icon -->
	<svg
		class="swap-off h-10 w-10 fill-current"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
	>
		<path
			d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
		/>
	</svg>

	<!-- moon icon -->
	<svg
		class="swap-on h-10 w-10 fill-current"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
	>
		<path
			d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
		/>
	</svg>
</label>
<div class="bg-base-100 container">
	<h1>Best Color</h1>
	<p class="subtitle">Which color do you prefer?</p>

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

			<div class="vs">VS</div>

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
	<div class="colors-container">
		<div style="--color-primary: {color1}; --color-primary-content: {textColor1}">
			<Ui name="ui1" name2="radio1" pagination="page1" />
		</div>
		<div class="text-sky-600" style="margin:auto;">|</div>
		<div style="--color-primary: {color2}; --color-primary-content: {textColor2}">
			<Ui name="ui2" name2="radio2" pagination="page2" />
		</div>
	</div>

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
		background-clip: text;
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
