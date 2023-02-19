<template>
  <div class="page">
    <h1 class="page__title">Users</h1>
    <div class="table-container">
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
              {{ user[column.userProperty] || '-' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      checkedAll: false,
      columns: [
        {
          text: 'ID',
          userProperty: 'id',
        },
        {
          text: 'Username',
          userProperty: 'username',
        },
        {
          text: 'Password',
          userProperty: 'password',
        },
        {
          text: 'Role',
          userProperty: 'role',
        },
      ],
      users: [
        {
          id: '123',
          username: 'alaalal',
          password: 'hased123',
          role: 'user',
          isChecked: false,
        },
        {
          id: '1523',
          username: 'alaadslal',
          password: 'hesed123',
          role: 'admin',
          isChecked: false,
        },
      ],
    }
  },
  computed: {
    checkedItems(): any[] {
      return this.users.filter((user) => user.isChecked)
    },
    checkedAmount(): number {
      return this.checkedItems.length
    },
  },
  mounted() {},
  methods: {
    openDeleteModal() {
      // console.log(this.$store)

      this.$store.commit('store/openModal', 'deleteUser')
    },
    openAddModal() {
      this.$store.commit('store/openModal', 'addUser')
    },
    handleCheckUser(id: any) {
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
    openUserDetail(e: any, id: any) {
      if (e.target.tagName === 'INPUT') {
        console.log(e.target.tagName)
        return
      }

      this.$router.push({
        name: 'users-id',
        params: {
          id,
        },
      })
      console.log('open user detail: ', id)
    },
  },
  watch: {},
})
</script>
