<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Chart as ChartType } from 'chart.js';
	import convert from 'color-convert';

	const API_URL = '/api/color-stats';

	const POLL_INTERVAL_MS = 60_000;

	type Row = { color: string; count: number };

	let canvas: HTMLCanvasElement;
	let chart: ChartType | null = null;
	let rows: Row[] = [];
	let total = 0;
	let loading = true;
	let error = '';
	let pollTimer: ReturnType<typeof setInterval> | null = null;

	async function fetchData(): Promise<void> {
		try {
			error = '';
			const res = await fetch(API_URL);
			if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`);
			const json = await res.json();
			// Expected shape: { rows: [{ color: string; count: number }] }
			// Sort by hue position in the visible light spectrum (red → violet),
			// with achromatic colors (grays/blacks/whites) at the end.
			rows = (json.rows as Row[]).sort((a, b) => convert.hex.hsl(a.color)[0] - convert.hex.hsl(b.color)[0]);
			total = rows.reduce((sum, r) => sum + Number(r.count), 0);
			renderChart();
		} catch (err) {
			error = err instanceof Error ? err.message : String(err);
		} finally {
			loading = false;
		}
	}

	async function renderChart(): Promise<void> {
		if (!canvas || rows.length === 0) return;

		// Lazy-load Chart.js so it doesn't bloat the initial bundle.
		const { Chart, registerables } = await import('chart.js');
		Chart.register(...registerables);

		const labels = rows.map((r) => r.color);
		const counts = rows.map((r) => Number(r.count));

		if (chart) {
			// Update existing chart instead of recreating it.
			chart.data.labels = labels;
			chart.data.datasets[0].data = counts;
			chart.data.datasets[0].backgroundColor = labels;
			chart.update('active');
			return;
		}

		chart = new Chart(canvas, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					{
						label: 'Votes',
						data: counts,
						backgroundColor: labels, // hex values serve as bar colors directly
						borderWidth: 0,
						borderRadius: 4
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: { display: false },
					tooltip: {
						callbacks: {
							title: (ctx) => ctx[0].label,
							label: (ctx) => {
								const pct = total > 0 ? Math.round((ctx.parsed.y / total) * 100) : 0;
								return ` ${ctx.parsed.y.toLocaleString()} votes (${pct}%)`;
							}
						}
					}
				},
				scales: {
					x: {
						ticks: {
							autoSkip: false,
							maxRotation: 45,
							font: { size: 11 },
							// Display the hex value as the label.
							callback: (_val, i) => labels[i]
						},
						grid: { display: false }
					},
					y: {
						beginAtZero: true,
						ticks: {
							font: { size: 11 },
							callback: (v) => Number(v).toLocaleString()
						},
						grid: { color: 'rgba(128,128,128,0.12)' }
					}
				}
			}
		});
	}

	onMount(() => {
		fetchData();
		if (POLL_INTERVAL_MS > 0) {
			pollTimer = setInterval(fetchData, POLL_INTERVAL_MS);
		}
	});

	onDestroy(() => {
		chart?.destroy();
		if (pollTimer) clearInterval(pollTimer);
	});
</script>

<div class="chart-wrapper">
	<div class="chart-header">
		<div>
			<p class="chart-label">color choices</p>
			<p class="chart-total">
				{#if loading}
					loading…
				{:else if error}
					—
				{:else}
					{total.toLocaleString()} total votes
				{/if}
			</p>
		</div>
		<button on:click={fetchData} disabled={loading} class="refresh-btn">
			{loading ? 'Loading…' : 'Refresh'}
		</button>
	</div>

	{#if error}
		<p class="chart-error">{error}</p>
	{/if}

	<!-- Canvas height is set here; Chart.js reads it via the wrapper. -->
	<div class="canvas-wrapper">
		<canvas bind:this={canvas}></canvas>
	</div>

	<!-- Custom legend -->
	{#if rows.length > 0}
		<div class="legend">
			{#each rows as row}
				<span class="legend-item">
					<span class="legend-swatch" style="background: {row.color};"></span>
					{row.color}
					<span class="legend-count">{Number(row.count).toLocaleString()}</span>
				</span>
			{/each}
		</div>
	{/if}
</div>

<style>
	.chart-wrapper {
		width: 100%;
		font-family: inherit;
	}

	.chart-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.chart-label {
		font-size: 13px;
		color: #888;
		margin: 0 0 2px;
	}

	.chart-total {
		font-size: 22px;
		font-weight: 500;
		margin: 0;
	}

	.refresh-btn {
		font-size: 13px;
		padding: 6px 14px;
		border: 1px solid #d0d0d0;
		border-radius: 6px;
		background: transparent;
		cursor: pointer;
	}

	.refresh-btn:disabled {
		opacity: 0.5;
		cursor: default;
	}

	.chart-error {
		font-size: 13px;
		color: #c0392b;
		margin: 0 0 0.75rem;
	}

	.canvas-wrapper {
		position: relative;
		width: 100%;
		height: 340px;
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 1rem;
		font-size: 12px;
		color: #888;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.legend-swatch {
		width: 10px;
		height: 10px;
		border-radius: 2px;
		border: 0.5px solid rgba(0, 0, 0, 0.15);
		flex-shrink: 0;
	}

	.legend-count {
		color: #333;
		font-weight: 500;
	}
</style>
