type ModalType = 'deleteUser' | 'addUser' | 'addAcl' | 'deleteAcl'

type Modal = {
  isActive: boolean
  [key: string]: any
}

type State = {
  apiUrl: string
  isLoading: boolean
  modals: { [key in ModalType]: Modal }
}

export const state = (): State => ({
  apiUrl: 'http://localhost:5000',
  isLoading: false,
  modals: {
    deleteUser: {
      isActive: false,
    },
    addUser: {
      isActive: false,
    },
    addAcl: {
      isActive: false,
    },
    deleteAcl: {
      isActive: false,
    },
  },
})

export const mutations = {
  setLoading(state: State, boolean: boolean) {
    state.isLoading = boolean
  },
  openModal(state: State, openKey: ModalType) {
    Object.keys(state.modals).forEach((key) => {
      state.modals[key as ModalType].isActive = openKey === key
    })
  },
  closeModals(state: State) {
    Object.keys(state.modals).forEach((key) => {
      state.modals[key as ModalType].isActive = false
    })
  },
}
