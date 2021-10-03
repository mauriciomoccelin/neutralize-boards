import Http from '@/lib/http'
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import LogTime from '@/store/entities/LogTime';

class LogTimeState { 
  loading = false;
  logTimes: Array<LogTime> = new Array<LogTime>();
}

class LogTimeModule implements Module<LogTimeState, any> {
  namespaced = true

  state = new LogTimeState();

  getters: GetterTree<LogTimeState, any> = { }

  actions: ActionTree<LogTimeState, any> = {
    async getLogTimes (context, payload: number) {
      context.commit('setLogTimes', [])
      context.commit('startLoading')
      const response = await Http.get('/logTimes', { params: { issueId: payload } })
      context.commit('stopLoading')

      context.commit('setLogTimes', response.data)
    },
    async newLogTime (context, payload: LogTime) {
      context.commit('startLoading')
      await Http.post('/logTimes', payload)
      context.commit('stopLoading')
      
      context.dispatch('getLogTimes', payload.issueId)
    },
    async updateLogTime (context, payload: LogTime) {
      context.commit('startLoading')
      await Http.put(`/logTimes/${payload.id}`, payload)
      context.commit('stopLoading')

      context.dispatch('getLogTimes', payload.issueId)
    }
  }

  mutations: MutationTree<LogTimeState> =  {
    startLoading(state) {
      state.loading = true
    },
    stopLoading(state) {
      state.loading = false
    },
    setLogTimes(state, payload: Array<LogTime>) {
      state.logTimes = payload || []
    }
  }
}

const module = new LogTimeModule()
export default module;