<template>
  <v-card
    class="task-card mx-auto mt-2"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          {{ value.type }}
        </div>
        <v-list-item-title class="headline mb-1">
          {{ value.title }}
        </v-list-item-title>
        <v-list-item-subtitle>{{ value.description }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      />
    </v-list-item>
    <v-card-actions>
      <log-time :value="value" />
      <issue-form
        editing
        :value="value"
      />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Prop, Component } from "vue-property-decorator";

import LogTime from "@/components/LogTime.vue";
import IssueForm from "@/components/IssueForm.vue";
import BaseComponent from "@/components/base-component";
import Issue from "@/store/entities/Issue";

@Component({
  components: {
    LogTime,
    IssueForm,
  },
})
export default class IssueCard extends BaseComponent {
  @Prop(Object) readonly value!: Issue;
}
</script>

<style>
.task-card {
  width: 100% !important;
}
</style>