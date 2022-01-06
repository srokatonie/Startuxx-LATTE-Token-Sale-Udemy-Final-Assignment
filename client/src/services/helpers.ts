import getWeb3 from './web3-service';
import MyTokenSale from "../contracts/MyTokenSale.json";
import { totalMinted } from '../stores'
import settings from '../settings.json'

const getTotalSold = async () => {
  const web3 = await getWeb3()

  if (!web3) {
    console.log(`No web3 provider available`)
    return
  }
  
  const networkId = await web3['eth'].net.getId()

  if (!networkId || networkId != settings.networkId) {
    console.log('Unsupported network')
    return null
  }
  
  const tokenSaleInstance = new web3['eth'].Contract(
    MyTokenSale.abi,
    MyTokenSale.networks[networkId] && MyTokenSale.networks[networkId].address,
  )
  
  return tokenSaleInstance.events.TokensPurchased()
}

const updateTotalMinted = async () => {

  const web3 = await getWeb3()

  if (!web3) {
    console.log(`No web3 provider available`)
    return
  }
  
  const networkId = await web3['eth'].net.getId()

  if (!networkId || networkId != settings.networkId) {
    console.log('Unsupported network')
    return null
  }
  
  const tokenSaleInstance = new web3['eth'].Contract(
    MyTokenSale.abi,
    MyTokenSale.networks[networkId] && MyTokenSale.networks[networkId].address,
  )
  
  const minted = await tokenSaleInstance.methods.weiRaised().call()
  totalMinted.set(minted)
}

const Helpers = {
  getTotalSold,
  updateTotalMinted
}

export default Helpers
