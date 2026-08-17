<script lang="ts">
  import {  type RuleBody } from "$lib/pebble.svelte";

  type Props = { pebbles: number; body: RuleBody };

  let { pebbles, body = $bindable() }: Props = $props();

  let l_input: HTMLInputElement;
  let u_input: HTMLInputElement;
  let d_input: HTMLInputElement;
  let r_input: HTMLInputElement;

  function validate(e: Event, control: number) {
    let input: HTMLInputElement = e.target as HTMLInputElement;
    if (input.value == "") body[control] = 0;

    const total =
      parseInt(l_input.value) +
      parseInt(u_input.value) +
      parseInt(d_input.value) +
      parseInt(r_input.value);

    if (total > pebbles) {
      input.setCustomValidity(
        "Cannot move more pebbles out than the amount in the cell",
      );
      input.reportValidity();
      const current_value = parseInt(input.value);
      const max = pebbles - total + current_value;
      body[control] = max;
    }
  }
</script>

<div>
  <div>{pebbles}</div>
  <input
    bind:this={l_input}
    type="number"
    bind:value={body[0]}
    min="0"
    oninput={(e) => validate(e, 0)}
  />
  <input
    bind:this={u_input}
    type="number"
    bind:value={body[1]}
    min="0"
    oninput={(e) => validate(e, 1)}
  />
  <input
    bind:this={d_input}
    type="number"
    bind:value={body[2]}
    min="0"
    oninput={(e) => validate(e, 2)}
  />
  <input
    bind:this={r_input}
    type="number"
    bind:value={body[3]}
    min="0"
    oninput={(e) => validate(e, 3)}
  />
</div>

<style>
  input {
    display: block;
    width: 6ch;
    text-align: center;
    padding: 5px;
    border-radius: 10px;
    border: var(--border);
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
  input:nth-of-type(1) {
    grid-column: 2/3;
    grid-row: 1/3;
    border-right: none;
  }
  input:nth-of-type(2) {
    grid-column: 3/4;
    grid-row: 1/3;
    border-bottom: none;
  }
  input:nth-of-type(3) {
    grid-column: 2/4;
    grid-row: 3/5;
    border-top: none;
  }
  input:nth-of-type(4) {
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

  input {
    margin: 0;
    width: 4ch;
    height: 4ch;
    background: none;
    color: inherit;
    font-size: 1em;
    text-align: center;
  }
</style>
