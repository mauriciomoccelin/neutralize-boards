import Http from '@/lib/http'
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import Issue from '@/store/entities/Issue';


class IssueState { 
  loading = false;
  issues: Array<Issue> = new Array<Issue>();
}

class IssueModule implements Module<IssueState, any> {
  namespaced = true

  state = new IssueState();

  getters: GetterTree<IssueState, any> = { }

  actions: ActionTree<IssueState, any> = {
    async getIssues (context) {
      context.commit('startLoading')
      const response = await Http.get('/issues')
      context.commit('stopLoading')

      context.commit('addIssues', response.data)
    },
    async newIssue (context, payload: Issue) {
      context.commit('startLoading')
      const response = await Http.post('/issues', payload)
      context.commit('stopLoading')

      context.commit('addIssue', response.data)
    },
    async updateIssue (context, payload: Issue) {
      context.commit('startLoading')
      const response = await Http.put(`/issues/${payload.id}`, payload)
      context.commit('stopLoading')

      context.commit('updateIssue', response.data)
    }
  }

  mutations: MutationTree<IssueState> =  {
    startLoading(state) {
      state.loading = true
    },
    stopLoading(state) {
      state.loading = false
    },
    addIssues(state, payload: Array<Issue>) {
      state.issues = payload || [] as Array<Issue>
    },
    addIssue(state, payload: Issue) {
      state.issues.push(payload)
    },
    updateIssue(state, payload: Issue) {
      const index = state.issues.findIndex(x => x.id === payload.id)
      state.issues[index] = payload
      state.issues = Object.assign([], state.issues as Issue[])
    }
  }
}

const module = new IssueModule()
export default module;