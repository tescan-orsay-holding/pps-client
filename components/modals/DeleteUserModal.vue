<template>
  <Modal
    className="modal--delete-user"
    :isActive="isActive"
    :title="`Delete ${userTypo}`"
  >
    <p class="delete-user-message">
      You are about to delete {{ userIdsToDelete.length }} {{ userTypo }}. Are
      you sure you want to proceed?
    </p>
    <Button @click="deleteUsers()">Confirm</Button>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

type Data = {
  userIdsToDelete: number[]
}

export default defineComponent({
  components: {},
  props: {
    isActive: Boolean,
  },
  data(): Data {
    return {
      userIdsToDelete: [],
    }
  },
  mounted() {
    this.$root.$on('set-users-to-delete', (ids: number[]) => {
      this.userIdsToDelete = ids
    })
  },
  created() {},
  beforeDestroy() {
    this.$root.$off('set-users-to-delete')
  },
  computed: {
    userTypo() {
      return this.userIdsToDelete.length === 1 ? 'user' : 'users'
    },
  },
  methods: {
    async deleteUsers() {
      this.$store.commit('store/setLoading', true)

      try {
        await this.$axios.delete(
          `${this.$store.state.store.apiUrl}/api/users`,
          {
            data: {
              ids: this.userIdsToDelete,
            },
          }
        )
        this.userIdsToDelete = []
        this.$store.commit('store/closeModals')
        this.$store.commit('store/setLoading', false)
        this.$root.$emit('refresh-users')
      } catch (error) {
        alert(error?.response?.data?.error?.message || error)
        this.$store.commit('store/setLoading', false)
      }
    },
  },
  watch: {},
})
</script>

<style scoped></style>
