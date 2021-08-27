import UrlParameters from './UrlParameters';

export default class UrlParametersCreator {

    constructor() {}

    static create(parameterValues: any): string {

        let url: string = "";

        const parameterValuesKeys = Object.keys(parameterValues);

        for (let index = 0; index < parameterValuesKeys.length; index++) 
        {
            const urlParameter = Object.create(UrlParameters.values)[parameterValuesKeys[index]];
            const parameterValue = Object.create(parameterValues)[parameterValuesKeys[index]];

            if (parameterValue) 
            {
                url += `${urlParameter}=${parameterValue}&`;
            }
        }

        return url;
    }
}