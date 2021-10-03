import Http from '@/lib/http'
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import Board from '@/store/entities/Board';

import IssueModule from '@/store/modules/boards/issues'
import LogTimeModule from '@/store/modules/boards/log-time'

class BoardState { 
  loading = false;
  boards: Array<Board> = new Array<Board>();
}

class BoardModule implements Module<BoardState, any> {
  namespaced = true
  modules = {
    issue: IssueModule,
    logTime: LogTimeModule
  }

  state = new BoardState();

  getters: GetterTree<BoardState, any> = { }

  actions: ActionTree<BoardState, any> = {
    async getBoard (context) {
      
      context.commit('startLoading')
      const response = await Http.get('/boards')
      context.commit('stopLoading')

      context.commit('loadedBoards', response.data)
    }
  }

  mutations: MutationTree<BoardState> =  {
    startLoading(state) {
      state.loading = true
    },
    stopLoading(state) {
      state.loading = false
    },
    loadedBoards(state, payload: Array<Board>) {
      state.boards = payload || [] as Array<Board>
    }
  }
}

const module = new BoardModule()
export default module