<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-form ref="form" @submit.prevent="login">
        <v-card class="logo py-4 d-flex justify-center">
          <VuetifyLogo />
        </v-card>
        <v-card>
          <v-card-title class="headline justify-center">
            Login
          </v-card-title>
          <v-card-text>
            <v-text-field :rules="rules" v-model="form.email" label="Enter Email"></v-text-field>
            <v-text-field type="password" :rules="rules" v-model="form.password" label="Enter Password">
            </v-text-field>
          </v-card-text>
          <v-card-actions class="d-block text-center">
            <v-spacer />

            <v-btn color="primary" type="submit" >
              <v-icon class="mx-1" dark> mdi-login-variant </v-icon>
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Login",
  layout: 'login',
  auth: false,
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      btn_submit: false,
      rules: [
        // (v) => !!v || "This field is required",
      ],
    };
  },
  mounted() {
  },
  methods: {
    login() {
      let vm = this;
      if (vm.$refs.form.validate()) {
        vm.$auth.loginWith('laravelSanctum', {
          data: vm.form
        }).then(function (res){
          window.location.href = '/';
        }).catch(function (error){
          vm.$swal("Login", vm.getErrorText(error), "error");
        })
      }
    }
  },
};
</script>
