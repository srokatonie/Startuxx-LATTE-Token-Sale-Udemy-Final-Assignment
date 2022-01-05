<script lang="ts">
  import BigButton from '../components/BigButton.svelte'

  export let currentRoute
  export let params

  console.log(currentRoute)
  console.log(params)

  let addressToWhitelist: string
  let disabled = false

  function onWhitelist() {
    alert(`onWhitelist`)
  }

</script>

<h1 class="text-2xl mb-4 text-gray-700 font-semibold">KYC Whitelisting</h1>

<p class="text-gray-700 mb-3 text-xs uppercase flex flex-row items-center font-medium">
  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  For the purpose of this example, anyone can whitelist any address.
</p>

<div class="flex flex-row items-end mb-3">
  <div class="grow w-full">
    <div class="select-all">
      <label for="addressToWhitelist" class="block text-sm font-medium text-gray-700">Address to whitelist</label>
      <input bind:value={addressToWhitelist} type="text" name="addressToWhitelist" id="addressToWhitelist" class="px-3 py-1.5 mt-1 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300 border" placeholder="0x123..." autocomplete="off">
    </div>
  </div>
  <div class="ml-1">
    <BigButton on:click="{onWhitelist}" bgColor="bg-indigo-700" label="Whitelist" disabled="{disabled}" />
  </div>
</div>