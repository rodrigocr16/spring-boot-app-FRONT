<template>
  <div class="usuario">
    <img alt="app_logo" src="../assets/logo.png">
    <div id="menu" style="marginTop:50px">

      <h1>Painel de Usuários</h1>

      <!-- LISTAGEM DOS USUÁRIOS -->
      <table border="1" width="750px">
        <thead align="left">
          <tr>
            <th width="30%">Nome de Usuário</th>
            <th width="30%">Senha</th>
            <th width="40%">Nome de Exibição</th>
          </tr>
        </thead>
        <tbody align="left">
          <tr v-for=" lista in listas" :key="lista.id">
            <td>
              <img class="btn"
                src="../assets/btn_del.png"
                @click="del_show = true; del_usuario = lista.nomeUsuario">
              {{ lista.nomeUsuario }}
            </td>
            <td>
              <img class="btn"
                src="../assets/btn_put.png"
                @click="put_show = true;
                  put_type = 'senha';
                  put_usuario = lista.nomeUsuario;
                  put_exibicao = lista.nomeExibicao;
                ">
              {{ lista.senha }}
            </td>
            <td>
              <img class="btn"
                src="../assets/btn_put.png"
                @click="put_show = true;
                  put_type = 'exibicao';
                  put_usuario = lista.nomeUsuario;
                  put_senha = lista.senha;
                ">
              {{ lista.nomeExibicao }}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- ATUALIZAÇÃO DE USUÁRIOS -->
      <div v-if="put_show" id="put_form">
        <form @submit.prevent="atualizar">
          <h4>Usuário: {{ put_usuario }}</h4>
          <div v-if="put_type == 'senha'" class="form-group" id="troca_senha">
            Nova senha:<br>
            <input type="text" id="put_senha"
            class="form-control" required autofocus
            v-model="put_senha">
          </div>
          <div v-if="put_type == 'exibicao'" class="form_group" id="troca_exibicao">
            Novo nome de exibição:<br>
            <input type="text" id="put_exibicao"
            class="form-control" required autofocus
            v-model="put_exibicao">
          </div>
          <p><button type="submit">Salvar</button></p>
        </form>
      </div>

      <!-- REMOÇÃO DE USUÁRIOS -->
      <div v-if="del_show" id="del_form">
        <form @submit.prevent="deletar">
          <h4>Digite "{{ del_usuario }}" para confirmar</h4>
          <div class="form-group">
              <input type="text" id="del_confirm"
              class="form-control" required autofocus
              v-model="del_confirm"> 
              <p><button type="submit">DELETAR!</button></p>
          </div>
        </form>
      </div>

      <p id="erro">{{ cod_erro }}</p>
      
      <!-- CADASTRAR NOVO USUÁRIO -->
      <form @submit.prevent="cadastrar" id="cad_form">
        <h2>Cadastrar Usuário</h2>
        <label for="cad_usuario">Nome do Usuário:</label><br>
        <input type="text" id="cad_usuario"
          required autofocus
          v-model="cad_usuario"><br>
        <label for="cad_senha">Senha:</label><br>
        <input type="password" id="cad_senha"
          required autofocus
          v-model="cad_senha"><br>
        <label for="cad_exibicao">Nome de Exibição:</label><br>
        <input type="text" id="cad_exibicao"
          required autofocus
          v-model="cad_exibicao">
        <p><button type="submit">Salvar</button></p>
      </form>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
export default {
  name: 'usu',
  mounted(){
    this.get();
  },
  data() {
    return {
      cad_usuario: '', cad_senha: '', cad_exibicao: '', listas: [],
      put_show: false, put_usuario: '', put_senha: '', put_exibicao: '',
      del_show: false, del_usuario: '', del_confirm: '',
      cod_erro: '', put_type: ''
    }
  },

  computed: {
    ...mapState([
      'usuario',
      'senha'
    ]),
    ...mapGetters([
      'getUsuario',
      'getSenha'
    ])
  },

  methods: {
    cadastrar() {
      axios.post('/usuario', {
        nomeUsuario: this.cad_usuario,
        senha: this.cad_senha,
        nomeExibicao:this.cad_exibicao
      },
      {
        auth: { username: this.getUsuario, password: this.getSenha }
      })
      .then(res => {
        console.log(res);
        //this.listas.push(res.data);
        this.get();
      })
      .catch(error => console.log(error))
      this.cad_usuario = '';
      this.cad_senha = '';
      this.cad_exibicao = '';
    },

    atualizar(){
      axios.put('usuario?nomeUsuario=' + this.put_usuario, {
        nomeUsuario: this.put_usuario,
        senha: this.put_senha,
        nomeExibicao: this.put_exibicao
      },
      {
        auth: { username: this.getUsuario, password: this.getSenha }
      })
      .then(res => {
        console.log(res);
        this.get();
      })
      .catch(error => {
        console.log(error);
        this.erro(error.response.status);
      })
      this.put_type = '';
      this.put_senha = '';
      this.put_usuario = '';
      this.put_exibicao = '';
      this.put_show = false;
    },

    deletar(){
      if(this.del_confirm == this.del_usuario){
        axios.delete('usuario', {
          params: { "nomeUsuario" : this.del_usuario },
          headers: { Accept: 'application/json' },
          auth: { username: this.getUsuario, password: this.getSenha }
        })
        .then(res => {
          console.log(res);
          this.get();
          this.del_show = false;
        })
        .catch(error => {
          console.log(error);
          this.erro(error.response.status);
        })
        this.del_usuario = '';
        this.del_confirm = '';
      } else {
        this.cod_erro = "A confirmação não bate com o nome do usuário!";
        this.del_confirm = '';
      }
    },

    get(){
      axios.get('usuario', {
        params: { nomeUsuario: this.cad_usuario },
        headers: { Accept: 'application/json' },
        auth: { username: this.getUsuario, password: this.getSenha }
      })
      .then( res => {
        console.log(res);
        this.listas = res.data;
        this.cod_erro = '';
       })
      .catch(error => {
        console.log(error);
        this.erro(error.response.status);
      })
    },

    erro(codigo){
      switch(codigo){
        case 400: console.log('Bad request');
          break;
        case 401: console.log('Senha inválida!');
          break;
        case 404: console.log('Usuário não cadastrado!');
          break;
        default: console.log('Houston, we have a problem!');
      }
    }
  }
}
</script>

<style>
  h1{ margin-bottom: 30px; }
  table{
    margin: auto;
    background: #e4e4e4;
  }
  form{
    position: initial;
    background-color: #e4e4e486;
    height: auto;
    margin-left: auto; margin-right: auto;
  }
  img{ cursor: pointer; }
  #erro{ color: red; }
</style>


<!--
<template>
  <div class="usuario">
    <img alt="app_logo" src="../assets/logo.png">
    <div id="menu" style="marginTop:50px">
      <h1>Painel de Usuários</h1>
      <br>
      <h2 @click="cad_show = !cad_show">Cadastrar Usuários</h2>
        <div v-if="cad_show">
            <form @submit.prevent="cadastrar">
                <h3>Insira os dados do novo usuário</h3>
                    <br><label for="cad_usuario">Nome do Usuário:</label><br>
                    <input type="text" id="cad_usuario"
                        required autofocus
                        v-model="cad_usuario"> 
                    <br><label for="cad_senha">Senha:</label><br>
                    <input type="password" id="cad_senha"
                        required autofocus
                        v-model="cad_senha"> 
                    <br><label for="cad_exibicao">Nome de Exibição:</label><br>
                    <input type="text" id="cad_exibicao"
                        required autofocus
                        v-model="cad_exibicao">
                <p><button type="submit">Salvar</button></p>
            </form>
        </div>
      <br>
      <h2 @click="put_show = !put_show">Atualizar Usuários</h2>
        <div v-if="put_show">
          <form @submit.prevent="atualizar">
            <h3>Usuario a atualizar</h3>
            <div class="form-group">
                <br>Nome do Usuário:<br>
                <input type="text" id="put_usuario"
                  class="form-control" required autofocus
                  v-model="put_usuario"
                >
                <br>Nova Senha:<br>
                <input type="password" id="put_senha"
                  class="form-control" required
                  v-model="put_senha"
                >
                <br>Novo Nome de Exibicao:<br>
                <input type="text" id="put_exibicao"
                  class="form-control" required
                  v-model="put_exibicao"
                >                
                <p><button type="submit">Salvar</button></p>
            </div>
          </form>
        </div>
      <br>
      <h2 @click="get_show = !get_show; get();">Listar Usuários</h2>
        <div v-if="get_show">
            <table border="1" width="450">
                <thead align="left">
                    <tr>
                    <th>Nome de Usuário</th>
                    <th>Nome de Exibição</th>
                    </tr>
                </thead>
                <tbody align="left">
                    <tr v-for=" lista in listas" :key="lista.id">
                    <td>{{ lista.nomeUsuario }}</td>
                    <td>{{ lista.nomeExibicao }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
      <br>
      <h2 @click="del_show = !del_show">Deletar Usuários</h2>
        <div v-if="del_show">
          <form @submit.prevent="deletar">
            <h3>Insira o nome do usuário</h3>
            <div class="form-group">
                <h4>Nome do Usuário:</h4> 
                <input type="text" id="del_usuario"
                class="form-control" required autofocus
                v-model="del_usuario"> 
                <p><button type="submit">DELETAR!</button></p>
            </div>
          </form>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
export default {
  name: 'usu',
  data() {
    return {
      cad_show: false, cad_usuario: '', cad_senha: '', cad_exibicao: '',
      put_show: false, put_usuario: '', put_senha: '', put_exibicao: '',
      del_show: false, del_usuario: '',
      get_show: false, listas: []
    }
  },

  computed: {
    ...mapState([
      'usuario',
      'senha'
    ]),
    ...mapGetters([
      'getUsuario',
      'getSenha'
    ])
  },

  methods: {
    cadastrar() {
      axios.post('/usuario', {
        nomeUsuario: this.cad_usuario,
        senha: this.cad_senha,
        nomeExibicao:this.cad_exibicao
      },
      {
        auth: { username: this.getUsuario, password: this.getSenha }
      })
      .then(res => {
        console.log(res);
        this.listas.push(res.data);
      })
      .catch(error => console.log(error))
      this.cad_usuario = '';
      this.cad_senha = '';
      this.cad_exibicao = '';
    },

    atualizar(){
      axios.put('usuario?nomeUsuario=' + this.put_usuario, {
        nomeUsuario: this.put_usuario,
        senha: this.put_senha,
        nomeExibicao: this.put_exibicao
      },
      {
        auth: { username: this.getUsuario, password: this.getSenha }
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
        this.erro(error.response.status);
      })
      this.put_senha = '';
      this.put_usuario = '';
      this.put_exibicao = '';
    },

    deletar(){
      axios.delete('usuario', {
        params: { "nomeUsuario" : this.del_usuario },
        headers: { Accept: 'application/json' },
        auth: { username: this.getUsuario, password: this.getSenha }
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
        this.erro(error.response.status);
      })
      this.del_usuario = '';
    },

    get(){
      axios.get('usuario', {
        params: { nomeUsuario: this.cad_usuario },
        headers: { Accept: 'application/json' },
        auth: { username: this.getUsuario, password: this.getSenha }
      })
      .then( res => {
        console.log(res);
        this.listas = res.data;
       })
      .catch(error => {
        console.log(error);
        this.erro(error.response.status);
      })
    },

    erro(codigo){
      switch(codigo){
        case 400: console.log('Bad request');
          break;
        case 401: console.log('Senha inválida!');
          break;
        case 404: console.log('Usuário não cadastrado!');
          break;
        default: console.log('Houston, we have a problem!');
      }
    }
  }
}
</script>

<style>
  p{
    opacity: 80%;
  }
  h1{
    margin-bottom: 30px;
  }
  table{
    margin: auto;
    background: #e4e4e4;
  }
</style>
-->