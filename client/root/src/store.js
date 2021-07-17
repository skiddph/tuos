import { createStore } from 'vuex'
import createCache from 'vuex-cache';

const store = createStore({
  plugins: [createCache()]
});


export default store;