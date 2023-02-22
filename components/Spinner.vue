<template>
  <span v-if="isLoading" class="spinner"></span>
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
  computed: {
    isLoading() {
      return this.$store.state.store.isLoading
    },
  },
  methods: {},
  watch: {},
})
</script>

<style scoped></style>
