<template>
  <div class="page">
    <div class="container">
      <h1 class="page__title">User Detail</h1>

      <div v-if="user" class="user">
        <UserInfo :originalUser="user" />
        <ACLTable :user="user" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User } from '../../types/types'

type Data = {
  user: User | null
}

export default defineComponent({
  components: {},
  props: {},
  data(): Data {
    return {
      user: null,
    }
  },
  mounted() {
    this.getUserDetail()

    this.$root.$on('refresh-user-detail', () => {
      this.getUserDetail()
    })
  },
  beforeDestroy() {
    this.$root.$off('refresh-user-detail')
  },
  created() {},
  computed: {},
  methods: {
    async getUserDetail() {
      this.$store.commit('store/setLoading', true)

      try {
        const res = await this.$axios.get(
          `${this.$store.state.store.apiUrl}/api/users/${this.$route.params.id}`
        )
        const user = res.data.user
        this.user = {
          ...user,
          acl: user.acl.map((acl) => ({
            ...acl,
            isChecked: false,
          })),
        }
        this.originalUser = this.user

        this.$store.commit('store/setLoading', false)
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
