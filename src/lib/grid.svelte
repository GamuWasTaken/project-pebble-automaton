<script lang="ts">
  import { type Pebble, type Coord } from "$lib/pebble.svelte";

  type Props = { automaton: Pebble; selected: Coord };

  let { automaton, selected = $bindable() }: Props = $props();
  let [sx, sy] = $derived([selected[0], selected[1]]);

  let grid = $derived(Array.from({ length: automaton.size }, (_, i) => i));
</script>

<section style:--size={automaton.size}>
  {#each grid as y}
    {#each grid as x}
      {@const pebbles = automaton.grid[x][y]}

      <button
        class={sx == x && sy == y ? "selected" : ""}
        onclick={(_) => {
          selected = [x, y];
        }}
      >
        {#if pebbles <= 16 && pebbles != 0}
          {#each Array.from({ length: pebbles }) as _}
            <div></div>
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
    width: 70cqmin;
    aspect-ratio: 1/1;

    display: grid;
    gap: 3px;
    grid-template-columns: repeat(var(--size), 1fr);
    grid-template-rows: repeat(var(--size), 1fr);
  }

  button {
    color: var(--fg);
    background-color: var(--bg);
    border: var(--borderoff);
    border-radius: 5px;
    padding: 0;

    font-size: 100%;
  }
  button.selected {
    border: var(--border);
  }

  button:has(div) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 5px;
    gap: 5px;
  }

  div {
    --todo: "make the dots adapt to container size";
    background-color: var(--accent);
    width: 10px;
    height: 10px;
    border-radius: 10px;
    margin: 0;
  }
</style>
