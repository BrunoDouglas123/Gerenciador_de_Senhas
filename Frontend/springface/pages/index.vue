<template>
  <v-data-table
    :headers="headers"
    :items="passwords"
    :search="search"
    sort-by="url"
    class="elevation-1 mt-15"
  >
    <v-alert type="error" class="mb-10" v-if="error">Credenciais Erradas</v-alert>
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Senhas</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          persistent
          max-width="1000px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Adicionar Senha
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                class="mb-10"
              >
                <v-container>
                  <v-row>

                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          :readonly="readonly"
                          :rules="[Rules.required]"
                          v-model="editedItem.url"
                          label="Site (url)"
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          :readonly="readonly"
                          v-model="editedItem.username"
                          label="Username"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          :readonly="readonly"
                          v-model="editedItem.description"
                          label="Descrição"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          :readonly="readonly"
                          v-model="editedItem.password"
                          :rules="[Rules.required]"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Password"
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                  </v-row>
                </v-container>
              </v-form>  
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                :disabled="readonly"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5 text-center">Deseja Deletar Esta Senha?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- eslint-disable-next-line -->
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        color="blue"
        @click="viewItem(item)"
      >
        mdi-eye
      </v-icon>
      <v-icon
        small
        class="mr-2"
        color="orange darken-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        color="red darken-2"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      Nenhuma Senha Cadastrada
    </template>
  </v-data-table>
</template>

<script>
  export default {
    name: 'IndexPage',
    layout: 'dash',
    data: () => ({
      show1: false,
      search: '',
      dialog: false,
      valid: true,
      dialogDelete: false,
      headers: [
        { text: 'Site (url)', value: 'url', },
        { text: 'Username', value: 'username' },
        { text: 'Descrição', value: 'description' },
        { text: 'Senha', value: 'password' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      passwords: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        url: '',
        username: '',
        description: '',
        password: '',
      },
      defaultItem: {
        id: null,
        url: '',
        username: '',
        description: '',
        password: '',
      },
      Rules: {
        required: value => !!value || 'Campo Requerido !',
      },
      error: false,
      readonly: false,
    }),

    computed: {
      formTitle () {
        if (this.readonly){
          return "Visualizar Detalhes da Senha"
        }else{
          return this.editedIndex === -1 ? 'Nova Senha' : 'Editar Senha'
        }
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      error (val) {
        if (val === true){
          setTimeout(() => {
            this.error = false
          }, 3000)
        }
      },
    },

    created () {
      this.validateToken()
    },

    methods: {
      async initialize () {
        await this.$axios.$get('/password')
        .then(res => {
          this.passwords = res
        })
      },

      async validateToken () {
        if(process.client){
          const token = localStorage.getItem('token')
          if(!token) {
            this.$store.commit('setUser', null)
            this.$router.push({ name: 'login' })
          }else{
            this.$store.commit('setUser', token)
            this.initialize()
          }
        }
      },

      async viewItem (item) {
        await this.$axios.$get(`/password/${item.id}`)
        .then((res) => {
          this.editedIndex = this.passwords.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.editedItem.password = res.decrypt_pass
          this.dialog = true
          this.readonly = true
          this.show1 = false
        })
        .catch(() => {
          this.error = true
        })
      },
      
      async editItem (item) {
        await this.$axios.$get(`/password/${item.id}`)
        .then((res) => {
          this.editedIndex = this.passwords.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.editedItem.password = res.decrypt_pass
          this.dialog = true
          this.show1 = false
        })
        .catch(() => {
          this.error = true
        })
      },

      deleteItem (item) {
        this.editedIndex = this.passwords.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      async deleteItemConfirm () {
        await this.$axios.$delete(`/password/${this.editedItem.id}`)
        .then(() => {
          this.passwords.splice(this.editedIndex, 1)
          this.closeDelete()
        })
        .catch(() => {
          this.error = true
        })
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.readonly = false
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        if (this.editedIndex > -1) {
          if (this.editedItem.password && this.editedItem.url){
            const id_pass = this.editedItem.id
            delete this.editedItem.id;
            await this.$axios.$put(`/password/${id_pass}`, this.editedItem)
            .then((res) => {
              Object.assign(this.passwords[this.editedIndex], res)
              this.close()
            })
            .catch(() => {
              this.error = true
              this.close()
            })
          }else{
            this.$refs.form.validate()
          }
        } else {
          if (this.editedItem.password && this.editedItem.url){
            delete this.editedItem.id;
            await this.$axios.$post('/password', this.editedItem)
            .then((res) => {
              this.passwords.push(res.data)
              this.close()
            })
            .catch(() => {
              this.error = true
              this.close()
            })
          }else{
            this.$refs.form.validate()
          }
        }
      },
    },
  }
</script>
