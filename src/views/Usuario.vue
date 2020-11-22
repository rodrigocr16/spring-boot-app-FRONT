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
                <div>
                    <label for="usu_nome_usuario">Nome do Usuário:</label> 
                    <input type="text" id="usu_nome_usuario"
                        required autofocus
                        v-model="usu_nome_usuario"> 
                </div>
                <div>
                    <label for="usu_senha">Senha:</label> 
                    <input type="password" id="usu_senha"
                        required autofocus
                        v-model="usu_senha"> 
                </div>
                <div>
                    <label for="usu_nome_exibicao">Nome de Exibição:</label> 
                    <input type="text" id="usu_nome_exibicao"
                        required autofocus
                        v-model="usu_nome_exibicao"> 
                </div>
                <br>
                <button type="submit">Salvar</button>
            </form>
        </div>
      <br>
      <h2 @click="atu_show = !atu_show">Atualizar Usuários</h2>
        <div v-if="atu_show">
          <form @submit.prevent="atualizar">
            <h3>Usuario a atualizar</h3>
            <div class="form-group">
                <br>Nome do Usuário: {{ put_usuario }}<br>
                <input type="text" id="txt_put_usuario"
                  class="form-control" required autofocus
                  v-model="put_usuario"
                >
                <br>Nova Senha: {{ put_senha }}<br>
                <input type="password" id="put_senha"
                  class="form-control" required
                  v-model="put_senha"
                >
                <br>Novo Nome de Exibicao: {{ put_exibicao }}<br>
                <input type="text" id="put_nome_exibicao"
                  class="form-control" required
                  v-model="put_exibicao"
                >                
                <p><button type="submit">Salvar</button></p>
            </div>
          </form>
        </div>
      <br>
      <h2 @click="list_show = !list_show">Listar Usuários</h2>
        <div v-if="list_show">
            <table>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Nome de Usuário</th>
                    <th>Senha</th>
                    <th>Nome de Exibição</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for=" lista in listas" :key="lista.id">
                    <td>{{ lista.id }}</td>
                    <td>{{ lista.nomeUsuario }}</td>
                    <td>{{ lista.usu_senha }}</td>
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
                <input type="text" id="del_nome_usuario"
                class="form-control" required autofocus
                v-model="del_nome_usuario"> 
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
      usu_id: '',
      usu_nome_usuario: '',
      usu_senha: '',
      usu_nome_exibicao:'',
      listas: [],
      cad_show: false,
      atu_show: false,
      list_show: false,
      del_show: false,
      del_nome_usuario: '',
      put_usuario: '',
      put_senha: '',
      put_exibicao: ''
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
    atualizar(){
      axios.put('usuario', {
        params: { "nomeUsuario" : this.put_nome_usuario },
        headers: { Accept: 'application/json' },
        auth: { username: this.getUsuario, password: this.getSenha },
        body: { nomeUsuario: this.put_usuario, senha: this.put_senha, nomeExibicao: this.put_exibicao }
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
          console.log(error);
          switch(error.response.status){
            case 400: console.log('Bad request');
              break;
            case 401: console.log('Senha inválida!');
              break;
            case 404: console.log('Usuário não cadastrado!');
              break;
            default: console.log('Houston, we have a problem!');
            }
      })
      this.put_senha = '';
      this.put_usuario = '';
      this.put_exibicao = '';
    },
    deletar(){
      axios.delete('usuario', {
        params: { "nomeUsuario" : this.del_nome_usuario },
        headers: { Accept: 'application/json' },
        auth: { username: this.getUsuario, password: this.getSenha }
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
          console.log(error);
          switch(error.response.status){
            case 400: console.log('Bad request');
              break;
            case 401: console.log('Senha inválida!');
              break;
            case 404: console.log('Usuário não cadastrado!');
              break;
            default: console.log('Houston, we have a problem!');
            }
      })
      this.del_nome_usuario = '';
    },
    cadastrar() {
      axios.post('/usuario',
          {
            id: this.usu_id,
            nomeUsuario: this.usu_nome_usuario,
            senha: this.usu_senha,
            nomeExibicao:this.usu_nome_exibicao
          },
          {
            auth: {
                username:this.usuario,
                password:this.senha
            }
          }
          )
        .then(res => {
          console.log(res);
          this.usu_id = '';
          this.usu_nome_usuario = '';
          this.usu_senha = '';
          this.usu_nome_exibicao = '';
          this.listas.push(res.data);
        })
        .catch(error => console.log(error))
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
</style>
