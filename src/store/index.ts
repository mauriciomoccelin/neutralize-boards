import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import BoardModule from '@/store/modules/boards'
import SharedModule from '@/store/modules/shared'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    boards: BoardModule,
    shared: SharedModule
  }
})
