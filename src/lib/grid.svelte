<script lang="ts">
  import {
    type PebbleAutomaton,
    type Coord,
    GridAppearance,
  } from "./pebble.svelte";

  type Props = { automaton: PebbleAutomaton; selected: Coord };

  let { automaton, selected = $bindable() }: Props = $props();
  let grid = $derived(Array.from({ length: automaton.size }, (_, i) => i));
  // TODO maybe change the color of the grid based on number of rules and pebbles?
</script>

<section style:--size={automaton.size}>
  {#each grid as y}
    {#each grid as x}
      {@const pebbles = automaton.grid[x][y]}

      <button
        onclick={(_) => {
          selected = [x, y];
        }}
      >
        {#if automaton.appearance == GridAppearance.Dots && pebbles <= 16}
          {#each Array.from({ length: pebbles }) as _}
            <div class="dot"></div>
          {/each}
        {:else}
          {automaton.grid[x][y]}
        {/if}
      </button>
    {/each}
  {/each}
</section>

<style>
  section {
    height: min(80%, 70vh);
    aspect-ratio: 1/1;

    display: grid;
    gap: 3px;
    grid-template-columns: repeat(var(--size), 1fr);
    grid-template-rows: repeat(var(--size), 1fr);
  }
  button {
    color: var(--fg);
    background-color: var(--bg);
    border: 3px solid var(--accent);
    border-radius: 5px;
    padding: 0;

    font-size: 2cqmax;
  }

  button:has(.dot) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    justify-items: center;
    align-items: center;
    padding: 5px;
    gap: 5px;
  }

  .dot {
    background-color: var(--accent);
    width: 10px;
    height: 10px;
    border-radius: 10px;
    margin: 0;
  }
</style>
