<template>
  <article
    class="bg-white w-full rounded shadow p-3 mb-2"
    :data-category="category"
    >
    <div class="flex justify-between items-center pb-4">
      <div class="flex items-center">
        <div class="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-2">
          <span class="font-bold text-white">{{ name[0] }}</span>
        </div>
        <h3 class="font-bold">{{ name }}</h3>
      </div>

      <span class="inline-block text-sm p-1 rounded bg-gray-200 font-semibold">{{ category }}</span>
    </div>

    <div class="flex text-gray-600 pb-2">
      <svg class="mr-2 mt-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/></svg>
      <p class="leading-tight">{{address}}</p>
    </div>

    <div class="-mx-1">
      <span
        class="bg-green-100 inline-block rounded-full mx-1 px-3 py-1 border border-green-200 text-xs font-semibold text-green-800"
        v-if="hasTakeOut">
        <svg class="mr-1 inline-block text-green-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="arcs"><polyline points="20 6 9 17 4 12"></polyline></svg> Para Llevar
      </span>
      <span
        class="bg-green-100 inline-block rounded-full mx-1 px-3 py-1 border border-green-200 text-xs font-semibold text-green-800"
        v-if="hasDelivery">
        <svg class="mr-1 inline-block text-green-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="arcs"><polyline points="20 6 9 17 4 12"></polyline></svg> Servicio a Domicilio
      </span>
      <span
        class="bg-green-100 inline-block rounded-full mx-1 px-3 py-1 border border-green-200 text-xs font-semibold text-green-800"
        v-if="hasOnlineStore">
        <svg class="mr-1 inline-block text-green-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="arcs"><polyline points="20 6 9 17 4 12"></polyline></svg> Tienda en Linea
      </span>
    </div>

    <div class="text-right">
      <router-link
        :to="slug"
        class="border inline-block px-5 py-2 rounded font-semibold bg-green-500 text-white text-sm">
        Ver Datos
      </router-link>
    </div>

  </article>
</template>

<script>
export default {
  name: 'ListingPreview',

  props: {
    listing: Array,
  },

  data: () => ({}),

  computed: {
    name() {
      return this.listing[1]
    },
    category() {
      return this.listing[2]
    },
    address() {
      return `
        ${this.listing[3]}
        #${this.listing[4]}${this.listing[5]},
        ${this.listing[6]},
        ${this.listing[7]},
        ${this.listing[8]},
        ${this.listing[9]}
      `;
    },

    hasTakeOut() {
      return this.listing[16] === 'Sí'
    },
    hasDelivery() {
      return this.listing[18] === 'Sí'
    },
    hasOnlineStore() {
      return this.listing[19] === 'Sí'
    },
    slug() {
      return this.listing[23]
    },
  },
}
</script>