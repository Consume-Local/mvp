<template>
  <section class="py-8 flex justify-between flex-col md:flex-row">

    <div class="w-11/12 md:w-1/2 mx-auto" v-if="listing && listing.length > 0">

      <div class="border rounded p-5 bg-white mb-5 flex items-center justify-between flex-col md:flex-row">
        <div class="flex items-center mb-4 md:mb-0">
          <div class="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center mr-2">
            <span class="font-bold text-white text-2xl">{{ listing[1][0] }}</span>
          </div>
          <div>
            <h1 class="text-xl pb-1 md:text-3xl leading-none">{{ listing[1] }}</h1>
            <span class="inline-block text-sm p-1 rounded bg-gray-200 font-semibold">{{ listing[2] }}</span>
          </div>
        </div>
        <div>
          <a class="bg-green-500 text-white inline-block rounded font-semibold text-lg px-3 py-2 mr-2" v-if="listing[16] === 'Sí'" :href="listing[17]" target="_blank">Ir a Tienda</a>
          <button @click="modal = !modal" class="bg-green-500 text-white inline-block rounded font-semibold text-lg px-3 py-2" >Ver Teléfono</button>
        </div>
      </div>

      <div class="mb-5">
        <div class="-mx-1">
          <span class="bg-green-100 inline-block rounded-full m-1 px-3 py-1 border border-green-200 text-xs font-semibold text-green-800" v-if="listing[19] === 'Sí'"> <svg class="mr-1 inline-block text-green-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="arcs"><polyline points="20 6 9 17 4 12"></polyline></svg> Para Llevar</span>
          <span class="bg-green-100 inline-block rounded-full m-1 px-3 py-1 border border-green-200 text-xs font-semibold text-green-800" v-if="listing[18] === 'Sí' "> <svg class="mr-1 inline-block text-green-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="arcs"><polyline points="20 6 9 17 4 12"></polyline></svg> Servicio a Domicilio</span>
          <span class="bg-green-100 inline-block rounded-full m-1 px-3 py-1 border border-green-200 text-xs font-semibold text-green-800" v-if="listing[16] === 'Sí' " > <svg class="mr-1 inline-block text-green-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="arcs"><polyline points="20 6 9 17 4 12"></polyline></svg> Tienda en Linea</span>
        </div>
      </div>

      <div class="border rounded p-5 bg-white mb-5">
        <h3 class="font-bold pb-2">Productos o Servicios</h3>
        <p class="leading-relaxed text-gray-600 text-lg leading-relaxed">{{ listing[20] }}</p>
      </div>

      <div class="border rounded p-5 bg-white mb-5">
        <h3 class="font-bold">Dirección</h3>
        <div class="flex justify-between items-center flex-col md:flex-row">
          <p class="leading-tight text-xl text-gray-600 pr-10 flex-1 mb-2 md:mb-0">{{ listing[3] }} #{{ listing[4] }} {{ listing[5] }}, {{ listing[6] }}, {{ listing[7] }}, {{ listing[8] }}, {{ listing[9] }} </p>
          <a class="w-full md:w-auto text-center bg-green-500 text-white inline-block rounded font-semibold text-xl px-3 py-2" :href="address">Ver en Mapa</a>
        </div>
      </div>

      <div class="border rounded p-5 bg-white mb-5">
        <h3 class="font-bold pb-2">Instrucciones de Entrega</h3>
        <p class="leading-relaxed text-gray-600 text-lg leading-relaxed">{{ listing[21] }}</p>
      </div>

    </div>

    <div class="modal fixed inset-0" v-show="modal">
      <div class="bg-white p-5 rounded shadow-lg relative z-20 my-2 w-11:12 md:w-1/3 mx-auto">

        <div class="flex items-center justify-between">
          <h3 class="font-bold mb-2">Datos de Contacto</h3>
          <button @click="modal = !modal" class="rounded border px-3 py-2 font-semibold hover:bg-gray-100">Cerrar</button>
        </div>

        <div class="my-2 p-3 rounded border">
          <h4 class="font-semibold text-sm">Atención</h4>
          <p class="text-sm">Recuerda seguir todas las medidas de seguridad y salubridad necesarias. Por favor sé responsable y respetuoso con el pedido que realizaras. Muchos de estos negocios no tienen la capacidad de soportar perdidas.</p>
        </div>

        <a v-if="listing && listing[10]" class="w-full px-3 py-2 bg-green-500 text-white mb-2 block rounded text-center" :href="`tel:${listing[10]}`"> Teléfono Fijo: <strong>{{ listing[10] }}</strong> </a>
        <a v-if="listing && listing[11]" class="w-full px-3 py-2 bg-green-500 text-white mb-2 block rounded text-center flex items-center justify-center" :href="`tel:${listing[11]}`"> <svg class="mr-2" v-if="listing[12] === 'Sí' " xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 11.7c0 6.45-5.27 11.68-11.78 11.68-2.07 0-4-.53-5.7-1.45L0 24l2.13-6.27a11.57 11.57 0 0 1-1.7-6.04C.44 5.23 5.72 0 12.23 0 18.72 0 24 5.23 24 11.7M12.22 1.85c-5.46 0-9.9 4.41-9.9 9.83 0 2.15.7 4.14 1.88 5.76L2.96 21.1l3.8-1.2a9.9 9.9 0 0 0 5.46 1.62c5.46 0 9.9-4.4 9.9-9.83a9.88 9.88 0 0 0-9.9-9.83m5.95 12.52c-.08-.12-.27-.19-.56-.33-.28-.14-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.14-.2.29-.75.93-.91 1.12-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.32-1.43a8.64 8.64 0 0 1-1.6-1.98c-.18-.29-.03-.44.12-.58.13-.13.29-.34.43-.5.15-.17.2-.3.29-.48.1-.2.05-.36-.02-.5-.08-.15-.65-1.56-.9-2.13-.24-.58-.48-.48-.64-.48-.17 0-.37-.03-.56-.03-.2 0-.5.08-.77.36-.26.29-1 .98-1 2.4 0 1.4 1.03 2.76 1.17 2.96.14.19 2 3.17 4.93 4.32 2.94 1.15 2.94.77 3.47.72.53-.05 1.7-.7 1.95-1.36.24-.67.24-1.25.17-1.37"/></svg> Celular: <strong>{{ listing[11] }}</strong> </a>
        <a v-if="listing && listing[15]" class="w-full px-3 py-2 bg-green-500 text-white block rounded text-center" :href="`mailto:${listing[15]}`"> Email: <strong>{{ listing[15] }}</strong> </a>
      </div>
      <div class="bg-black opacity-50 absolute inset-0"></div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Listing',
  data() {
    return {
      modal: false
    }
  },

  props: {
    slug: String,
  },

  computed: {
    address() {
      var x = this.listing[3] + ' ' + this.listing[4] + ' ' + this.listing[5] + ',' + this.listing[6] + ',' + this.listing[7] + ',' + this.listing[8] + ',' + this.listing[9]
      // return 'https://maps.google.com/maps?&amp;q='+encodeURIComponent(x)+'&amp;output=embed'
      // return 'https://www.google.com/maps/embed/v1/place?q='+encodeURIComponent(x)+'&key=AIzaSyD2BDqSLvHXyTslgFko8BZg4xKtCIMceYk'
      // return 'https://maps.google.com/maps?q='+encodeURIComponent(x)+'&amp;ie=UTF8&amp;&amp;output=embed"'
      return 'https://www.google.com/maps/search/'+encodeURIComponent(x)+''
    },
    ...mapGetters([
      'listingBySlug',
    ]),

    listing() {
      return this.listingBySlug(this.slug);
    }
  },
}
</script>