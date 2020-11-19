import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)
const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: localStorage
})

export default new Vuex.Store({
  plugins: [
    vuexPersist.plugin
  ],
  state: {      // variáveis compartilháveis através da aplicação
    usuario: '',
    senha: '',
    cod_erro: false,

    permiteNavegacao: true,
    logado: false,
    app_adm: false
  },
  getters :{
  },
  mutations: {  // métodos para setar as variáveis State
    setUsuario(state, valor){
      state.usuario = valor;
    },
    setSenha(state, valor){
      state.senha = valor;
    },
    setCodErro(state, valor){
      state.cod_erro = valor;
    },

    alteraPermiteNavegacao (state) {
      state.permiteNavegacao = !state.permiteNavegacao
    }
  },
  actions: {    // realiza operações assíncronas que alteram State (acessar BD)
  },
  modules: {
  }
})
