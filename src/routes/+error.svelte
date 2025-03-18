<script>
	export let status;
	export let error;
	import { dev } from '$app/environment';
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<h1>{status}</h1>

<!-- If error exists and has a message, display it; otherwise, show a default message -->
<p>{error && error.message ? error.message : 'An unexpected error occurred.'}</p>

{#if dev && error && error.stack}
	<pre>{error.stack}</pre>
{/if}

<style>
	h1,
	p {
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>
