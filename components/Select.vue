<template>
  <div
    class="select"
    :class="[className, { 'select--opened': isOpened }]"
    @blur="isOpened = false"
    :tabindex="0"
  >
    <p v-if="label" class="select__label">{{ label }}</p>

    <div class="select__current" @click="isOpened = !isOpened">
      <p class="select__current-value">
        {{ options[selectedOptionIndex]?.label || '' }}
      </p>
      <div class="select__current-arrow">
        <Chevron />
      </div>
    </div>

    <ul class="select__options">
      <li
        v-for="(option, i) in options"
        :key="option.value"
        class="select__option"
        @click=";(isOpened = false), $emit('select', i)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    className: String,
    label: String,
    options: Array,
    selectedOptionIndex: Number,
  },
  data() {
    return {
      isOpened: false,
    }
  },
  mounted() {},
})
</script>

<style scoped></style>
