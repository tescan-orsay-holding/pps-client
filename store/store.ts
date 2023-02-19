type ModalType = 'deleteUser' | 'addUser'

type Modal = {
  isActive: boolean
}

type State = {
  modals: { [key in ModalType]: Modal }
}

export const state = (): State => ({
  modals: {
    deleteUser: {
      isActive: false,
    },
    addUser: {
      isActive: false,
    },
  },
})

export const mutations = {
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

//   export const getters = {
//     getCounter(state: State) {
//       return state.counter
//     }
//   }

//   export const mutations = {
//     increment(state) {
//       state.counter++
//     }
//   }

//   export const actions = {
//     async fetchCounter({ state }) {
//       // make request
//       const res = { data: 10 };
//       state.counter = res.data;
//       return res.data;
//     }
//   }
