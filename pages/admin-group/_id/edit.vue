<template>
  <v-col>
    <h1>Admin Group Edit</h1>
    <hr class="mb-5" />
    <v-card class="pa-5 px-10">
      <v-form ref="form" :value="false" @submit.prevent="updateAdminGroup">
        <v-row>
          <v-col class="col-12">
            <v-text-field :rules="nameRules" v-model="admin_group.name" label="Enter Name" required></v-text-field>
          </v-col>
          <v-col class="col-12">
            <v-btn type="submit" :disabled="btn_submit" color="primary">Update</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "EditAdminGroup",
  data() {
    return {
      id: this.$route.params.id,
      categories: [],
      admin_group: {
        name: "",
      },
      btn_submit: false,
      nameRules: [
        (v) => !!v || "Name is required",
        // (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
    };
  },
  created() {
    this.showAdminGroup();
  },
  methods: {
    async showAdminGroup() {
      let vm = this;
      let admin_groupApi = await vm.$axios.get("api/admin-group/" + vm.id);
      vm.admin_group.admin_group_id = admin_groupApi.data.admin_group.admin_group_id;
      vm.admin_group.name = admin_groupApi.data.admin_group.name;
    },
    updateAdminGroup() {
      let vm = this;
      if (vm.$refs.form.validate()) {
        vm.btn_submit = true;
        vm.$axios
          .patch("api/admin-group/" + vm.id, vm.admin_group)
          .then(function (res) {
            vm.btn_submit = false;
            if (res.data && res.data.status) {
              vm.$swal("AdminGroup Edit", res.data.message, "success").then(
                () => {
                  window.location.href = "/admin-group";
                }
              );
            } else {
              vm.$swal("AdminGroup Edit", res.data.message, "error");
            }
          })
          .catch(function (error) {
            vm.btn_submit = false;
            vm.$swal("AdminGroup Edit", vm.getErrorText(error), "error");
          });
      }
    },
  },
};
</script>
