<template>
  <v-col>
    <h1>Admin Group Add</h1>
    <hr class="mb-5" />
    <v-card class="pa-5 px-10">
      <v-form ref="form" :value="false" @submit.prevent="storeAdminGroup">
        <v-row>
          <v-col class="col-12">
            <v-text-field :rules="nameRules" v-model="admin_group.name" label="Enter Name" required></v-text-field>
          </v-col>
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
  name: "CreateAdminGroup",
  data() {
    return {
      id: this.$route.params.id,
      categories: [],
      admin_group: {
        admin_group_id: "",
        name: "",
      },
      btn_submit: false,
      nameRules: [
        (v) => !!v || "Name is required",
        // (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
    };
  },
  mounted() {
  },
  methods: {
    storeAdminGroup() {
      let vm = this;
      if (vm.$refs.form.validate()) {
        vm.btn_submit = true;
        vm.$axios
          .post("api/admin-group", vm.admin_group)
          .then(function (res) {
            vm.btn_submit = false;
            if (res.data && res.data.status) {
              vm.$swal("Admin Group Create", res.data.message, "success").then(
                () => {
                  window.location.href = "/admin-group";
                }
              );
            } else {
              vm.$swal("Admin Group Create", res.data.message, "error");
            }
          })
          .catch(function (error) {
            vm.btn_submit = false;
            vm.$swal("Admin Group Create", vm.getErrorText(error), "error");
          });
      }
    },
  },
};
</script>
