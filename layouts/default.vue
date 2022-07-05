<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <div v-for="(item, i) in items" :key="i">
          <v-list-item v-if="!item.subLinks" :to="item.to" router>

            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>

          </v-list-item>

          <v-list-group v-else color="white" :value="match(['admin','admin-group'])" prepend-icon="mdi-account-circle">

            <template v-slot:activator>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </template>

            <v-list-item v-for="(sub_item, index) in item.subLinks" :key="index" :to="sub_item.to" router>
              <v-list-item-action>
                <v-icon>{{ sub_item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="sub_item.title" />
              </v-list-item-content>
            </v-list-item>

          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="title" />
      <!-- <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Admin",
          to: "#",
          subLinks: [
            {
              icon: "",
              title: 'Admin',
              to: '/admin',
            },
            {
              icon: "",
              title: 'Admin Group',
              to: '/admin-group',
            },
          ]
        },
        {
          icon: "mdi-format-list-bulleted",
          title: "Category",
          to: "/category",
        },
        {
          icon: "mdi-logout",
          title: "Logout",
          to: "/logout",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Admin Shop",
    };
  },
  methods: {
    match(subLinks) {
      let vm = this;
      let path_name = vm.$router.currentRoute.fullPath.split('/')[1];
      console.log(path_name);
      return subLinks.includes(path_name);
    }
  }
};
</script>
