<template>
  <div class="login">
    <img alt="app_logo" src="../assets/logo.png">
    <form @submit.prevent="auth" style="marginTop:50px">
        <h2>LOGIN</h2>
        <p id=usuario>
        <label for="username">Usuário</label><br>
        <input type="text" id="username" required autofocus v-model="nome">
        </p>
        <p id=senha>
        <label for="inputPassword">Senha</label><br>
        <input type="password" id="inputPassword" required v-model="senha">
        </p>
        <button type="submit">Ok</button>
        <p id = "msgErro">{{ getErro }}</p>
    </form>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex';

  export default {
    name: 'Home',
    data() {
      return {
        nome: '',
        senha: ''
      }
    },

    methods: {
      ...mapMutations(['setCodErro']),
      
      ...mapActions(['login']),

      auth() {
        this.login({ usuario: this.nome, senha: this.senha });
        this.senha = '';
        this.getErro;
      },      
    },

    mounted() {
      this.setCodErro('');
    },
    computed: {
      ...mapGetters([
        'getErro'
      ])
    }    
  }

</script>

<style>
  form{
    position: initial;
    background-color: #e4e4e486;
    height: 200px; width: 250px;
    margin-left: auto; margin-right: auto;
  }
  h2{
    font-family:'Franklin Gothic'
  }
  button{
    width: 75px;
  }
  #msgErro{
    margin-top: 50px;
    color: red;
  }
</style>