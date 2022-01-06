<script lang="ts">
  export let currentRoute
  export let params

  console.log(currentRoute)
  console.log(params)
</script>

<h1 class="text-2xl mb-4 text-gray-700 font-semibold">FAQ</h1>

<p><strong class="font-semibold text-gray-800">How can I buy tokens?</strong></p>
<p>You have to <a class="underline text-indigo-700" href="/kyc">whitelist</a> your address first, then you can buy them! Make sure your Metamask is connected to Goerli test network and the connected account <a class="underline text-indigo-700" href="https://faucets.chain.link/goerli">has some funds</a>.</p>

<hr class="bg-gray-900 opacity-0 mb-5">

<p><strong class="font-semibold text-gray-800">How come can I whitelist myself?</strong></p>
<p>The KYC Smart Contract has been changed so anyone can test:</p>
<p class="my-1"><img src="/kyc-contract.png" alt="KYC Contract"></p>
<p>Normally, only owner could do that.</p>

<hr class="bg-gray-900 opacity-0 mb-5">

<p><strong class="font-semibold text-gray-800">Are these tokens worth anything?</strong></p>
<p>Yes, they're worth a lot of sentiment of the developer who created their Smart Contract.</p>



