export default class NumberChecker {

    constructor() {}

    static checker(event: any): void
    {
        const keyCode = (event.keyCode ? event.keyCode : event.which)

        if (keyCode < 48 || keyCode > 57)
        {
            event.preventDefault();
        }
    }
}