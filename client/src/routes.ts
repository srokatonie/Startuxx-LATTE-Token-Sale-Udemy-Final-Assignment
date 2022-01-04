import Layout from './views/components/Layout.svelte'
import Home from './views/front/Home.svelte'
import Kyc from './views/front/Kyc.svelte'
import Faq from './views/front/Faq.svelte'


const routes = [
  { name: '/', component: Home, layout: Layout },
  { name: 'kyc', component: Kyc, layout: Layout },
  { name: 'faq', component: Faq, layout: Layout },
]

export { routes }