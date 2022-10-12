<template>
  <v-card
    class="mx-auto pa-15 mt-15 text-center"
    max-width="800"
    elevation="10"
  >
    <v-form
      ref="form"
      v-model="valid"
      class="mb-10"
      lazy-validation
    >
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
        name="input-10-1"
        class="mt-4"
        label="Password"
        @click:append="show1 = !show1"
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="warning"
        class="mr-4 mt-8"
        @click="register"
      >
        Cadastrar Usuario
      </v-btn>
    </v-form>
    <NuxtLink to="/login" style="color: green;">
      Logar com uma Conta Existente
    </NuxtLink>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      show1: false,
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      password: '',
      passwordRules: {
        required: value => !!value || 'Required.',
      },
    }),

    methods: {
      async register () {
        if (this.name && this.password){
          await this.$axios.$post('/user', { username: this.name, password: this.password })
          .then((res) => {
            if (res.msg){
              this.$router.push({ name: 'login' })
            }
          })
        }else{
          this.$refs.form.validate()
        }
      },
    },
  }
</script>