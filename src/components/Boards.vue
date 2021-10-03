<template>
  <v-container fluid>
    <v-progress-linear
      top
      absolute
      color="primary"
      :active="loading"
      :indeterminate="loading"
    />
    <v-row class="pa-0 ma-0">
      <v-col
        key="Backlog"
        cols="12"
        sm="12"
        md="12"
        xl="3"
        lg="3"
      >
        <v-row>
          <v-col cols="10">
            <p class="headline">
              Backlog
            </p>
          </v-col>
          <v-col cols="2">
            <issue-form />
          </v-col>
        </v-row>
        <v-row class="pa-0 ma-0">
          <v-spacer />
          <issue-card
            v-for="issue in backlogIssues"
            :key="issue.id"
            :value="issue"
          />
        </v-row>
      </v-col>

      <v-col
        key="InProgress"
        cols="12"
        sm="12"
        md="12"
        xl="3"
        lg="3"
      >
        <v-row>
          <v-col cols="10">
            <p class="headline">
              In Progress
            </p>
          </v-col>
        </v-row>
        <v-row class="pa-0 ma-0">
          <v-spacer />
          <issue-card
            v-for="issue in inProgressIssues"
            :key="issue.id"
            :value="issue"
          />
        </v-row>
      </v-col>

      <v-col
        key="Review"
        cols="12"
        sm="12"
        md="12"
        xl="3"
        lg="3"
      >
        <v-row>
          <v-col cols="10">
            <p class="headline">
              Review
            </p>
          </v-col>
        </v-row>
        <v-row class="pa-0 ma-0">
          <v-spacer />
          <issue-card
            v-for="issue in reviewIssues"
            :key="issue.id"
            :value="issue"
          />
        </v-row>
      </v-col>

      <v-col
        key="Done"
        cols="12"
        sm="12"
        md="12"
        xl="3"
        lg="3"
      >
        <v-row>
          <v-col cols="10">
            <p class="headline">
              Done
            </p>
          </v-col>
        </v-row>
        <v-row class="pa-0 ma-0">
          <issue-card
            v-for="issue in doneIssues"
            :key="issue.id"
            :value="issue"
          />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import { createNamespacedHelpers } from "vuex";
import IssueForm from "./IssueForm.vue";
import IssueCard from "./IssueCard.vue";
import BaseComponent from "@/components/base-component";

import { Component } from "vue-property-decorator";
import Tags from "@/store/entities/Tags";
import User from "@/store/entities/User";
import Issue, { IssueStatus } from "@/store/entities/Issue";

const boardModule = createNamespacedHelpers("boards");
const sharedModule = createNamespacedHelpers("shared");
const issueModule = createNamespacedHelpers("boards/issue");

interface GetIssueStatus {
  text: string;
  value: string;
}

@Component({
  name: "Boards",
  components: {
    IssueForm,
    IssueCard,
    draggable,
  },
  computed: {
    ...boardModule.mapState(["loading", "boards"]),
    ...issueModule.mapState(["loading", "issues"]),
  },
  methods: {
    ...boardModule.mapActions(["getBoard"]),
    ...issueModule.mapActions(["getIssues"]),
    ...sharedModule.mapActions(["getUsers", "getTags", "getIssueStatus"]),
  },
})
export default class Board extends BaseComponent {
  public getTags!: () => Promise<Tags>;
  public getUsers!: () => Promise<User>;
  public getBoard!: () => Promise<Board>;
  public getIssues!: () => Promise<Array<Issue>>;
  public getIssueStatus!: () => Promise<GetIssueStatus>;

  public issues!: Array<Issue>;

  get backlogIssues(): Array<Issue> {
    return this.issues?.filter((x) => x.status === IssueStatus.Backlog);
  }
  set backlogIssues(val: Array<Issue>) {
    console.log(val);
  }

  get inProgressIssues(): Array<Issue> {
    return this.issues?.filter((x) => x.status === IssueStatus.InProgress);
  }
  set inProgressIssues(val: Array<Issue>) {
    console.log(val);
  }

  get reviewIssues(): Array<Issue> {
    return this.issues?.filter((x) => x.status === IssueStatus.Review);
  }
  set reviewIssues(val: Array<Issue>) {
    console.log(val);
  }

  get doneIssues(): Array<Issue> {
    return this.issues?.filter((x) => x.status === IssueStatus.Done);
  }
  set doneIssues(val: Array<Issue>) {
    console.log(val);
  }

  public async mounted() {
    await Promise.all([
      this.getTags(),
      this.getUsers(),
      this.getBoard(),
      this.getIssues(),
      this.getIssueStatus(),
    ]);
  }
}
</script>