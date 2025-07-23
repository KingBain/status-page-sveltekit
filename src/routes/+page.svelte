<script>
	import snarkdown from 'snarkdown';
	import { t } from 'svelte-i18n';
	import ActiveIncidents from '$lib/components/ActiveIncidents.svelte';
	import ActiveScheduled from '$lib/components/ActiveScheduled.svelte';
	import Incidents from '$lib/components/Incidents.svelte';
	import LiveStatus from '$lib/components/LiveStatus.svelte';
	import Scheduled from '$lib/components/Scheduled.svelte';
</script>

<svelte:head>
	<title>{$t('siteTitle')}</title>
</svelte:head>

<header>
  <h1>{@html snarkdown($t('introTitle'))}</h1>
  <p class="lead">
    {@html snarkdown($t('introMessage'))}
  </p>
</header>

<ActiveIncidents />
<ActiveScheduled />
<LiveStatus />
<Scheduled />
<Incidents />

<style>
	p.lead {
		font-size: 110%;
	}
	header {
		margin-bottom: 2rem;
	}
</style>
