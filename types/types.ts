export type SelectOption = {
  label: string
  value: string | number
}

export type Input = {
  label?: string
  value: string
}

export type TableColumn = {
  text: string
  property: string
}

export type SetAddACLData = {
  username?: string
  id?: number
  isEditing: boolean
  topic: string
  rw: number
}

export type ACL = {
  id: number
  username: string
  topic: string
  rw: number
}

export type User = {
  id: number
  username: string
  role: 'admin' | 'user'
}

export type UserDetail = User & {
  acl: ACL[]
}
