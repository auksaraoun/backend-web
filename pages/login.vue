<template>
  <v-col>
    <h1>Login</h1>
    <hr class="mb-5" />
    <v-card class="pa-5 px-10">
      <v-form ref="form" :value="false" @submit.prevent="login">
        <v-row>
          <v-col class="col-12">
            <!-- <v-text-field :rules="rules" v-model="form.email" label="Enter Email" required></v-text-field> -->
          </v-col>
          <v-col class="col-12">
            <!-- <v-text-field :rules="rules" v-model="form.password" label="Enter Password" required></v-text-field> -->
          </v-col>
          <v-col class="col-12">
            <v-btn type="submit" :disabled="btn_submit" color="primary">LOGIN</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "admin@mail.com",
        password: "123456",
      },
      btn_submit: false,
      rules: [
        (v) => !!v || "This field is required",
      ],
    };
  },
  mounted() {
  },
  methods: {
    login() {
      let vm = this;
      if (vm.$refs.form.validate()) {
        this.$auth.loginWith('laravelSanctum', {
          data: vm.form
        }).then(function (res){
        })
      }
    }
  },
};
</script>
