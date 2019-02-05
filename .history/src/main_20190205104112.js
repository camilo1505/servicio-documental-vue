import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'

import VueWordCloud from 'vuewordcloud'
import vUploader from 'v-uploader';

Vue.component(VueWordCloud.name, VueWordCloud);

const uploaderConfig = () => {
  return {
    uploadFileUrl: 'http://xxx/upload',
    deleteFileUrl: 'http://xxx/delete',
    showMessage: (vue, message) => {
      //using v-dialogs to show message
      vue.$vDialog.alert(message, null, {messageType: 'error'});
    }
  }
};

Vue.use(Vuetify,vUploader, uploaderConfig);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
