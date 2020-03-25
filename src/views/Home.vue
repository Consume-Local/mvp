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

      <input v-model="category" type="radio" id="All" name="categories" value="Tido Tipo" checked class="hidden">
      <input v-for="(cat, index) in categories" :key="index" v-model="category" type="radio" :id="cat" name="categories" :value="cat" class="hidden">

      <article v-for="(listing, index) in filtered" :key="`listing-${index}`" class="bg-white w-full rounded shadow p-3 mb-2" :data-category="listing[2]">

        <div class="flex justify-between items-center pb-4">

          <div class="flex items-center">
            <div class="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-2">
              <span class="font-bold text-white">{{ listing[1][0] }}</span>
            </div>
            <h3 class="font-bold">{{ listing[1] }}</h3>
          </div>

          <span class="inline-block text-center text-sm p-1 rounded bg-gray-200 font-semibold">{{ listing[2] }}</span>
        </div>

        <div class="flex text-gray-600 pb-2">
          <svg class="mr-2 mt-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/></svg>
          <p class="leading-tight">{{ listing[3] }} #{{ listing[4] }} {{ listing[5] }}, {{ listing[6] }}, {{ listing[7] }}, {{ listing[8] }}, {{ listing[9] }} </p>
        </div>

        <div class="-mx-1">
          <span class="bg-green-100 inline-block rounded-full m-1 px-3 py-1 border border-green-200 text-xs font-semibold text-green-800" v-if="listing[19] === 'Sí'"> <svg class="mr-1 inline-block text-green-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="arcs"><polyline points="20 6 9 17 4 12"></polyline></svg> Para Llevar</span>
          <span class="bg-green-100 inline-block rounded-full m-1 px-3 py-1 border border-green-200 text-xs font-semibold text-green-800" v-if="listing[18] === 'Sí' "> <svg class="mr-1 inline-block text-green-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="arcs"><polyline points="20 6 9 17 4 12"></polyline></svg> Servicio a Domicilio</span>
          <span class="bg-green-100 inline-block rounded-full m-1 px-3 py-1 border border-green-200 text-xs font-semibold text-green-800" v-if="listing[16] === 'Sí' " > <svg class="mr-1 inline-block text-green-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="arcs"><polyline points="20 6 9 17 4 12"></polyline></svg> Tienda en Linea</span>
        </div>

        <div class="text-right">
          <router-link :to="`${ listing[23] }`" class="border inline-block px-5 py-2 rounded font-semibold bg-green-500 text-white text-sm mb-1">Ver Negocio</router-link>
        </div>

      </article>
    </section>

    <div v-if="filtered === undefined" class="text-center w-full md:w-1/3 p-5 rounded border mx-auto">
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
    filtered() {
      return (this.state === "Todo México")
        ? this.listings
        : this.listings.filter(el => el[9] === this.state);
    },
  },

  methods:{
    filter() {
      this.$router.push({ query: Object.assign({}, this.$route.query, { location: this.state }) });
    }
  },
  mounted() {
    getparams: {
      if(this.$route.query.location) {
        this.state = this.$route.query.location
      } else {
        this.state = 'Todo México'
      }
    }
  }
}
</script>

<style>
  [value="Tido Tipo"]:checked ~ [data-category] {
    display: block;
  }

  [value="Comida"]:checked ~ article:not([data-category~="Comida"]),
  [value="Supermercados y Tiendas"]:checked ~ article:not([data-category~="Supermercados y Tiendas"]),
  [value="Carniceria"]:checked ~ article:not([data-category~="Carniceria"]),
  [value="Verdulería"]:checked ~ article:not([data-category~="Verdulería"]),
  [value="Dulcería"]:checked ~ article:not([data-category~="Dulcería"]),
  [value="Farmacia"]:checked ~ article:not([data-category~="Farmacia"]),
  [value="Ferretería"]:checked ~ article:not([data-category~="Ferretería"]),
  [value="Compras"]:checked ~ article:not([data-category~="Compras"]),
  [value="Ropa y Accesorios"]:checked ~ article:not([data-category~="Ropa y Accesorios"]),
  [value="Tintorería"]:checked ~ article:not([data-category~="Tintorería"]),
  [value="Florería"]:checked ~ article:not([data-category~="Florería"]),
  [value="Mascotas"]:checked ~ article:not([data-category~="Mascotas"]),
  [value="Otr"]:checked ~ article:not([data-category~="Otro"]) {
    display: none;
  }
</style>