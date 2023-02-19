<template>
  <div class="page">
    <h1 class="page__title">Users</h1>
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th v-for="(column, i) in columns" :key="i">{{ column.text }}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, i) in users"
            :key="i"
            @click="openUserDetail(user.id)"
          >
            <td v-for="(column, j) in columns" :key="j">
              {{ user[column.userProperty] || '-' }}
            </td>
            <td>
              <p>Edit</p>
              <p>Delete</p>
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
      columns: [
        {
          text: 'ID',
          userProperty: 'id',
        },
        {
          text: 'E-mail',
          userProperty: 'email',
        },
        {
          text: 'Username',
          userProperty: 'username',
        },
        {
          text: 'Password',
          userProperty: 'password',
        },
      ],
      users: [
        {
          id: '123',
          email: 'alala@alal.al',
          username: 'alaalal',
          password: 'hased123',
        },
        {
          id: '1523',
          email: 'axahhha@alal.al',
          username: 'alaadslal',
          password: 'hesed123',
        },
      ],
    }
  },
  mounted() {},
  methods: {
    openUserDetail(id) {
      console.log('open user detail: ', id)
    },
  },
})
</script>
