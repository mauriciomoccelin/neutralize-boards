import Vue from 'vue';
import Component from 'vue-class-component'

export type VForm = Vue & {
  reset: () => void;
  validate: () => boolean;
}

@Component
export default class BaseComponent extends Vue {
  private valid = false

  get $form(): VForm {
    return this.$refs.form as VForm
  }

  get mobile (): boolean {
    return this.$vuetify.breakpoint.mobile
  }
}
