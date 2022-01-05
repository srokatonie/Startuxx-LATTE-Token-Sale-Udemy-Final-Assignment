// Won't build on Rollup - included in index.html

// import Web3 from "web3";

const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    if (window['ethereum']) {
      // @ts-ignore
      const web3 = new Web3(window['ethereum']);
      resolve(web3);
    }
    // else if (window['web3']) {
    //   const web3 = window['web3'];
    //   console.log(`Injected web3 detected.`);
    //   resolve(web3);
    // }
    else {
      try {
        // @ts-ignore
        const provider = new Web3.providers.HttpProvider(
          'http://127.0.0.1:8545'
        );
        if (provider) {
          // @ts-ignore
          const web3 = new Web3(provider)
          console.log(`No web3 instance injected, trying to use Local web3 @ http://127.0.0.1:8545`);
          resolve(web3)
        } else {
          reject()
        }
      } catch (error) {
        reject()
      }
    }
  })
}
  

export default getWeb3;