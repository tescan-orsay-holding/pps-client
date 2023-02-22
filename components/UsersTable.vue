<template>
  <div v-if="users.length" class="table-container">
    <header class="table-header">
      <div class="table-header-left">
        <template v-if="checkedAmount > 0">
          <p class="table-header-checked-amount">
            {{ checkedAmount }}
            {{ checkedAmount === 1 ? 'user' : 'users' }} selected
          </p>
        </template>
        <template v-else>
          <p class="table-header-title">User Table</p>
        </template>
      </div>
      <div class="table-header-right">
        <div class="icon-button plus" @click="openAddModal()"></div>
        <div
          v-if="checkedAmount > 0"
          class="icon-button"
          @click="openDeleteModal()"
        >
          <DeleteIcon />
        </div>
      </div>
    </header>
    <table class="table">
      <thead>
        <tr>
          <th>
            <Checkbox :isChecked="checkedAll" @check="handleCheckAll()" />
          </th>
          <th v-for="(column, i) in columns" :key="i">{{ column.text }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, i) in users"
          :key="i"
          @click="openUserDetail($event, user.id)"
        >
          <td>
            <Checkbox
              :isChecked="user.isChecked"
              @check="handleCheckUser(user.id)"
            />
          </td>
          <td v-for="(column, j) in columns" :key="j">
            {{ user[column.property] || '-' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TableColumn, User } from '../types/types'

type UserWithCheck = User & {
  isChecked: boolean
}

type Data = {
  checkedAll: boolean
  columns: TableColumn[]
  users: UserWithCheck[]
}

export default defineComponent({
  components: {},
  props: {},
  data(): Data {
    return {
      checkedAll: false,
      columns: [
        {
          text: 'ID',
          property: 'id',
        },
        {
          text: 'Username',
          property: 'username',
        },
        {
          text: 'Role',
          property: 'role',
        },
      ],
      users: [],
    }
  },
  mounted() {
    this.getUsers()

    this.$root.$on('refresh-users', () => {
      this.getUsers()
    })
  },
  beforeDestroy() {
    this.$root.$off('refresh-users')
  },
  created() {},
  computed: {
    checkedUsers() {
      return this.users.filter((user) => user.isChecked)
    },
    checkedAmount() {
      return this.checkedUsers.length
    },
  },
  methods: {
    async getUsers() {
      this.$store.commit('store/setLoading', true)

      try {
        const res = await this.$axios.get(
          `${this.$store.state.store.apiUrl}/api/users`
        )
        this.users = res.data.users.map((user) => ({
          ...user,
          isChecked: false,
        }))

        this.$store.commit('store/setLoading', false)
      } catch (error) {
        alert(error.response.data.error.message)
        this.$store.commit('store/setLoading', false)
      }
    },
    openDeleteModal() {
      this.$root.$emit(
        'set-users-to-delete',
        this.checkedUsers.map((user) => user.id)
      )
      this.$store.commit('store/openModal', 'deleteUser')
    },
    openAddModal() {
      this.$store.commit('store/openModal', 'addUser')
    },
    handleCheckUser(id: number) {
      const user = this.users.find((user) => user.id === id)

      if (!user) {
        return
      }

      user.isChecked = !user.isChecked

      if (this.checkedAll && !user.isChecked) {
        this.checkedAll = false
      }
    },
    handleCheckAll() {
      this.checkedAll = !this.checkedAll
      this.users.forEach((user) => {
        user.isChecked = this.checkedAll
      })
    },
    openUserDetail(e: MouseEvent, id: number) {
      if ((e.target as Element).tagName === 'INPUT') {
        return
      }

      this.$router.push({
        name: 'users-id',
        params: {
          id,
        },
      })
    },
  },
  watch: {},
})
</script>

<style scoped></style>
