<template>
  <div class="table-container">
    <header class="table-header">
      <div class="table-header__left">
        <template v-if="checkedAmount > 0">
          <p class="table-header__checked-amount">
            {{ checkedAmount }}
            {{ checkedAmount === 1 ? 'rule' : 'rules' }} selected
          </p>
        </template>
        <template v-else>
          <p class="table-header__title">ACL Table</p>
        </template>
      </div>
      <div class="table-header__right">
        <div class="icon-button plus" @click="openAddModal()"></div>
        <div
          v-if="checkedAmount === 1"
          class="icon-button"
          @click="openAddModal(true)"
        >
          <EditIcon />
        </div>
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

          <th v-for="(column, i) in columns" :key="i">
            {{ column.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(acl, i) in user.acl" :key="i">
          <td>
            <Checkbox
              :isChecked="acl.isChecked"
              @check="handleCheckACL(acl.id)"
            />
          </td>
          <td v-for="(column, j) in columns" :key="j">
            {{
              column.property === 'rw'
                ? formatRw(acl[column.property])
                : acl[column.property]
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  SetAddACLData,
  User,
  SelectOption,
  TableColumn,
  Input,
} from '../types/types'
import { rwOptions } from '../data/data'

type Data = {
  rwOptions: SelectOption[]
  checkedAll: boolean
  passwordInput: Input
  editingPassword: boolean
  columns: TableColumn[]
}

export default defineComponent({
  components: {},
  props: {
    user: Object,
  },
  data(): Data {
    return {
      rwOptions,
      checkedAll: false,
      passwordInput: {
        label: 'Password',
        value: '',
      },
      editingPassword: false,
      columns: [
        {
          text: 'ID',
          property: 'id',
        },
        {
          text: 'Topic',
          property: 'topic',
        },
        {
          text: 'Permission',
          property: 'rw',
        },
      ],
    }
  },
  mounted() {},
  created() {},
  computed: {
    checkedAcl() {
      return this.user?.acl ? this.user.acl.filter((acl) => acl.isChecked) : []
    },
    checkedAmount() {
      return this.checkedAcl.length
    },
  },
  methods: {
    formatRw(rwValue: number) {
      return this.rwOptions.find((rw) => rwValue == rw.value)?.label
    },
    openDeleteModal() {
      this.$root.$emit('set-acl-data-to-delete', {
        username: this.user.username,
        ids: this.checkedAcl.map((acl) => acl.id),
      })

      this.$store.commit('store/openModal', 'deleteAcl')
    },
    openAddModal(isEditing: boolean = false) {
      const data: SetAddACLData = {
        isEditing,
        rw: isEditing ? this.checkedAcl[0].rw - 1 : 0,
        topic: isEditing ? this.checkedAcl[0].topic : '',
      }

      if (isEditing) {
        data.id = this.checkedAcl[0].id
      } else {
        data.username = this.user.username
      }

      this.$root.$emit('set-add-acl-data', data)
      this.$store.commit('store/openModal', 'addAcl')
    },
    handleCheckACL(id: number) {
      const acl = this.user.acl.find((acl) => acl.id === id)

      if (!acl) {
        return
      }

      acl.isChecked = !acl.isChecked

      if (this.checkedAll && !acl.isChecked) {
        this.checkedAll = false
      }
    },
    handleCheckAll() {
      this.checkedAll = !this.checkedAll
      this.user.acl.forEach((acl) => {
        acl.isChecked = this.checkedAll
      })
    },
  },
  watch: {},
})
</script>

<style scoped></style>
