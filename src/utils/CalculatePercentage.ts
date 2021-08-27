export default class CalculatePercentage {

    constructor() {}

    static calculate(baseNumber: number, percentage: number): number 
    {
        const result: number = baseNumber * parseFloat(percentage.toFixed(2));

            if (isNaN(result)) return 0;
        
            return parseFloat(result.toFixed(2));
    }
}