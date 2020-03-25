<template>
  <div>
    <section class="px-5 py-20 bg-black bg-cover bg-center bg-no-repeat relative" style="background-image: url('https://images.unsplash.com/photo-1556403806-90f55c9db1e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80');">
      <h2 class="text-3xl leading-tight text-white relative z-10 font-semibold w-full md:w-8/12 text-center mx-auto">Encuentra negocios con servicio a domicilio, para llevar o venta en línea y ayuda a tu comunidad.</h2>
      <div class="absolute bg-black inset-0 opacity-50"></div>
    </section>

    <section class="px-5 py-2 border-b">
      <h4 class="font-bold uppercase text-xs pb-2">Filtrar por</h4>

      <div class="flex items-center justify-between flex-col md:flex-row">
        <div class="flex-wrap w-full md:w-2/3">
          <label class="text-sm m-1 inline-block mx-1 py-2 px-4 hover:bg-green-500 hover:text-white hover:border-transparent cursor-pointer rounded border" for="All">Todos</label>
          <label v-for="(cat, index) in categories" :key="index" class="text-sm m-1 inline-block mx-1 py-2 px-4 hover:bg-green-500 hover:text-white hover:border-transparent cursor-pointer rounded border" :for="cat">{{ cat }}</label>
        </div>

        <div class="relative mb-2 md:mb-0 w-full md:w-auto">
          <select class="block appearance-none w-full bg-transparent font-bold pl-4 py-2 pr-10 border outline-none" v-model="state" @change="filter">
            <option>Todo México</option>
            <option v-for="(state, index) in states" :key="index">{{state}}</option>
          </select>

          <div class="pointer-events-none text-green-500 absolute right-0 inset-y-0 items-center justify-center flex pr-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M6 9l6 6 6-6"/></svg></div>
        </div>

      </div>
    </section>

    <section class="p-5">
      <h3 class="text-xl">Negocios en <strong class="text-green-500 ">{{ state }}</strong> de <strong class="text-green-500 ">{{ category }}</strong></h3>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-3 gap-3 p-5">

      <input v-model="category" type="radio" id="All" name="categories" value="Todo Tipo" checked class="hidden">
      <input v-for="(cat, index) in categories" :key="index" v-model="category" type="radio" :id="cat" name="categories" :value="cat" class="hidden">

      <ListingPreview
        v-for="(listing, index) in filteredListings"
        :listing="listing"
        :key="`listing-${index}`"
        />
    </section>

    <div v-if="filteredListings === undefined || filteredListings.length < 1" class="text-center w-full md:w-1/3 p-5 rounded border mx-auto">
      <h3 class="font-bold pb-2 text-sm">Sin resultados para tu búsqueda</h3>
      <p class="pb-1">Esta categoría o ubicación aún no tiene resultados, sé el primero en publicar:</p>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSepnj-Z34jCXcd8UmF9LJvh6IkQ9MRawWmy31coI0O_hst1YA/viewform" target="_blank" class="font-semibold px-4 py-2 bg-green-500 rounded-full text-white text-sm mx-1">Publicar Negocio</a>
    </div>

    <div class="fixed bottom-0 inset-x-0" v-show="alert">
      <div class="mx-auto w-11/12 rounded bg-black p-3 rounded mb-2 text-white relative">
        <button @click="alert = !alert" class="p-2 rounded absolute right-0 top-0 text-white"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
        <h4 class="font-bold">Aviso de Uso</h4>
        <p><strong>Consumo Local</strong> es solo un catálogo de establecimientos realizado con la finalidad de ayudar a visibilizar aquellos pequeños negocios que han sido afectados por la contingencia. Nosotros no nos hacemos responsables de cualquier uso indebido de la plataforma, así como cualquier resultado de su uso. Alentamos a los negocios a seguir las recomendaciones sanitarias correspondientes, así como a los usuarios a salvaguardar su integridad.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ListingPreview from '@/components/ListingPreview.vue';

export default {
  name: 'Home',
  data() {
    return {
      alert: true,
      category: 'Todo Tipo',
      state: 'Todo México',
    }
  },
  computed: {
    ...mapGetters([
      'categories',
      'states',
      'listings',
    ]),

    filteredListings() {
      const rawListings = this.listings;
      const filteredByState = this.filterListingByState(rawListings);
      const filteredByCategory = this.filterListingByCategory(filteredByState);
      return filteredByCategory
    },
  },

  methods:{
    filter() {
      this.$router.push({ query: Object.assign({}, this.$route.query, { location: this.state }) });
    },

    filterListingByState(listings) {
      return (this.state === 'Todo México')
        ? listings
        : listings.filter(el => el[9] === this.state);
    },

    filterListingByCategory(listings) {
      return (this.category === 'Todo Tipo' || this.category == 'Todos')
        ? listings
        : listings.filter(el => el[2] === this.category);
    },
  },
  mounted() {
    getparams: {
      if(this.$route.query.location) {
        this.state = this.$route.query.location
      } else {
        this.state = 'Todo México'
      }
    }
  },
  components: {
    ListingPreview,
  }
}
</script>
