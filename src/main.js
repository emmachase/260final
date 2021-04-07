import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

let data = {
  images: [
    { title: "Loss & Accuracy", isImage: true, src: "/images/chrome_aUyTfB1IWj.UJlwLNDqijKrnS4nUg1eoGh6u1Nt7L91.png", description: "The validation and loss for my ML model", tags: "machine learning, ml", time: new Date() },
    { title: "Loss", isImage: true, src: "/images/chrome_h5stQ1raZv.Ccv9O72nVCqMXJw8loLf2v5piPBo4Poj.png", description: "", tags: "", time: new Date() },
    { title: "Loss Console", isImage: true, src: "/images/chrome_gNd5LEGoyz.obKf11toWZHeYE5cSA0MNMlUKxkvujNl.png", description: "", tags: "", time: new Date() },
    { title: "Process Chunk", isImage: true, src: "/images/Code_6sdjUcn7yn.kBkoQEoMlKxoieEqRquxR9bqc5irXiz4.png", description: "", tags: "", time: new Date() },
    { title: "UV Math", isImage: true, src: "/images/chrome_IodPzZog4x.tqIY2UFt9ESnPDZeRCkR7EOhsRNJYUWJ.png", description: "A little math used in my Blender plugin", tags: "math, 3d", time: new Date() },
    { title: "Bitmask", isImage: true, src: "/images/chrome_3MclgWHhTa.peB53uUYd1KzUAITorZmJOdIs2Ji6Uoo.png", description: "Part of my Blender addon", tags: "", time: new Date() },
    { title: "SaneButStupid", isImage: true, src: "/images/Discord_4dFuPwRnvd.8SYM5i3GwrkZVednm6LFan4IRAGX9ZlX.png", description: "", tags: "cute", time: new Date() },
    { title: "Loop Steps", isImage: true, src: "/images/Code_T3fc2bWl4p.PA2r52QtgLdaAmOOSYql6L5PoBgk204h.png", description: "", tags: "programming", time: new Date() },
    { title: "Error", isImage: true, src: "/images/MfkqP0XXhB.BW9jDomSkXyUodlDlMRpSZW4rQQqBEd9.png", description: "", tags: "", time: new Date() },
  ]
}

const axiosConfig = {
  baseURL: '/api',
  withCredentials: true,
  timeout: 30000,
  validateStatus() {
    return true;
  }
};

Vue.prototype.$axios = axios.create(axiosConfig)

new Vue({
  router, data,
  render: h => h(App)
}).$mount('#app')
