<template>
  <Modal :isActive="isActive" title="Add user">
    <Input
      v-for="key in Object.keys(formData)"
      :key="key"
      :type="formData[key].type"
      :label="formData[key].label"
      :value="formData[key].value"
      @input="handleInput(key, $event)"
    />
    <Button @click="addUser()">Add</Button>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  props: {
    isActive: Boolean,
  },
  data() {
    return {
      formData: {
        username: {
          label: 'Username',
          value: 'username',
        },
        password: {
          type: 'password',
          label: 'Password',
          value: 'password',
        },
      },
    }
  },
  mounted() {},
  created() {},
  computed: {},
  methods: {
    addUser() {
      console.log('add user')

      this.$store.commit('store/closeModals')
    },
    handleInput(key: any, value: string) {
      // @ts-ignore
      this.formData[key].value = value

      console.log(this.formData)
    },
  },
  watch: {},
})
</script>

<style scoped></style>
