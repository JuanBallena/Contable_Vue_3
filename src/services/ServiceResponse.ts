export default class ServiceResponse {

    public data: any[] = [];
    public pages: number = 0;
    public message: string = "";
    public status: number = 0;
    public errors: object[] = [];

    constructor() {}

    public ok(): boolean 
    {
        return this.status == 200;
    }

    public created(): boolean 
    {
        return this.status == 201;
    }

    public badRequest(): boolean 
    {
        return this.status == 400;
    }
}