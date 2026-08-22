<script lang="ts">
  type Props = {
    onsizechange: (size: number) => void;
    onplay: () => void;
  };
  let { onsizechange, onplay }: Props = $props();

  let size_input = $state(0);
</script>

<fieldset>
  <legend>Grid options</legend>

  <div class="size">
    <label for="grid_size">Size</label>
    <input
      name="grid_size"
      type="range"
      bind:value={size_input}
      oninput={(_) => onsizechange(size_input)}
      min="5"
      max="10"
    />
  </div>
</fieldset>

<fieldset>
  <legend>Simulation</legend>
  <button onclick={(_) => onplay()}>></button>
</fieldset>

<style>
  .size {
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
