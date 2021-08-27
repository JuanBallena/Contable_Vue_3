export default class Parameter {

    static AMOUNT_TYPE_SHOULD: number = 3;
    static AMOUNT_TYPE_HAVING: number = 4;

    public idParameter: number = 0;
    public description: string = "";

    constructor() {}

    static toParameters(data: any[]): Parameter[]
    {
        const parameters: Parameter[] = [];

        data.forEach((item: any) => {

            const parameter = new Parameter();

            parameter.idParameter = item['idParameter'];
            parameter.description = item['description'];

            parameters.push(parameter);
        });

        return parameters;
    }
}