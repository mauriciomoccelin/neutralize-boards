import Http from '@/lib/http'
import { IssueStatus } from '@/store/entities/Issue';
import Tags from '@/store/entities/Tags';
import User from '@/store/entities/User';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

class SharedState { 
  loading = false;
  tags: Array<Tags> = new Array<Tags>();
  users: Array<User> = new Array<User>();
  issueStatus: Array<IssueStatus> = new Array<IssueStatus>();
}

class SharedModule implements Module<SharedState, any> {
  namespaced = true
  modules = { }

  state = new SharedState();

  getters: GetterTree<SharedState, any> = { }

  actions: ActionTree<SharedState, any> = {
    async getUsers (context) { 
      context.commit('startLoading')
      const response = await Http.get('/users')
      context.commit('stopLoading')

      context.commit('loadedUsers', response.data)
    },
    async getTags (context) { 
      context.commit('startLoading')
      const response = await Http.get('/tags')
      context.commit('stopLoading')

      context.commit('loadedTags', response.data)
    },
    async getIssueStatus (context) { 
      context.commit('startLoading')
      const response = await Http.get('/issueStatus')
      context.commit('stopLoading')

      context.commit('loadedIssueStatus', response.data)
    }
  }

  mutations: MutationTree<SharedState> =  {
    startLoading(state) {
      state.loading = true
    },
    stopLoading(state) {
      state.loading = false
    },
    loadedUsers(state, payload) {
      state.users = payload || [] as Array<User>
    },
    loadedTags(state, payload) {
      state.tags = payload || [] as Array<Tags>
    },
    loadedIssueStatus(state, payload) {
      state.issueStatus = payload || [] as Array<IssueStatus>
    }
  }
}

const module = new SharedModule()
export default module