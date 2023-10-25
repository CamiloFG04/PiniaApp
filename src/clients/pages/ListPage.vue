<script lang="ts" setup>
import ClientList from '../components/ClientList.vue'
import PaginationNumbers from '../components/PaginationNumbers.vue'
import LoadingModal from '@/shared/components/LoadingModal.vue'
import useClients from '../composables/useClients'

const { isLoading, clients, currentPage, getPage, totalPageNumbers, totalPages } = useClients()
</script>

<template>
  <div>
    <h1>Lista de clientes</h1>
    <ClientList :clients="clients" />
    <PaginationNumbers
      :currentPage="currentPage"
      :totalPageNumbers="totalPageNumbers"
      :totalPages="totalPages"
      @pageChanged="getPage"
    />
    <LoadingModal v-if="isLoading" />
  </div>
</template>

<style scoped></style>
