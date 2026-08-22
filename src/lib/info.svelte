<script lang="ts">
  import { type Pebble, type Coord, type Rule, clamp } from "$lib/pebble.svelte";
  import RuleDisplay from "$lib/rule.svelte";

  type Props = {
    automaton: Pebble;
    selected: Coord;
    onpebblechange: (n: number) => void;
    onrulechange: (i: number, r: Rule) => void;
  };

  let { automaton, selected, onrulechange, onpebblechange }: Props = $props();
  let [x, y] = $derived(selected);

  let rules = $derived(automaton.rules[x][y]); //.filter((r) => !rule_is_empty(r)));
</script>

{#if x < automaton.size && y < automaton.size}
  {selected}
  <button
    onclick={(_) => onpebblechange(1)}
    oncontextmenu={(_) => onpebblechange(-1)}

    onwheel={(e: WheelEvent) => {
      e.preventDefault()
      onpebblechange(clamp(-e.deltaY, -1, 1))
    }}
  >
    {automaton.grid[x][y]}
  </button>

  <fieldset class="rules">
    <legend>Rules</legend>

    {#each rules as _, pebbles}
      <RuleDisplay
        body={automaton.rules[x][y][pebbles]}
        {pebbles}
        {onrulechange}
      />
    {/each}
  </fieldset>
{:else}
  Select a cell to see its data
{/if}

<style>
  .rules {
    display: flex;
    flex-direction: column;
    gap: 5px;
    border: none;
    border-top: var(--border);
  }
  button {
    display: block;
    width: 6ch;
    text-align: center;
    padding: 5px;
  }
</style>
