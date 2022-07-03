<template>

</template>
<script>

export default {
  name: "Logout",
  async mounted() {
    await this.$auth.logout()
    window.location.href = '/login';
  },
};
</script>
