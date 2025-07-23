<script>
	import Loading from '$lib/components/Loading.svelte';
	import { onMount } from 'svelte';
	import config from '$lib/data/config.json';
	import { handleError } from '$lib/utils/createOctokit';
	import { t } from 'svelte-i18n';

	export let slug;
	let loading = true;

	let { apiBaseUrl, userContentBaseUrl } = config['status-website'] || {};
	if (!apiBaseUrl) apiBaseUrl = 'https://api.github.com';
	if (!userContentBaseUrl) userContentBaseUrl = 'https://raw.githubusercontent.com';

	const owner = config.owner;
	const repo = config.repo;
	let summary = null;

	onMount(async () => {
		try {
			const res = await fetch(`${userContentBaseUrl}/${owner}/${repo}/master/history/summary.json`);
			summary = (await res.json()).find((item) => item.slug === slug);
		} catch (error) {
			handleError(error);
		}
		loading = false;
	});
</script>

<section>
	{#if loading}
		<Loading />
	{:else if summary}
		<h1>
			<a class="no-underline" href={summary.url.startsWith('$') ? '#' : summary.url}
				>{summary.name}</a
			>
			<span class={`tag ${summary.status}`}>
				{summary.status === 'up' ? $t('up') : $t('down')}
			</span>
		</h1>
		<dl>
			<dt>{$t('overallUptimeTitle')}</dt>
			<dd>{summary.uptime}</dd>
			{#if summary.showAverageResponseTime === undefined || summary.showAverageResponseTime}
				<dt>{$t('averageResponseTimeTitle')}</dt>
				<dd>{summary.time}{$t('ms')}</dd>
			{/if}
		</dl>
	{/if}
</section>

<style>
	.no-underline {
		text-decoration: none;
	}
</style>
