<!-- src/routes/incident/[number]/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import Incident from '$lib/components/Incident.svelte';

  // derive the `number` param directly from the URL
  const number = derived(page, ($page) => $page.params.number);
</script>

<!-- pass the store to your component -->
<!-- Incident.svelte can accept `number` as a prop or you can subscribe inline -->
<Incident number={$number} />
