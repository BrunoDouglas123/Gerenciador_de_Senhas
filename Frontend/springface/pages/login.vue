<template>
  <v-card
    class="mx-auto pa-15 mt-15 text-center form"
    max-width="800"
    elevation="10"
  >
    <v-alert type="error" class="mb-10" v-if="error"
      >Credenciais Erradas</v-alert
    >
    <v-form ref="form" v-model="valid" lazy-validation class="mb-10">
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Username"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[passwordRules.required]"
        :type="show1 ? 'text' : 'password'"
        style="font-weight: bold"
        name="input-10-1"
        class="mt-4"
        label="Password"
        @click:append="show1 = !show1"
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="yellow"
        style="color: #00bfff"
        class="mr-4 mt-10"
        @click="auth"
      >
        Login
      </v-btn>
    </v-form>
    <NuxtLink to="/cadastro" style="color: yellow">
      Cadastrar Novo Usuario
    </NuxtLink>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    error: false,
    show1: false,
    valid: true,
    name: "",
    nameRules: [(v) => !!v || "Name is required"],
    password: "",
    passwordRules: {
      required: (value) => !!value || "Required.",
    },
  }),

  watch: {
    error(val) {
      if (val === true) {
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    },
  },

  methods: {
    async auth() {
      if (this.name && this.password) {
        await this.$axios
          .$post("/login", { username: this.name, password: this.password })
          .then((res) => {
            this.$store.commit("setUser", res.token);
            localStorage.setItem("token", res.token);
            this.$router.push({ name: "index" });
          })
          .catch((data) => {
            this.error = true;
          });
      } else {
        this.$refs.form.validate();
      }
    },
  },
};
</script>

<style scoped>

.form {
  background-color: #00bfff;
  position: relative;
  top: 40px;
  border-radius: 35px;
  transition: 0.5s;
}

.form:hover {
  transform: scale(1.1);
}

</style>
