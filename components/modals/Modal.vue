<template>
  <div
    class="modal"
    :class="[
      {
        'modal--active': isActive,
      },
      className,
    ]"
  >
    <header class="modal__header">
      <p class="modal__title">{{ title }}</p>
      <div class="modal__close" @click="closeModal()"></div>
    </header>

    <div class="modal__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  props: {
    className: String,
    isActive: Boolean,
    title: String,
  },
  data() {
    return {}
  },
  mounted() {},
  created() {},
  computed: {},
  methods: {
    closeModal() {
      this.$store.commit('store/closeModals')
    },
  },
  watch: {},
})
</script>

<style scoped></style>
