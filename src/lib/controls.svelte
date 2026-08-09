<script lang="ts">
  import { type PebbleAutomaton, GridAppearance } from "./pebble.svelte";

  type Props = { automaton: PebbleAutomaton };

  let { automaton = $bindable() }: Props = $props();
</script>

<fieldset>
  <legend>Grid options</legend>

  <div class="size">
    <label for="grid_size">Size</label>
    <input
      name="grid_size"
      type="range"
      bind:value={automaton.size}
      min="5"
      max="10"
    />
  </div>

  <div class="appearance">
    <label for="grid_appearance">Appearance</label>
    <select name="grid_appearance" bind:value={automaton.appearance}>
      {#each Object.keys(GridAppearance) as option}
        <option value={option}>{option}</option>
      {/each}
    </select>
  </div>
</fieldset>

<fieldset>
  <legend>Controls</legend>
  <button onclick={() => automaton.step()}>></button>
</fieldset>

<style>
  .size, .appearance {
    display: flex;
    align-items: center;
    justify-items: center;
    gap: 5px;
  }

  fieldset {
    border: none;
    border-right: 3px solid var(--accent);
  }
</style>
