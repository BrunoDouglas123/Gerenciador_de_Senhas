<template>
  <v-app dark>
    <v-app-bar fixed app class="text-center" color="yellow">
      <v-toolbar-title style="color: #FF00FF; font-weight: bold !important">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;SPRINGFACE</v-toolbar-title>
    </v-app-bar>
    <v-main style="background-color: #00bfff">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {};
  },
};
</script>

<style>

</style>
