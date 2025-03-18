<script>
  // 'data' is automatically passed in from the load function
  export let data;
  import Incident from "$lib/components/Incident.svelte";
  
  // Extract 'number' from the 'data'
  const { number } = data;
</script>

<Incident {number} />
