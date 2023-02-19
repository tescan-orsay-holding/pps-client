<template>
  <header class="header">
    <div class="header__links">
      <nuxt-link
        v-for="(link, i) in links"
        :key="i"
        class="header__link"
        :class="{
          'header__link--active': link.activeRoutes.includes($route.name),
        }"
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
          activeRoutes: ['index'],
        },
        {
          text: 'Users',
          path: {
            name: 'users',
          },
          activeRoutes: ['users', 'users-id'],
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
