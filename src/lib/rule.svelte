<script lang="ts">
  import { type Rule } from "$lib/pebble.svelte";

  type Props = {
    pebbles: number;
    body: Rule;
    onrulechange: (i: number, r: Rule) => void;
  };

  let { pebbles, body, onrulechange }: Props = $props();
</script>

<div>
  <div>{pebbles}</div>
  {#each body as _, i}
    <button onclick={(_) => onrulechange(pebbles, body)}>{body[i]}</button>
  {/each}
</div>

<style>
  button {
    display: block;
    margin: 0;
    padding: 5px;
    width: 4ch;
    height: 4ch;
    font-size: 1em;
    color: inherit;
    border: var(--border);
    border-radius: 10px;
    background: none;
  }
  button:hover {
    filter: brightness(1.1);
    transform: scale(1.1);
  }
  button:active {
    filter: brightness(1.1);
    transform: scale(1);
  }

  div {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    justify-content: center;
    flex-direction: column;
    border-radius: 10px;

    width: fit-content;
    height: fit-content;
  }
  button:nth-of-type(1) {
    grid-column: 2/3;
    grid-row: 1/3;
    border-right: none;
  }
  button:nth-of-type(2) {
    grid-column: 3/4;
    grid-row: 1/3;
    border-bottom: none;
  }
  button:nth-of-type(3) {
    grid-column: 2/4;
    grid-row: 3/5;
    border-top: none;
  }
  button:nth-of-type(4) {
    grid-column: 3/4;
    grid-row: 3/5;
    border-left: none;
  }
  div div {
    grid-column: 1/2;
    grid-row: 2/4;
    width: 4ch;
    height: 4ch;
    display: flex;
    justify-items: center;
    align-items: center;
    border: var(--border);
    border-radius: 100%;
    font-weight: bold;
  }
</style>
