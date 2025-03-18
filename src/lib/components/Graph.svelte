<script>
	import { onMount, onDestroy, tick } from 'svelte';
	import Chart from 'chart.js/auto';
	import Loading from '$lib/components/Loading.svelte';
	import config from '$lib/data/config.json';
	import { cachedResponse, createOctokit, handleError } from '$lib/utils/createOctokit';

	export let slug;
	let loading = true;
	const octokit = createOctokit();
	const owner = config.owner;
	const repo = config.repo;
	let commits = [];
	let labels = [];
	let data = [];
	let canvas;
	let chart;

	onMount(async () => {
		try {
			console.log('Fetching commits for slug:', slug);
			const response = await cachedResponse(`commits-${owner}-${repo}-${slug}`, () =>
				octokit.repos.listCommits({
					owner,
					repo,
					path: `history/${slug}.yml`,
					per_page: 28
				})
			);

			commits = response.data.reverse();
			console.log('Fetched commits:', commits);
		} catch (error) {
			handleError(error);
		}

		data = commits
			.filter((commit) => commit.commit.message.includes('ms) [skip ci]'))
			.map((commit) => parseInt(commit.commit.message.split(' in ')[1].split('ms')[0]));
		console.log('Data array (ms times):', data);

		labels = commits
			.filter((commit) => commit.commit.message.includes('ms) [skip ci]'))
			.map((commit) => new Date(commit.commit.committer.date).toLocaleString(config.i18n.locale));
		console.log('Labels array (commit dates):', labels);

		loading = false;
		await tick(); // Wait for the DOM to update and the canvas to be rendered

		// Now ensure canvas has a 2d context
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			console.error('Failed to get 2D context from canvas.');
			return;
		}

		if (canvas && data.length) {
			console.log('Initializing chart...');
			chart = new Chart(canvas, {
				type: 'line',
				data: {
					labels,
					datasets: [
						{
							label: config.i18n.responseTimeMs,
							data,
							borderColor: config.graphBorderColor || '#1abc9c',
							backgroundColor: config.graphBackgroundColor || '#89e0cf',
							fill: false,
							tension: 0.2
						}
					]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						x: {
							display: true,
							ticks: {
								maxRotation: 60,
								minRotation: 30,
								color: '#ccc'
							},
							grid: { display: false }
						},
						y: {
							display: true,
							ticks: { color: '#ccc' },
							grid: { color: 'rgba(255, 255, 255, 0.1)' }
						}
					},
					plugins: {
						legend: {
							display: true,
							labels: { color: '#ccc' }
						}
					}
				}
			});
			console.log('Chart initialized:', chart);
		}
	});

	onDestroy(() => {
		if (chart) chart.destroy();
	});
</script>

<div style="width: 100%; height: 400px; position: relative;">
	{#if loading}
		<Loading />
	{:else}
		<h2>{config.i18n.sevelDayResponseTime}</h2>
		<canvas bind:this={canvas} style="width: 100%; height: 100%;"></canvas>
	{/if}
</div>
