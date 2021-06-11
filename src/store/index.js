import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from '../router';
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersist ({
  key: 'my-app',
  storage: localStorage
})

export default new Vuex.Store ({
  plugins: [
    vuexPersist.plugin
  ],

  state: {
    cod_erro: null,
    usuario: null,
    token: null,
    role: null,

    logado: false
  },

  actions :{
    login(context, { usuario, senha }) {
      axios
      .post("login", {
        username: usuario,
        password: senha
      })
      .then(res => {
        console.log(res);
        context.commit('login');
        context.commit('setUsuario', usuario);
        context.commit('setToken', res.data.token);
        context.commit('setRole', res.data.autorizacao);
        router.push('/');
      })
      .catch(error => {
        context.commit('setCodErro', 'Usuário/senha inválido(s)');
        console.log(error);
      })
    }     
  },

  getters :{
    getLogado(state){
      return state.logado;
    },
    getErro(state){
      return state.cod_erro;
    },
    getRole(state){
      return state.role;
    },
    getUsuario(state){
      return state.usuario;
    }
  },

  mutations: {  // métodos para setar as variáveis State
    setUsuario(state, usuario) {
        state.usuario = usuario;
      },
      setToken(state, token) {
        state.token = token;
      },
      setRole(state, role) {
        state.role = role;
      },      
      login(state) {
        state.logado = true;
      },
      logout(state) {
        state.role = null;
        state.token = null;
        state.usuario = null;
        state.logado = false;
      },
      setCodErro(state, valor) {
        state.cod_erro = valor;
      } 
  },
  methods: {
  }
})