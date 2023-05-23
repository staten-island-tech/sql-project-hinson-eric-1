import { defineStore } from 'pinia'
import {ref, onMounted} from 'vue'

export const useCounterStore = defineStore('c-user', () => {
  let cart = ref([])
  let carttotal = ref(0)

  return {cart, carttotal}
})