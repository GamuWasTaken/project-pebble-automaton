<script lang="ts">
  import Grid from "$lib/grid.svelte";
  import CellInfo from "$lib/info.svelte";
  import Controls from "$lib/controls.svelte";
  import { Pebble, type Coord } from "$lib/pebble.svelte";

  let automaton = $state(new Pebble(5));
  let selected: Coord = $state([0, 0]);
</script>

<svelte:document oncontextmenu={(e) => e.preventDefault()} />

<header>
  <Controls
    onplay={automaton.step}
    onsizechange={(s) => (automaton.size = s)}
  />
</header>

<aside>
  <CellInfo
    {automaton}
    {selected}
    onpebblechange={(p) => automaton.update_pebbles(selected, p)}
    onrulechange={(i, r) => automaton.set_rule(selected, i, r)}
  />
</aside>

<main>
  <Grid {automaton} bind:selected />
</main>

<style>
  :global(*) {
    box-sizing: border-box;
  }
  :global(:root) {
    --accent: #a7db75;
    --accentoff: #a7db7544;
    --bg: #111;
    --fg: #eee;
    --border: 3px solid var(--accent);
    --borderoff: 3px solid var(--accentoff);
  }
  :global(body) {
    margin: 0;
    width: 100vw;
    height: 100vh;

    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: 100px 1fr;
    gap: 5px;

    padding: 5px;
    background-color: var(--bg);
    color: var(--fg);
  }
  :global(input) {
    appearance: textfield;
  }

  header {
    grid-column: 1 / -1;
    border-bottom: 3px solid var(--accent);

    display: flex;
    padding-bottom: 5px;
  }

  aside {
    padding: 10px;
    border-right: 3px solid var(--accent);
    overflow-y: auto;
  }

  main {
    display: flex;
    align-items: center;
    justify-content: center;
    container: princial / inline-size;
  }
</style>
