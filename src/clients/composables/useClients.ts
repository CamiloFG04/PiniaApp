import clientsApi from '@/api/clientsApi'
import type { Client } from '../interfaces/client'
import { useQuery } from '@tanstack/vue-query'
import { useClientsStore } from '@/store/clients'
import { storeToRefs } from 'pinia'
import { watch, computed } from 'vue'

const getClients = async (page: number): Promise<Client[]> => {
  // await new Promise(resolve => setTimeout(() => resolve(true), 2000))

  const { data } = await clientsApi.get<Client[]>(`/clients?_page=${page}`)
  return data
}

const useClients = () => {
  const store = useClientsStore()
  const { currentPage, clients, totalPages } = storeToRefs(store)

  const { isLoading, data } = useQuery(
    ['clients?page=', currentPage],
    () => getClients(currentPage.value),
    {
      // staleTime: 1000 * 60
    }
  )

  watch(
    data,
    (clients) => {
      if (clients) store.setClients(clients)
    },
    { immediate: true }
  )

  return {
    // Properties
    clients,
    currentPage,
    isLoading,
    totalPages,

    // Methods
    getPage(page: number) {
      store.setPage(page)
    },

    // Getters
    totalPageNumbers: computed(() => [...new Array(totalPages.value)].map((_, i) => i + 1))
  }
}

export default useClients
