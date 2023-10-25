<script lang="ts" setup>
interface Props {
  currentPage: number
  totalPageNumbers: number[]
  totalPages: number
}

interface Emits {
  (e: 'pageChanged', page: number): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
</script>

<template>
  <div>
    <button :disabled="props.currentPage == 1" @click="emits('pageChanged', props.currentPage - 1)">
      Anterior
    </button>
    <button
      v-for="page in props.totalPageNumbers"
      :key="page"
      :class="{ active: props.currentPage === page }"
      @click="emits('pageChanged', page)"
    >
      {{ page }}
    </button>
    <button
      :disabled="props.currentPage == props.totalPages"
      @click="emits('pageChanged', props.currentPage + 1)"
    >
      Siguiente
    </button>
  </div>
</template>

<style scoped>
div {
  margin-top: 10px;
}

button {
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  cursor: pointer;
  margin-right: 5px;
  padding: 10px;
  transition: all 0.5s;
}

button:hover {
  background-color: hsla(160, 100%, 37%, 0.2);
  transition: all 0.5s;
}
button:disabled {
  cursor: not-allowed;
}
.active {
  background-color: hsla(160, 100%, 37%, 0.2);
}
</style>
