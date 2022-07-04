<template>
  <v-col>
    <h1>Category Edit</h1>
    <hr class="mb-5" />
    <v-card class="pa-5 px-10">
      <v-form ref="form" :value="false" @submit.prevent="updateCategory">
        <v-row>
          <v-col class="col-12">
            <v-select
              :items="categories"
              :clearable="true"
              v-model="category.category_id"
              item-text="name"
              item-value="id"
              label="Select Main Category"
            >
            </v-select>
          </v-col>
          <v-col class="col-12">
            <v-text-field
              :rules="nameRules"
              v-model="category.name"
              label="Enter Name"
              required
            ></v-text-field>
          </v-col>
          <v-col class="col-12">
            <v-btn type="submit" :disabled="btn_submit" color="primary"
              >Update</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "EditCategory",
  data() {
    return {
      id: this.$route.params.id,
      categories: [],
      category: {
        category_id: "",
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
    this.getCategory();
    this.showCategory();
  },
  methods: {
    async getCategory() {
      let vm = this;
      let categoryApi = await vm.$axios.get("category");
      vm.categories = categoryApi.data.categories;
      console.log(vm.categories);
    },
    async showCategory() {
      let vm = this;
      let categoryApi = await vm.$axios.get("category/" + vm.id);
      vm.category.category_id = categoryApi.data.category.category_id;
      vm.category.name = categoryApi.data.category.name;
    },
    updateCategory() {
      let vm = this;
      if (vm.$refs.form.validate()) {
        vm.btn_submit = true;
        vm.$axios
          .patch("api/category/" + vm.id, vm.category)
          .then(function (res) {
            vm.btn_submit = false;
            if (res.data && res.data.status) {
              vm.$swal("Category Edit", res.data.message, "success").then(
                () => {
                  window.location.href = "/category";
                }
              );
            } else {
              vm.$swal("Category Edit", res.data.message, "error");
            }
          })
          .catch(function (error) {
            vm.btn_submit = false;
            vm.$swal("Category Edit", vm.getErrorText(error), "error");
          });
      }
    },
  },
};
</script>
