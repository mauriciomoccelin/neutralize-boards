<template>
  <v-tabs>
    <!-- eslint-disable -->
    <v-tab key="writer"> Writer </v-tab>
    <v-tab key="preview"> Preview </v-tab>
    <v-tab-item key="writer">
      <v-textarea
        prepend-inner-icon="mdi-book-open"
        :value="value"
        @click:prepend-inner="seeMarkdownDocs"
        @input="update($event)"
      />
    </v-tab-item>
    <v-tab-item key="preview">
      <div class="mt-4" v-html="compiledMarkdown" />
    </v-tab-item>
  </v-tabs>
</template>

<script lang="ts">
import marked from "marked";
import BaseComponent from "@/components/base-component";
import { Debounce } from "vue-debounce-decorator";
import { Prop, Component } from "vue-property-decorator";

@Component
export default class Editor extends BaseComponent {
  @Prop(String) readonly value!: string;

  get compiledMarkdown() {
    const value = this.value || "";
    return marked(value);
  }

  @Debounce(500)
  public update(val: string): void {
    this.$emit("input", val);
  }

  public seeMarkdownDocs(): void {
    window.open("https://www.markdownguide.org/basic-syntax/", "_blank");
  }
}
</script>