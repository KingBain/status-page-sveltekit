<script>
    // data is automatically passed from the load function
    export let data;
    const { slug } = data;
  
    import Summary from "$lib/components/Summary.svelte";
    import Graph from "$lib/components/Graph.svelte";
    import History from "$lib/components/History.svelte";
  </script>
  
  <Summary {slug} />
  <Graph {slug} />
  <History {slug} />
  