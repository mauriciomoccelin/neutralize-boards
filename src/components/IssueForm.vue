<template>
  <v-row :justify="editing ? 'start' : 'end'">
    <v-btn
      v-if="!editing"
      fab
      dark
      small
      class="mx-2"
      color="primary"
      @click.stop="dialog = true"
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>

    <v-btn
      v-else
      slot="activator"
      icon
      class="ml-2"
      transition="dialog-bottom-transition"
      hide-overlay
      @click.stop="dialog = true"
    >
      <v-icon>mdi-clipboard-edit</v-icon>
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="800"
      :fullscreen="mobile"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="close"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>
            {{
              editing ? "Editing Task" : "New Task"
            }}
          </v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="save"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
          >
            <v-autocomplete
              v-model="model.userId"
              label="Users"
              :items="users"
              item-value="id"
              item-text="name"
              chips
            />
            <v-autocomplete
              v-model="model.tags"
              label="Tags"
              multiple
              item-value="id"
              item-text="name"
              :items="tags"
              chips
            />
            <v-autocomplete
              v-model="model.status"
              label="Issue Status"
              :items="issueStatus"
              chips
            />
            <v-text-field
              v-model="model.title"
              :counter="255"
              label="Title"
            />
            <editor v-model="model.description" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="warning"
            icon
            @click="reset"
          >
            <v-icon dark>
              mdi-backspace
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Editor from "@/components/Editor.vue";
import BaseComponent from "@/components/base-component";
import { Prop, Watch, Component } from "vue-property-decorator";

import User from "@/store/entities/User";
import Tags from "@/store/entities/Tags";
import Issue, { IssueStatus } from "@/store/entities/Issue";

import { createNamespacedHelpers } from "vuex";

const sharedModule = createNamespacedHelpers("shared");
const issueModule = createNamespacedHelpers("boards/issue");

@Component({
  components: {
    Editor,
  },
  computed: {
    ...sharedModule.mapState(["tags", "users", "issueStatus"]),
  },
  methods: {
    ...issueModule.mapActions(["newIssue", "updateIssue"]),
  },
})
export default class IssueForm extends BaseComponent {
  @Prop(Boolean) editing!: boolean;
  @Prop({ type: Object, default: () => new Issue() }) readonly value!: Issue;

  private dialog = false;
  private model = new Issue();

  private tags!: Array<Tags>;
  private users!: Array<User>;
  private issueStatus!: Array<IssueStatus>;

  public getTags!: () => Promise<any>;
  public getUsers!: () => Promise<any>;

  public newIssue!: (issue: Issue) => Promise<any>;
  public updateIssue!: (issue: Issue) => Promise<any>;

  @Watch("dialog")
  public async dialogChange(val: boolean) {
    if (val && this.editing) {
      this.$set(this, "model", Object.assign({}, this.value));
    } else {
      this.$set(this, "model", new Issue());
    }
  }

  public reset(): void {
    this.$form.reset();
  }

  public close(): void {
    this.dialog = false;
    this.$nextTick(() => (this.model = new Issue()));
  }

  public async save(): Promise<any> {
    if (this.$form.validate()) {
      this.value.id === 0
        ? await this.newIssue(this.model)
        : await this.updateIssue(this.model);

      this.close();
    }
  }
}
</script>