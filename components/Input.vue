<template>
  <label class="input-container">
    <p v-if="label" class="input-label">{{ label }}</p>
    <input
      class="input"
      :type="type || 'text'"
      :value="value"
      @input="handleInputChange($event)"
    />

    <p v-if="error" class="input-error">{{ error }}</p>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  props: {
    type: String,
    label: String,
    error: String,
    value: [String, Number],
  },
  data() {
    return {}
  },
  mounted() {},
  created() {},
  computed: {},
  methods: {
    handleInputChange(e: any) {
      this.$emit('input', e.target.value)
    },
  },
  watch: {},
})
</script>

<style scoped></style>
