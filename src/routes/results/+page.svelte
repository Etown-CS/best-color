<script lang="ts">
	import { page } from '$app/state';

	// In a real app, you would fetch this data from an API endpoint
	// For now, we'll show a message about the data being collected

	let totalVotes = 0; // This would come from your database
	let mostPopularColor = '#3b82f6'; // This would come from your database
</script>

<div class="container">
	<h1>Voting Results</h1>

	<div class="stats-grid">
		<div class="stat-card">
			<div class="stat-number">{totalVotes}</div>
			<div class="stat-label">Total Votes</div>
		</div>

		<div class="stat-card">
			<div class="stat-number">Coming Soon</div>
			<div class="stat-label">Most Popular Color</div>
		</div>

		<div class="stat-card">
			<div class="stat-number">Coming Soon</div>
			<div class="stat-label">Browser Stats</div>
		</div>
	</div>

	<div class="message">
		<p>Votes are being collected anonymously. Detailed statistics including:</p>
		<ul>
			<li>Most popular colors</li>
			<li>Browser/OS distribution</li>
			<li>Voting trends over time</li>
		</ul>
		<p>...will be displayed here once enough data is collected.</p>
	</div>

	<a href="/" class="back-link">← Back to Voting</a>
</div>

<style>
	.container {
		max-width: 1000px;
		margin: 0 auto;
		padding: 2rem;
		min-height: 100vh;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 2rem;
		text-align: center;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin-bottom: 3rem;
	}

	.stat-card {
		background: white;
		padding: 2rem;
		border-radius: 15px;
		box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
		text-align: center;
		transition: transform 0.3s ease;
	}

	.stat-card:hover {
		transform: translateY(-5px);
	}

	.stat-number {
		font-size: 2.5rem;
		font-weight: bold;
		margin-bottom: 0.5rem;
	}

	.stat-label {
		font-size: 1rem;
		color: #666;
	}

	.message {
		background: #f8fafc;
		padding: 2rem;
		border-radius: 15px;
		margin-bottom: 2rem;
	}

	.message p {
		margin-bottom: 1rem;
		line-height: 1.6;
	}

	.message ul {
		margin-left: 2rem;
		margin-bottom: 1rem;
	}

	.message li {
		margin-bottom: 0.5rem;
	}

	.back-link {
		display: inline-block;
		padding: 1rem 2rem;
		background: #3b82f6;
		color: white;
		text-decoration: none;
		border-radius: 10px;
		font-weight: 600;
		transition: background 0.3s ease;
	}

	.back-link:hover {
		background: #2563eb;
	}
</style>
