<template>
  <button
    class="button"
    :class="[className]"
    v-bind="buttonAttrs"
    @click="handleClick()"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  props: {
    className: String,
    buttonAttrs: Object,
  },
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
