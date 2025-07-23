// src/global.d.ts
declare module '*.svelte' {
  import { SvelteComponentTyped } from 'svelte';
  export default class Component extends SvelteComponentTyped<
    // no props by default — override with your own types if needed
    Record<string, any>,
    Record<string, any>,
    Record<string, any>
  > {}
}
