// src/global.d.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svelte' {
  import { SvelteComponentTyped } from 'svelte';
  export default class Component extends SvelteComponentTyped<
    Record<string, any>,
    Record<string, any>,
    Record<string, any>
  > {}
}


declare module '$lib/data/config.json' {
  const value: any;
  export default value;
}
