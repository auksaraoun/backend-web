<template>
  <v-col>
    <v-row>
      <v-col :md="6">
        <h1>Admin Group</h1>
      </v-col>
      <v-col :md="6" class="text-md-right">
        <v-btn class="mx-2" color="primary" :disabled="loading_button" to="/admin-group/create">
          <v-icon dark> mdi-plus </v-icon>
          Add Admin Group
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table :headers="headers" :items="admin_groups.data" :sort-by="'id'" :server-items-length="admin_groups.total"
      :footer-props="{ 'items-per-page-options': row_per_page }" :loading="loading_table" :loading-text="'loading'"
      @update:options="updateFilter">
      <template v-slot:top>
        <v-text-field v-model="filter.search" label="Search" @keyup="updateSearch" single-line hide-details
          class="mx-4 mb-4"></v-text-field>
      </template>
      <template slot="item.row_index" slot-scope="item">
        {{ admin_groups.row_start + item.index + 1 }}
      </template>
      <template slot="item.action" slot-scope="props">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mx-2" fab x-small color="warning" v-bind="attrs" v-on="on" :disabled="loading_button"
              :href="'admin-group/' + props.item.id + '/edit'">
              <v-icon dark> mdi-pencil </v-icon>
            </v-btn>
          </template>
          <span>Edit</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="" fab x-small color="error" v-bind="attrs" v-on="on" :disabled="loading_button"
              @click="deleteAdminGroup(props.item.id)">
              <v-icon dark> mdi-delete </v-icon>
            </v-btn>
          </template>
          <span>Delete</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-col>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "AdminGroup",
  data() {
    return {
      headers: [
        {
          text: "#",
          value: "row_index",
          sortable: false,
        },
        {
          text: "Name",
          value: "name",
        },
        {
          text: "",
          value: "action",
          sortable: false,
        },
      ],
      loading_table: false,
      loading_button: false,
      row_per_page: [10, 25, 50, 100],
      filter: {
        page: 1,
        per_page: 1,
        sortBy: "id",
        sortDesc: "id",
        search: "",
      },
      admin_groups: {},
    };
  },
  mounted() {
    // this.getAdminGroup();
  },
  methods: {
    updateSearch() {
      this.getAdminGroup();
    },
    updateFilter(filter) {
      let vm = this;
      vm.filter.page = filter.page;
      vm.filter.per_page = filter.itemsPerPage;
      vm.filter.sortBy = filter.sortBy[0];
      vm.filter.sortDesc = filter.sortDesc[0] ? "desc" : "asc";
      vm.getAdminGroup();
    },
    updatePerPage(per_page) {
      this.filter.per_page = per_page;
    },
    getAdminGroup() {
      let vm = this;
      vm.loading_table = true;
      vm.$axios.get("api/admin-group", {
        params: vm.filter,
      }).then((res) => {
        vm.loading_table = false;
        vm.admin_groups = res.data.admin_groups;
        vm.admin_groups.row_start =
          (vm.admin_groups.current_page - 1) * vm.admin_groups.per_page;
        vm.loading_table = false;
      }).catch(function (error) {
        vm.loading_table = false;
        vm.$swal(
          "Get Admin Group",
          vm.getErrorText(error),
          "error"
        );
      });
    },
    deleteAdminGroup(admin_group_id) {
      let vm = this;
      vm.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            vm.loading_button = true;
            vm.$axios
              .delete("api/admin-group/" + admin_group_id)
              .then(function (res) {
                vm.loading_button = false;
                if (res.data && res.data.status) {
                  vm.$swal("Admin Group Delete", res.data.message, "success").then(
                    () => {
                      vm.getAdminGroup();
                    }
                  );
                } else {
                  vm.$swal("Admin Group Delete", res.data.message, "error");
                }
              })
              .catch(function (error) {
                vm.loading_button = false;
                vm.$swal(
                  "Admin Group Delete",
                  vm.getErrorText(error),
                  "error"
                );
              });
          }
        });
    },
  },
};
</script>
