export default class TextLengthChecker {

    constructor() {}

    static checker(event: any, limit: number): void
    {
        const value: string = event.target.value;

        if (value.length == limit) {
            event.preventDefault();
        }
    }
}