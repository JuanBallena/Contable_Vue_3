import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@fortawesome/fontawesome-free/css/all.css'
// import Autocomplete from '@/components/Autocomplete.vue';
// import InputText from '@/components/InputText.vue';
// import Select from '@/components/Select.vue';
// import TextArea from '@/components/TextArea.vue';

createApp(App)
    .use(router)
    // .component('Autocomplete', Autocomplete)
    // .component('InputText', InputText)
    // .component('Select', Select)
    // .component('TextArea', TextArea)
    .mount('#app')
