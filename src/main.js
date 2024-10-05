import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
//import colors from 'vuetify/util/colors'

axios.defaults.baseURL = 'http://localhost:8080';  // Cambia la URL según sea necesario
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8080';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            background: '#F595FF',
            // primary: colors.green.base,
          }
        },
      },
    },
  },
})

const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.use(router)
app.use(vuetify)

app.mount('#app')