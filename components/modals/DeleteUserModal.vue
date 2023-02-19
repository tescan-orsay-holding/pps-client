<template>
  <Modal :isActive="isActive" title="Delete user(s)">
    delete user
    <Button @click="deleteUser()">Delete</Button>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  props: {
    isActive: Boolean,
  },
  data() {
    return {}
  },
  mounted() {},
  created() {},
  computed: {},
  methods: {
    deleteUser() {
      console.log('delete user')

      this.$store.commit('store/closeModals')
    },
  },
  watch: {},
})
</script>

<style scoped></style>
