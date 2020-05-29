<template>
  <q-page padding>
    <UserProfileView/>
  </q-page>
</template>

<script>
  import UserProfileView from "components/UserProfileView";

  export default {
    name: 'UserProfilePage',
    components: {UserProfileView}
  }
</script>
