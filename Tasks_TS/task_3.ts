// А и Б
const a: number = 4.1;
const b: number = 2.7;

function calculateY(x: number, a: number, b: number): number {
    
    const log5_x = Math.log(x) / Math.log(5);
    
    const numerator = a * Math.sqrt(x) - b * log5_x;
    
    const denominator = Math.log10(Math.abs(x - 1));
    
    return numerator / denominator;
}

// задача А

console.log("____________задача А");

const x_start: number = 1.2; // xн
const x_end: number = 5.2;   // xк
const dx: number = 0.8;      // дельта x


for (let x = x_start; x <= x_end; x += dx) {
    const y = calculateY(x, a, b);
    console.log(`x = ${x}, y = ${y}`);
}

// задача Б

console.log("____________задача Б");

const x_values: number[] = [1.9, 2.15, 2.34, 2.73, 3.16];

for (let i = 0; i < x_values.length; i = i+1) {
    const x = x_values[i];
    const y = calculateY(x, a, b);
    console.log(`x${i + 1} = ${x}, y = ${y}`);
}