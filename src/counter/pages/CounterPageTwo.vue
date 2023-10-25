<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import CounterSetupValue from '../components/CounterSetupValue.vue'
import { useCounterSetupStore } from '@/store/counter-setup'

const counterOptions = useCounterSetupStore()
const { count, squareCount } = storeToRefs(counterOptions)
const { increment, incrementBy } = counterOptions
</script>

<template>
  <h1>Pinia Setup</h1>
  <h4>Counter {{ count }}</h4>
  <h4>Square {{ squareCount }}</h4>
  <br />
  <button @click="increment">+1</button>
  <button @click="incrementBy(2)">+2</button>
  <button @click="incrementBy(5)">+5</button>
  <button @click="counterOptions.reset">reset</button>

  <CounterSetupValue />
</template>

<style scoped>
button {
  margin-right: 5px;
}
</style>
