// import UsuarioAutenticado from '@/types/UsuarioAutenticado';
// import { inject } from 'vue';

export default class Api {
    
    public baseUrl: string = "";
    // public usuarioAutenticado: UsuarioAutenticado = new UsuarioAutenticado();

    constructor() {

      this.baseUrl = "http://localhost:8000";//inject('$BASE_URL_API', "");
    }
    
    public getBaseUrl(): string 
    {
        return this.baseUrl;
    }
}