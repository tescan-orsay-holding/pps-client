<template>
  <div
    class="modal-wrapper"
    :class="{
      active: hasActiveModal,
    }"
  >
    <DeleteUserModal :isActive="modals.deleteUser.isActive" />
    <AddUserModal :isActive="modals.addUser.isActive" />
  </div>
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
    modals(): any {
      return this.$store.state.store.modals
    },
    hasActiveModal(): boolean {
      return Object.keys(this.modals).some((key) => this.modals[key].isActive)
    },
  },
  methods: {},
  watch: {},
})
</script>

<style scoped></style>
