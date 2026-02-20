<script lang="ts">
	import { getContrastColor } from '$lib/utils/colors';

	export let data;

	$: ({ totalVotes, mostPopularColor, mostPopularColorCount, browserInfo, recentVotes } = data);

	$: mostPopularBrowser = Object.entries(browserInfo.browsers || {}).sort((a, b) => b[1] - a[1])[0];
</script>

<div class="container">
	<h1 class="text-base">Results</h1>

	<div class="stats-grid">
		<div class="stat-card bg-base-200">
			<div class="stat-number">{totalVotes || 0}</div>
			<div class="stat-label">Total Votes</div>
		</div>

		{#if mostPopularColor}
			<div class="stat-card">
				<div
					class="color-preview"
					style="background-color:{mostPopularColor};color:{getContrastColor(mostPopularColor)}"
				>
					{mostPopularColor}
				</div>
				<div class="stat-label">Most Popular ({mostPopularColorCount} votes)</div>
			</div>
		{/if}

		{#if mostPopularBrowser}
			<div class="stat-card">
				<div class="stat-number">{mostPopularBrowser[0]}</div>
				<div class="stat-label">Most Common Browser</div>
			</div>
		{/if}
	</div>

	{#if totalVotes === 0}
		<div class="empty-state bg-base-200">
			<h2>No votes yet!</h2>
			<p>Be the first to vote on the home page.</p>
			<a href="/" class="btn-primary">Vote Now</a>
		</div>
	{:else}
		<div class="recent-section bg-base-200">
			<h2>Recent Votes</h2>
			<div class="recent-list">
				{#each recentVotes.slice(0, 5) as vote}
					<div class="vote-item">
						<div class="color-pair">
							<div class="color-circle" style="background:{vote.color1}" title={vote.color1}></div>
							<span>vs</span>
							<div class="color-circle" style="background:{vote.color2}" title={vote.color2}></div>
							<div class="chosen-label">→</div>
							<div
								class="color-circle chosen"
								style="background:{vote.chosenColor}"
								title={vote.chosenColor}
							></div>
						</div>
						<div class="vote-time">
							{new Date(vote.createdAt).toLocaleTimeString()}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<a href="/" class="back-btn btn-primary">← Back to Voting</a>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	h1 {
		font-size: 2.5rem;
		text-align: center;
		margin-bottom: 2rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.stat-card {
		padding: 1.5rem;
		border-radius: 12px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	.stat-number {
		font-size: 2rem;
		font-weight: bold;
		margin-bottom: 0.5rem;
	}

	.stat-label {
		font-size: 0.9rem;
	}

	.color-preview {
		padding: 1rem;
		border-radius: 8px;
		font-family: monospace;
		font-weight: bold;
		margin-bottom: 0.5rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.empty-state {
		text-align: center;
		padding: 3rem 1rem;
		border-radius: 12px;
		margin-bottom: 2rem;
	}

	.empty-state h2 {
		margin-bottom: 0.5rem;
	}

	.empty-state p {
		margin-bottom: 1.5rem;
	}

	.btn-primary {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		background: #3b82f6;
		text-decoration: none;
		border-radius: 8px;
		font-weight: 600;
		transition: background 0.3s;
	}

	.recent-section {
		padding: 1.5rem;
		border-radius: 12px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		margin-bottom: 2rem;
	}

	.recent-section h2 {
		font-size: 1.2rem;
		margin-bottom: 1rem;
	}

	.recent-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.vote-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem;
		border-radius: 8px;
	}

	.color-pair {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.color-circle {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.color-circle.chosen {
		border: 3px solid #3b82f6;
	}

	.chosen-label {
		font-weight: bold;
		margin: 0 0.25rem;
	}

	.vote-time {
		font-size: 0.9rem;
	}

	.back-btn {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		text-decoration: none;
		border-radius: 8px;
		font-weight: 600;
		transition: background 0.3s;
	}

	@media (max-width: 640px) {
		.stats-grid {
			grid-template-columns: 1fr;
		}

		.vote-item {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}
	}
</style>
