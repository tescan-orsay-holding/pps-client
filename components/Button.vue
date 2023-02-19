<template>
  <button class="button" @click="handleClick()">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  props: {},
  data() {
    return {}
  },
  mounted() {},
  created() {},
  computed: {},
  methods: {
    handleClick() {
      this.$emit('click')
    },
  },
  watch: {},
})
</script>

<style scoped></style>
