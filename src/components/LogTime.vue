<template>
  <div>
    <v-btn
      slot="activator"
      icon
      rounded
      class="ml-2"
      transition="dialog-bottom-transition"
      hide-overlay
      @click.stop="dialog = true"
    >
      <v-icon>mdi-briefcase-clock</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      scrollable
      :fullscreen="mobile"
      class="dialog"
      max-heigth="400"
      max-width="400"
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
            Log Time
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

        <v-card-text class="pa-0 ma-0">
          <v-tabs
            v-model="tab"
            fixed-tabs
            class="pa0 ma0"
          >
            <v-tab key="log">
              Log
            </v-tab>
            <v-tab key="history">
              History
            </v-tab>
            <v-tab-item
              key="log"
              class="pa-2 ma-2"
            >
              <v-form
                ref="form"
                v-model="valid"
              >
                <v-row
                  justify="space-around"
                  align="center"
                >
                  <v-col cols="12">
                    <v-text-field
                      v-model="model.start"
                      label="Início"
                      type="time"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="model.end"
                      label="Início"
                      type="time"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="model.description"
                      name="input-7-1"
                      label="Optional description"
                    />
                  </v-col>
                </v-row>
              </v-form>
            </v-tab-item>
            <v-tab-item
              key="history"
              class="pa-2 ma-2"
            >
              <v-list flat>
                <v-list-item-group
                  color="primary"
                  class="text-center"
                >
                  <v-progress-circular
                    v-if="loading"
                    :loading="loading"
                    :indeterminate="loading"
                  />
                  <v-list-item
                    v-for="(item, i) of logTimes"
                    v-else
                    :key="i"
                  >
                    <v-list-item-icon>
                      <v-btn
                        fab
                        icon
                        small
                        color="primary"
                        @click="editLogTime(item)"
                      >
                        <v-icon dark>
                          mdi-clock
                        </v-icon>
                      </v-btn>
                    </v-list-item-icon>
                    <v-list-item-content class="text-left">
                      <v-list-item-title>
                        {{
                          item.description
                        }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{
                          item.start + " " + item.end
                        }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-tab-item>
          </v-tabs>
        </v-card-text>
        <v-card-actions class="pa-0 ma-0">
          <v-spacer />
          <v-btn
            color="warning"
            icon
            class="pa-2 ma-2"
            @click="reset"
          >
            <v-icon dark>
              mdi-backspace
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import BaseComponent from "@/components/base-component";

import Issue from "@/store/entities/Issue";
import LogTime from "@/store/entities/LogTime";

import { Prop, Component, Watch } from "vue-property-decorator";
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions } = createNamespacedHelpers("boards/logTime");

@Component({
  computed: {
    ...mapState(["loading", "logTimes"]),
  },
  methods: {
    ...mapActions(["getLogTimes", "newLogTime", "updateLogTime"]),
  },
})
export default class Log extends BaseComponent {
  @Prop(Object) readonly value!: Issue;
  @Prop(Boolean) readonly editing!: boolean;

  private tab = 0;
  private dialog = false;
  private model = new LogTime();

  public newLogTime!: (payload: LogTime) => Promise<any>;
  public updateLogTime!: (payload: LogTime) => Promise<any>;
  public getLogTimes!: (payload: number) => Promise<Array<LogTime>>;

  public editLogTime(logTime: LogTime): void {
    this.$set(this, "model", Object.assign({}, logTime));
    this.tab = 2;
  }

  public async save(): Promise<any> {
    if (this.$form.validate()) {
      this.model.issueId = this.value.id;
      this.model.id === 0
        ? await this.newLogTime(this.model)
        : await this.updateLogTime(this.model);
      this.model = new LogTime();
    }
  }

  public reset(): void {
    this.$form.reset();
  }

  public close(): void {
    this.dialog = false;
    this.$nextTick(() => (this.model = new LogTime()));
  }

  @Watch("dialog")
  public async dialogChange(val: boolean) {
    val && (await this.getLogTimes(this.value.id));
  }
}
</script>

<style scoped>
.dialog {
  max-height: 600px !important;
}
</style>