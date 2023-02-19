<template>
  <div class="page">
    <div class="page__title">{{ $route.params }}</div>

    <div class="user">
      <div class="user__info">
        <p>{{ user.id }}</p>
        <p>{{ user.username }}</p>
        <p>{{ user.password }}</p>
        <p>{{ user.role }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  props: {},
  data() {
    return {
      user: {
        id: '1523',
        username: 'alaadslal',
        password: 'hesed123',
        role: 'admin',
        rules: [
          {
            username: 'tensor-f2',
            topic: 'nanoscope/tensor-f3',
            rw: 4,
          },
        ],
      },
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
