<template>
  <div v-if="user" class="user__info">
    <p class="user__info-item">ID: {{ user.id }}</p>
    <p class="user__info-item">Username: {{ user.username }}</p>
    <div class="user__info-password">
      <Input
        :value="editingPassword ? passwordInput.value : '********'"
        :label="passwordInput.label"
        :inputAttrs="{
          disabled: !editingPassword,
        }"
        @input="passwordInput.value = $event.target.value"
      />
      <div
        class="icon-button"
        @click="
          ;(editingPassword = !editingPassword), (passwordInput.value = '')
        "
      >
        <CancelIcon v-if="editingPassword" />
        <EditIcon v-else />
      </div>
    </div>
    <Select
      className="user__info-role"
      label="Role"
      :options="roleOptions"
      :selectedOptionIndex="selectedRoleIndex"
      @select="selectedRoleIndex = $event"
    />
    <Button
      className="user__info-save"
      :buttonAttrs="{ disabled: !userChanged }"
      @click="saveUser()"
      >save</Button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User, SelectOption, Input } from '../types/types'
import { roleOptions } from '../data/data'

type Data = {
  roleOptions: SelectOption[]
  selectedRoleIndex: number
  user: User | null
  passwordInput: Input
  editingPassword: boolean
}

export default defineComponent({
  components: {},
  props: {
    originalUser: Object,
  },
  data(): Data {
    return {
      roleOptions,
      selectedRoleIndex: 0,
      user: null,
      passwordInput: {
        label: 'Password',
        value: '',
      },
      editingPassword: false,
    }
  },
  mounted() {
    this.user = this.originalUser
  },
  created() {},
  computed: {
    passwordChanged() {
      return this.passwordInput.value.length
    },
    roleChanged() {
      return (
        this.originalUser.role != this.roleOptions[this.selectedRoleIndex].value
      )
    },
    userChanged() {
      if (this.passwordChanged || this.roleChanged) {
        return true
      }

      return false
    },
  },
  methods: {
    async saveUser() {
      this.$store.commit('store/setLoading', true)

      try {
        const updateData: {
          username: string
          role?: string
          password?: string
        } = {
          username: this.user.username,
        }

        if (this.roleChanged) {
          updateData.role = this.roleOptions[this.selectedRoleIndex].value
        }

        if (this.passwordChanged) {
          updateData.password = this.passwordInput.value
        }

        await this.$axios.put(
          `${this.$store.state.store.apiUrl}/api/users`,
          updateData
        )

        this.editingPassword = false
        this.passwordInput.value = ''

        this.$root.$emit('refresh-user-detail')
      } catch (error) {
        alert(error?.response?.data?.error?.message || error)
        this.$store.commit('store/setLoading', false)
      }
    },
  },
  watch: {
    originalUser() {
      this.user = this.originalUser
      this.selectedRoleIndex = this.roleOptions.findIndex(
        (opt) => opt.value == this.user.role
      )
    },
  },
})
</script>

<style scoped></style>
