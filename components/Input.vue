<template>
  <label class="input">
    <p v-if="label" class="input__label">{{ label }}</p>
    <input
      class="input__field"
      :value="value"
      v-bind="inputAttrs"
      @input="$emit('input', $event)"
    />
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  props: {
    label: String,
    inputAttrs: Object,
    value: [String, Number],
  },
  data() {
    return {}
  },
  mounted() {},
  created() {},
  computed: {},
  methods: {},
  watch: {},
})
</script>

<style scoped></style>
