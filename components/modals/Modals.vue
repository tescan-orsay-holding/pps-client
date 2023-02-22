<template>
  <div
    class="modal-wrapper"
    :class="{
      'modal-wrapper--active': hasActiveModal,
    }"
  >
    <DeleteUserModal :isActive="modals.deleteUser.isActive" />
    <AddUserModal :isActive="modals.addUser.isActive" />
    <AddACLModal :isActive="modals.addAcl.isActive" />
    <DeleteACLModal :isActive="modals.deleteAcl.isActive" />
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
    modals() {
      return this.$store.state.store.modals
    },
    hasActiveModal() {
      return Object.keys(this.modals).some((key) => this.modals[key].isActive)
    },
  },
  methods: {},
  watch: {},
})
</script>

<style scoped></style>
