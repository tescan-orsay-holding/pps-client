<template>
  <label class="checkbox">
    <input
      class="checkbox__input"
      type="checkbox"
      v-model="isChecked"
      @click="toggleCheck()"
    />
    <p v-if="label" class="checkbox__label">{{ label }}</p>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  props: {
    label: String,
    isChecked: Boolean,
  },
  data() {
    return {}
  },
  mounted() {},
  created() {},
  computed: {},
  methods: {
    toggleCheck() {
      this.$emit('check')
    },
  },
  watch: {},
})
</script>

<style scoped></style>
