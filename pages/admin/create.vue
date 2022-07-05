<template>
  <v-col>
    <h1>Admin</h1>
    <hr class="mb-5" />
    <v-card class="pa-5 px-10">
      <v-form ref="form" :value="false" @submit.prevent="storeAdmin">
        <v-row>
          <v-col class="col-6">
            <v-select :items="admin_groups" :clearable="true" v-model="admin.admin_group_id" item-text="name"
              item-value="id" label="Select Group">
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-6">
            <v-text-field v-model="admin.name" label="Enter Name"></v-text-field>
          </v-col>
          <v-col class="col-6">
            <v-text-field v-model="admin.phone" label="Enter Phone"></v-text-field>
          </v-col>
          <v-col class="col-6">
            <v-text-field :rules="emailRules" v-model="admin.email" label="Enter Email"></v-text-field>
          </v-col>
          <v-col class="col-6">
            <v-text-field type="password" :rules="passwordRules" v-model="admin.password" label="Enter Password">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12">
            <v-btn type="submit" :disabled="btn_submit" color="primary">Create</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "CreateAdmin",
  data() {
    return {
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      admin_groups: [],
      admin: {
        admin_group_id: "",
        name: "",
        email: "",
        phone: "",
        password: "",
      },
      btn_submit: false,
      nameRules: [
        (v) => !!v || "Name is required",
        // (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
    };
  },
  created() {
    this.getAdminGroup();
  },
  methods: {
    async getAdminGroup(){
      let vm = this;
      let adminGroupApi = await vm.$axios.get("api/admin-group");
      vm.admin_groups = adminGroupApi.data.admin_groups;
    },
    storeAdmin() {
      let vm = this;
      if (vm.$refs.form.validate()) {
        vm.btn_submit = true;
        vm.$axios
          .post("api/admin", vm.admin)
          .then(function (res) {
            vm.btn_submit = false;
            if (res.data && res.data.status) {
              vm.$swal("Admin Create", res.data.message, "success").then(
                () => {
                  window.location.href = "/admin";
                }
              );
            } else {
              vm.$swal("Admin Create", res.data.message, "error");
            }
          })
          .catch(function (error) {
            vm.btn_submit = false;
            vm.$swal("Admin Create", vm.getErrorText(error), "error");
          });
      }
    },
  },
};
</script>
