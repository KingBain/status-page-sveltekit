<script lang="ts">
  import { locale, t } from 'svelte-i18n';
  import { onMount }   from 'svelte';

  // Eagerly load your JSON bundles so we can list the codes
  const modules = import.meta.glob('../locales/*.json', {
    eager: true,
    query: '?json'
  }) as Record<string, any>;

  let available: string[] = [];

  onMount(() => {
    available = Object.keys(modules)
      .map((path) => {
        const m = path.match(/\/([\w-]+)\.json$/);
        return m ? m[1] : '';
      })
      .filter(Boolean);
  });

  function onChange(e: Event) {
    const newLoc = (e.target as HTMLSelectElement).value;
    locale.set(newLoc);
  }
</script>

<label>
  {#if $t('navLang')}
    {$t('navLang')}: 
  {/if}
  <select bind:value={$locale} on:change={onChange}>
    {#each available as loc}
      <option value={loc}>{loc.toUpperCase()}</option>
    {/each}
  </select>
</label>
