<template>
  <Modal
    className="modal--add-acl"
    :isActive="isActive"
    :title="isEditing ? 'Edit ACL' : 'Add ACL'"
  >
    <form @submit="addACL($event)">
      <Input
        :label="topic.label"
        :value="topic.value"
        :inputAttrs="{
          type: topic.type,
          minlength: 1,
          maxlength: 100,
          required: true,
        }"
        @input="topic.value = $event.target.value"
      />
      <Select
        label="Permission"
        :options="rwOptions"
        :selectedOptionIndex="rwSelectedIndex"
        @select="rwSelectedIndex = $event"
      />
      <Button :buttonAttrs="{ type: 'submit' }">{{
        isEditing ? 'Edit' : 'Add'
      }}</Button>
    </form>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { rwOptions } from '../../data/data'
import { SetAddACLData, ACL, SelectOption, Input } from '../../types/types'

type Data = {
  isEditing: boolean
  username: string
  id: number | null
  rwOptions: SelectOption[]
  rwSelectedIndex: number
  topic: Input
}

export default defineComponent({
  components: {},
  props: {
    isActive: Boolean,
  },
  data(): Data {
    return {
      isEditing: false,
      username: '',
      id: null,
      rwOptions,
      rwSelectedIndex: 0,
      topic: {
        label: 'Topic',
        value: '',
      },
    }
  },
  mounted() {
    this.$root.$on('set-add-acl-data', (data: SetAddACLData) => {
      const { isEditing, username, id, topic, rw } = data

      this.isEditing = isEditing
      this.username = username
      this.id = id
      this.topic.value = topic
      this.rwSelectedIndex = rw
    })
  },
  created() {},
  computed: {},
  methods: {
    async addACL(e) {
      e.preventDefault()
      this.$store.commit('store/setLoading', true)

      try {
        const acl: Partial<ACL> = {
          topic: this.topic.value,
          rw: this.rwOptions[this.rwSelectedIndex].value,
        }

        if (this.isEditing) {
          acl.id = this.id
          await this.$axios.put(
            `${this.$store.state.store.apiUrl}/api/acl`,
            acl
          )
        } else {
          acl.username = this.username
          await this.$axios.post(
            `${this.$store.state.store.apiUrl}/api/acl`,
            acl
          )
        }

        this.$store.commit('store/setLoading', false)
        this.$store.commit('store/closeModals')
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
