export function calculateY(x: number, a: number, b: number): number {
    const log5_x = Math.log(x) / Math.log(5);
    const numerator = a * Math.sqrt(x) - b * log5_x;
    const denominator = Math.log10(Math.abs(x - 1));
    
    return numerator / denominator;
}


export function TaskA(a: number, b: number, x_start: number, x_end: number, dx: number): string[] {
    const results: string[] = []; // строка для ответа

    for (let x = x_start; x <= x_end; x += dx) {
        const y = calculateY(x, a, b);
        
        results.push(`x = ${x}, y = ${y}`); 
    }
    
    return results; // возврат ответа
}


export function TaskB(a: number, b: number, x_values: number[]): string[] {
    const results: string[] = []; 

    for (let i = 0; i < x_values.length; i = i + 1) {
        const x = x_values[i];
        const y = calculateY(x, a, b);
        results.push(`x${i + 1} = ${x}, y = ${y}`);
    }
    
    return results;
}

const a_val: number = 4.1;
const b_val: number = 2.7;


console.log("Задача А") // вывод в логах, т.к. запускаю через консоль

console.log(TaskA(a_val, b_val, 1.2, 5.2, 0.8))

console.log("Задача Б")

console.log(TaskB(a_val, b_val, [1.9, 2.15, 2.34, 2.73, 3.16]))