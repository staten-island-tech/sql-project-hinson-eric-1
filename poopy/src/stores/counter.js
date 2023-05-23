import { defineStore } from 'pinia'
import {ref, onMounted} from 'vue'

export const useCounterStore = defineStore('c-user', () => {
  let cart = ref([])
  let carttotal = ref(0)

  function add(x) {
    cartotal = ref(cartotal.value + x)
  }
  function ccart(x) {
    cart = ref(x)
  }
  function ctotal(x) {
    cartotal = ref(x)
  }
  return {cart, carttotal, add, ccart, ctotal}
})