<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let bgColor: string
  export let label: string
  export let disabled: boolean = false

  const dispatch = createEventDispatcher()

  function action() {
    dispatch('click')
  }

</script>

<button on:click={action} type="button" class:opacity-50="{disabled}" class:cursor-not-allowed="{disabled}"  class="{bgColor} big-button flex flex-row items-center justify-center rounded-md border border-transparent shadow-sm px-2 py-1 text-white font-medium tracking-wide" disabled={disabled}>{label}</button>

<style>
  button {
    font-family: 'Anton', sans-serif;
  }
</style>