export enum IssueStatus {
  Backlog = 1,
  InProgress = 2,
  Review = 4,
  Done = 8,
}

export default class Issue {
  id = 0;
  userId = 0;
  tags: Array<string> = [];
  type = '';
  title = '';
  description = '';
  status: IssueStatus = IssueStatus.Backlog;
}