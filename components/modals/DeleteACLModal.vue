<template>
  <Modal className="modal--delete-acl" :isActive="isActive" title="Delete ACL">
    <p class="delete-acl-message">
      You are about to delete {{ aclIdsToDelete.length }} ACL
      {{ aclIdsToDelete.length === 1 ? 'rule' : 'rules' }}. Are you sure you
      want to proceed?
    </p>
    <Button @click="deleteACL()">Confirm</Button>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

type Data = {
  aclIdsToDelete: number[]
  username: string
}

export default defineComponent({
  components: {},
  props: {
    isActive: Boolean,
  },
  data(): Data {
    return {
      aclIdsToDelete: [],
      username: '',
    }
  },
  mounted() {
    this.$root.$on(
      'set-acl-data-to-delete',
      (data: { username: string; ids: number[] }) => {
        this.username = data.username
        this.aclIdsToDelete = data.ids
      }
    )
  },
  created() {},
  beforeDestroy() {
    this.$root.$off('set-acl-data-to-delete')
  },
  computed: {},
  methods: {
    async deleteACL() {
      this.$store.commit('store/setLoading', true)

      try {
        await this.$axios.delete(`${this.$store.state.store.apiUrl}/api/acl`, {
          data: {
            username: this.username,
            ids: this.aclIdsToDelete,
          },
        })
        this.aclIdsToDelete = []
        this.$store.commit('store/closeModals')
        this.$store.commit('store/setLoading', false)
        this.$root.$emit('refresh-user-detail')
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
