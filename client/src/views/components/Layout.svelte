<script>
  import { Route } from 'svelte-router-spa'
  import TopHeader from './Header.svelte'
  export let currentRoute
  export let params
</script>

<main class="app min-h-screen flex flex-1 flex-col">
  <TopHeader {currentRoute} />
  <section class="p-5 flex-1 flex-col grow">
    <div class="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
        <div class="bg-white p-4">
          <Route {currentRoute} {params} />
        </div>
      </div>
    </div>
  </section>
</main>
