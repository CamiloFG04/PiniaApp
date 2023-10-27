<script lang="ts" setup>
import LoadingModal from '@/shared/components/LoadingModal.vue'
import useClient from '../composables/useClient'
import { useRoute, useRouter } from 'vue-router'
import { watch } from 'vue'

const route = useRoute()
const router = useRouter()
const { client, isLoading, isError, clientMutation } = useClient(+route.params.id)

watch(clientMutation.isSuccess, () => {
  setTimeout(() => {
    clientMutation.reset()
  }, 2000)
})

watch(isError, () => {
  if (isError.value) router.replace({ name: 'clients' })
})
</script>

<template>
  <h3 v-if="clientMutation.isLoading.value">Guardando...</h3>
  <h3 v-if="clientMutation.isSuccess.value">Guardado</h3>

  <LoadingModal v-if="isLoading || clientMutation.isLoading.value" />

  <div v-if="client">
    <h1>{{ client.name }}</h1>

    <form @submit.prevent="clientMutation.mutate(client)">
      <input type="text" placeholder="Nombre del cliente" v-model="client.name" />
      <br />
      <input type="text" placeholder="Dirección" v-model="client.address" />
      <br />
      <button type="submit" :disabled="clientMutation.isLoading.value">Guardar</button>
    </form>

    <code>
      {{ client }}
    </code>
  </div>
</template>

<style scoped>
input {
  width: 100%;
  padding: 5px 10px;
  margin-bottom: 10px;
}
button {
  margin-bottom: 10px;
}
</style>
