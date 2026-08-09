<script lang="ts">
  import {
    type PebbleAutomaton,
    type Coord,
    rule_is_empty,
  } from "$lib/pebble.svelte";
  import RuleDisplay from "$lib/rule.svelte";

  type Props = { automaton: PebbleAutomaton; selected: Coord };

  let { automaton = $bindable(), selected }: Props = $props();
  let [x, y] = $derived(selected);
</script>

<section>
  {#if x < automaton.size && y < automaton.size}
    {selected}
    <input type="number" bind:value={automaton.grid[x][y]} min="0" />

    <fieldset class="rules">
      <legend>Rules</legend>

      // TODO rule builder (simple input for pebble match and 4 inputs for the rules (the same as the display))

      {#each automaton.rules[x][y] as body, pebbles}
        {#if !rule_is_empty(body)}
          <RuleDisplay bind:body={automaton.rules[x][y][pebbles]} {pebbles} />
        {/if}
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
