import { SelectOption } from '~/types/types'

export const rwOptions: SelectOption[] = [
  {
    label: 'Read only',
    value: 1,
  },
  {
    label: 'Write only',
    value: 2,
  },
  {
    label: 'Read and write',
    value: 3,
  },
  {
    label: 'Subscribe',
    value: 4,
  },
]

export const roleOptions: SelectOption[] = [
  {
    label: 'User',
    value: 'user',
  },
  {
    label: 'Admin',
    value: 'admin',
  },
]
