import Vue from 'vue'

const mixin = {
  methods: {
    getErrorText(error) {
      let msg = '';
      if (error.response && error.response.data && error.response.data.errors) {
        for (let i in error.response.data.errors) {
          msg += error.response.data.errors[i].join(' ') + '<br>';
        }
      } else if (error.response && error.response.data.message) {
        msg = error.response.data.message
      } else {
        msg = 'System error'
      }
      return msg;
    }
  }
}

Vue.mixin(mixin)
