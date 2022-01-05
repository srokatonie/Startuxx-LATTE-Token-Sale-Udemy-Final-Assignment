<!-- 

Remember to include Web in your index.html file, ie.
<script src="https://cdn.jsdelivr.net/npm/web3@1.3.5/dist/web3.min.js"></script>

Usage:

<script lang="ts">
  // Possible events:
  // - connectedAddress
  // - connectionInfo
  // - chainIdDecimal
  // - message
  // - meserrorMessagesage
  function handleUpdate(event) {
    console.log({eventDetail: event.detail})
    if ('connectedAddress' in event.detail) {
      // For example, update a store
      connectedAddress.set(event.detail.connectedAddress)
    }
  }
</script>

<Metamask on:update={handleUpdate}/>

-->

<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';

  let connectedAddress: string = null
  let notificationMessage: string = null
  let errorMessage: string = null
  const eventDispatcher: any = createEventDispatcher()

  onMount(async (): Promise<void> => {
    if (!window['ethereum']) {
      notificationMessage = `MetaMask not installed.`
      return;
    }
    window['ethereum'].on('accountsChanged', handleAccountsChanged)
    window['ethereum'].on('connect', handleConnect)
    window['ethereum'].on('message', handleMessage)
    window['ethereum'].on('chainChanged', (chainId: string) => {
      window.location.reload()
    })

    try {
      const accounts: string[] = await window['ethereum'].request({ method: 'eth_accounts' })
      if (accounts && accounts.length) {
        connectedAddress = accounts[0]
        eventDispatcher('update', { connectedAddress })
      }
    } catch (error: any) {
      console.log(error)
    }

    // Get current chainId
    try {
      const chainId: string = await window['ethereum'].request({ method: 'eth_chainId' })
      handleCurrentChain(chainId)
    } catch (error) {
      console.log(error)
      errorMessage = `Couldn\'t retrieve chain ID`
    }
	})

  onDestroy((): void => {
    window['ethereum'].removeListener('accountsChanged', handleAccountsChanged)
    window['ethereum'].removeListener('connect', handleConnect)
    window['ethereum'].removeListener('message', handleMessage)
	})

  function handleAccountsChanged(accounts: string[]): void {
    if (accounts.length > 0) {
      connectedAddress = accounts[0]
    } else {
      connectedAddress = null
    }
    eventDispatcher('update', { connectedAddress })
  }

  function handleConnect(connectionInfo): void {
    eventDispatcher('connect', { connectionInfo })
  }

  function handleCurrentChain(chainIdHex: string): void {
    const chainIdDecimal: number = hexToDecimal(chainIdHex)
    eventDispatcher('update', { chainIdDecimal })
  }

  function handleMessage(message: any): void {
    eventDispatcher('update', { message })
  }

  async function connectMetaMask(): Promise<void> {
    if (window['ethereum']) {
      try {
        const accounts: string[] = await window['ethereum'].request({ method: 'eth_requestAccounts' })
      } catch (error) {
        // 4001 = 'User rejected the request'
        if (error.code != 4001) {
          errorMessage = error.message
          eventDispatcher('update', { errorMessage })
        } 
      }
    }
  }

  function readMessage(messageType): void {
    switch (messageType) {
      case 'notificationMessage':
        alert(notificationMessage)
        notificationMessage = null
        break;
      case 'errorMessage':
        alert(errorMessage)
        errorMessage = null
        break;
      default:
        break;
    }
  }

  /* 
  Helper functions
  */

  function hexToDecimal(hex: string): number {
    //@ts-ignore
    return parseInt(Number(hex), 10)
  }
  
  function shortAddress(address: string): string {
    return `${address.slice(0, 7)}...${address.slice(-7)}`
  }

</script>

{#if !connectedAddress && !notificationMessage && !errorMessage }
<button on:click="{connectMetaMask}" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 sm:ml-3 sm:w-auto sm:text-sm">
  Connect MetaMask
</button>
{/if}

{#if connectedAddress && !notificationMessage && !errorMessage }
<div class="flex flex-row items-center text-xs text-gray-100 rounded-md border border-transparent shadow-sm px-2 py-1 bg-gray-700">
  <div class="mr-2">
    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  </div>
  <div class="flex-col inline-flex justify-center">
    <p><strong>Connected address</strong></p>
    <p>{shortAddress(connectedAddress)}</p>
  </div>
</div>
{/if}

{#if notificationMessage && !errorMessage }
<button on:click="{() => readMessage('notificationMessage')}" type="button" class="flex flex-row items-center rounded-md border border-transparent shadow-sm px-2 py-1 bg-indigo-600 text-white hover:bg-indigo-700 text-xs">
  <div class="mr-2">
    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
  </div>
  <div class="flex-col inline-flex justify-center items-start">
    <p><strong>New message</strong></p>
    <!-- <p class="metamask-message text-"><span></span></p> -->
    <p class="metamask-message truncate">{notificationMessage}</p>
  </div>
</button>
{/if}

{#if !notificationMessage && errorMessage }
<button on:click="{() => readMessage('errorMessage')}" type="button" class="flex flex-row items-center rounded-md border border-transparent shadow-sm px-2 py-1 bg-red-600 text-white hover:bg-red-700 text-xs">
  <div class="mr-2">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  </div>
  <div class="flex-col inline-flex justify-center items-start">
    <p><strong>Error</strong></p>
    <!-- <p class="metamask-message text-"><span></span></p> -->
    <p class="metamask-message truncate">{errorMessage}</p>
  </div>
</button>
{/if}

<style>
  .metamask-message {
    max-width: 120px;
  }
</style>