import { writable } from 'svelte/store';

export const connectedAddress = writable(null)
export const connectedChainIdDecimal = writable(null)
export const connectionStatusMessage = writable(null)
export const totalMinted = writable(null)