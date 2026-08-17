<script lang="ts">
  import {
    type PebbleAutomaton,
    type Coord,
  } from "$lib/pebble.svelte";
  import RuleDisplay from "$lib/rule.svelte";

  type Props = { automaton: PebbleAutomaton; selected: Coord };

  let { automaton = $bindable(), selected }: Props = $props();
  let [x, y] = $derived(selected);

  let rules = $derived(automaton.rules[x][y]); //.filter((r) => !rule_is_empty(r)));
</script>

<section>
  {#if x < automaton.size && y < automaton.size}
    {selected}
    <input
      type="number"
      bind:value={automaton.grid[x][y]}
      min="0"
    />

    <fieldset class="rules">
      <legend>Rules</legend>

      {#each rules as _, pebbles}
        <RuleDisplay bind:body={automaton.rules[x][y][pebbles]} {pebbles} />
      {/each}
    </fieldset>
  {:else}
    Select a cell to see its data
  {/if}
</section>

<style>
  .rules {
    display: flex;
    flex-direction: column;
    gap: 5px;
    border: none;
    border-top: var(--border);
  }
  input {
    display: block;
    width: 6ch;
    text-align: center;
    padding: 5px;
  }

  section {
    display: flex;
    flex-direction: column;
  }
</style>
