<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
      class="text-center"
    >
     <v-toolbar-title> PASSWORD CRYPTOR</v-toolbar-title>
    <v-spacer></v-spacer>
      <v-btn icon class="mr-8" @click="logout">
        Logout
        <v-icon>mdi-arrow-right-bold</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer app >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
    }
  },
  methods: {
    logout(){
      localStorage.removeItem('token')
      this.$store.commit('setUser', null)
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
