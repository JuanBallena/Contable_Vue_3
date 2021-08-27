export default class DeepValueSearcher {

    constructor() {}

    static search(item: object, path: string): string
    {
        return path
            .replace(/\[|\]\.?/g, '.')
            .split('.')
            .filter((property: string) => property)
            .reduce((acc: any, val: any) => acc && acc[val], item);
    }
}