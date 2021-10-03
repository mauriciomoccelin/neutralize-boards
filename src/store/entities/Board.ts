import Issue from '@/store/entities/Issue'

export default class Board {
  title = '';
  issues: Array<Issue> = []
}