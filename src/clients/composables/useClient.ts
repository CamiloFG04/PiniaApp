import { watch } from 'vue'
import { useMutation, useQuery } from '@tanstack/vue-query'

import type { Client } from '../interfaces/client'
import clientsApi from '@/api/clientsApi'
import { useClientsStore } from '@/store/clients'
import { storeToRefs } from 'pinia'

const getClient = async (id: number): Promise<Client> => {
  const { data } = await clientsApi.get(`/clients/${id}`)
  return data
}
const updateClient = async (client: Client): Promise<Client> => {
  const { data } = await clientsApi.patch<Client>(`clients/${client.id}`, client)
  return data
}

const useClient = (id: number) => {
  const store = useClientsStore()
  const { client } = storeToRefs(store)
  const clientMutation = useMutation(updateClient)

  const { isLoading, data, isError, error } = useQuery(['client', id], () => getClient(id), {
    retry: false
  })

  watch(
    data,
    () => {
      if (data.value) client.value = { ...data.value }
      store.setClient({ ...data.value! })
    },
    { immediate: true }
  )

  return {
    client,
    clientMutation,
    error,
    isError,
    isLoading
  }
}

export default useClient
