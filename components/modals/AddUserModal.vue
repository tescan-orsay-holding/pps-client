<template>
  <Modal className="modal--add-user" :isActive="isActive" title="Add user">
    <form @submit="addUser($event)">
      <Input
        :label="username.label"
        :value="username.value"
        :inputAttrs="{
          minlength: 1,
          maxlength: 50,
          required: true,
        }"
        @input="username.value = $event.target.value"
      />
      <Input
        :label="password.label"
        :value="password.value"
        :inputAttrs="{
          type: 'password',
          minlength: 1,
          required: true,
        }"
        @input="password.value = $event.target.value"
      />
      <Select
        label="Role"
        :options="roleOptions"
        :selectedOptionIndex="selectedRoleIndex"
        @select="selectedRoleIndex = $event"
      />
      <Button :buttonAttrs="{ type: 'submit' }">Add</Button>
    </form>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { roleOptions } from '../../data/data'
import { SelectOption, Input } from '../../types/types'

type Data = {
  roleOptions: SelectOption[]
  selectedRoleIndex: number
  username: Input
  password: Input
}

export default defineComponent({
  components: {},
  props: {
    isActive: Boolean,
  },
  data(): Data {
    return {
      roleOptions,
      selectedRoleIndex: 0,
      username: {
        label: 'Username',
        value: '',
      },
      password: {
        label: 'Password',
        value: '',
      },
    }
  },
  mounted() {},
  created() {},
  computed: {},
  methods: {
    async addUser(e) {
      e.preventDefault()
      this.$store.commit('store/setLoading', true)

      try {
        const user = {
          username: this.username.value,
          password: this.password.value,
          role: this.roleOptions[this.selectedRoleIndex].value,
        }

        await this.$axios.post(
          `${this.$store.state.store.apiUrl}/api/users`,
          user
        )

        this.username.value = ''
        this.password.value = ''
        this.selectedRoleIndex = 0
        this.$store.commit('store/setLoading', false)
        this.$store.commit('store/closeModals')
        this.$root.$emit('refresh-users')
      } catch (error) {
        alert(error.response.data.error.message)
        this.$store.commit('store/setLoading', false)
      }
    },
  },
  watch: {},
})
</script>

<style scoped></style>
