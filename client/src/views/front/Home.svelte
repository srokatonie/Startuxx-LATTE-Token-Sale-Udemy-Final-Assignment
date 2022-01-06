<script lang="ts">
  import BigButton from '../components/BigButton.svelte'
  import getWeb3 from '../../services/web3-service';
  import MyTokenSale from "../../contracts/MyTokenSale.json";
  import MyToken from "../../contracts/MyToken.json";
  import { onMount } from 'svelte';
  import { connectedAddress, totalMinted } from '../../stores'
  import settings from '../../settings.json'

  export let currentRoute
  export let params
  console.log(currentRoute)
  console.log(params)

  let web3: any
  let tokenInstance: any
  let tokenSaleInstance: any
  let tokenSaleContractAddress: string
  let disabled: boolean = false
  let userTokens: number|string = 0
  let amountToBuy: number = 1

  connectedAddress.subscribe(async (val) => {
    if (val) {
      disabled = false
    } else {
      disabled = true
    }
  })

  onMount(async (): Promise<void> => {
    web3 = await getWeb3()

    if (!web3) {
      console.log(`No web3 provider available`)
      return
    }

    const networkId = await (web3 as any).eth.net.getId()

    if (!networkId || networkId != settings.networkId) {
      console.log('Unsupported network')
      return null
    }
    
    tokenSaleContractAddress = MyTokenSale.networks[networkId].address

    tokenInstance = new (web3 as any).eth.Contract(
      MyToken.abi,
      MyToken.networks[networkId] && MyToken.networks[networkId].address,
    )

    tokenSaleInstance = new (web3 as any).eth.Contract(
      MyTokenSale.abi,
      MyTokenSale.networks[networkId] && MyTokenSale.networks[networkId].address,
    )

    tokenInstance.events.Transfer({to: $connectedAddress}).on('data', updateUserTokens)
    tokenSaleInstance.events.TokensPurchased().on('data', updateTotalMinted)
    connectedAddress.subscribe(() => {
      updateTokenNumbers()
    })
    updateTokenNumbers()
  })

  const updateUserTokens = async (): Promise<void> => {
    if ($connectedAddress) {
      userTokens = await tokenInstance.methods.balanceOf($connectedAddress).call()
    }
  }

  const updateTotalMinted = async (): Promise<void> => {
    $totalMinted = await tokenSaleInstance.methods.weiRaised().call()
  }

  function updateTokenNumbers(): void {
    updateUserTokens()
    updateTotalMinted()
  }

  async function onBuyTokens(): Promise<void> {
    if (amountToBuy > 0) {
      const txResult = await tokenSaleInstance.methods.buyTokens($connectedAddress).send({from: $connectedAddress, value: (web3 as any).utils.toWei(amountToBuy.toString(), 'wei')})
    } else {
      alert(`The amount to buy needs to be over 0`)
    }
  }

</script>

<h1 class="text-2xl mb-4 text-gray-700 font-semibold">Buy tokens</h1>

<p class="text-gray-700 mb-3 text-xs uppercase flex flex-row items-center font-medium">
  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg> 
  Please note: this is just a demo project that runs on &nbsp;<strong>Goerli</strong>&nbsp; test network
</p>

<div class="bg-white shadow overflow-hidden sm:rounded-lg my-5">
  <div class="">
    <dl>
      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
          Total minted
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-right">
          {$totalMinted}
        </dd>
      </div>
      <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
          You own
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-right">
          {userTokens}
        </dd>
      </div>
    </dl>
  </div>
</div>

<div class="flex flex-row justify-center items-end mb-3">
  <div class="col-span-6 sm:col-span-3">
    <div class="select-all">
      <label for="amountToBuy" class="block text-sm font-medium text-gray-700">Amount to buy</label>
      <input bind:value={amountToBuy} type="number" min="1" name="amountToBuy" id="amountToBuy" class="text-right px-3 py-1.5 mt-1 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300 border" placeholder="123" autocomplete="off">
    </div>
  </div>
  <div class="ml-1">
    <BigButton on:click="{onBuyTokens}" bgColor="bg-indigo-700" label="Buy tokens" disabled="{disabled}" />
  </div>
</div>

{#if tokenSaleContractAddress }
<div>
  <p class="text-gray-600 text-xs text-center"><em>Token sale contract address: <a class="underline" href="https://goerli.etherscan.io/address/{tokenSaleContractAddress}">{tokenSaleContractAddress}</a></em></p>
</div>
{/if}