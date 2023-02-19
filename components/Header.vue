<template>
  <header class="header">
    <div class="header__links">
      <nuxt-link
        v-for="(link, i) in links"
        :key="i"
        class="header__link"
        :class="{ 'header__link--active': $route.name === link.path.name }"
        :to="link.path"
        >{{ link.text }}</nuxt-link
      >
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  props: {},
  data() {
    return {
      links: [
        {
          text: 'Dashboard',
          path: {
            name: 'index',
          },
        },
        {
          text: 'Users',
          path: {
            name: 'users',
          },
        },
      ],
    }
  },
  mounted() {},
  created() {},
  computed: {},
  methods: {},
  watch: {},
})
</script>

<style scoped></style>
