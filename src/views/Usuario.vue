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
      <h2 @click="atu_show = !atu_show">Atualizar Usuários</h2>
        <div v-if="atu_show">
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
                <input type="text" id="del_usuario"
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
      cad_usuario: '', cad_senha: '', cad_exibicao:'',
      listas: [],
      cad_show: false, atu_show: false, list_show: false, del_show: false,
      del_usuario: '',
      put_usuario: '', put_senha: '', put_exibicao: ''
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
      axios.put('usuario?nomeUsuario=' + this.put_usuario, {
        nomeUsuario: this.put_usuario,
        senha: this.put_senha,
        nomeExibicao: this.put_exibicao
      },
      { auth: { username: this.getUsuario, password: this.getSenha }
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
        params: { "nomeUsuario" : this.del_usuario },
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
      this.del_usuario = '';
    },
    cadastrar() {
      axios.post('/usuario',
          {
            nomeUsuario: this.cad_usuario,
            senha: this.cad_senha,
            nomeExibicao:this.cad_exibicao
          },
          {
            auth: {
                username: this.getUsuario,
                password: this.getSenha
            }
          }
          )
        .then(res => {
          console.log(res);
          this.cad_usuario = '';
          this.cad_senha = '';
          this.cad_exibicao = '';
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
