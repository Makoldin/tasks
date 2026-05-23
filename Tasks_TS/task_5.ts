class Employee {
    
    name: string;       // имя
    position: string;   // должность
    startYear: number;  // год начала работы

    
    constructor(name: string, position: string, startYear: number) {
        this.name = name;
        this.position = position;
        this.startYear = startYear;
    }

    // вывод информ. о сотруднике
    printInfo(): void {
        console.log(`Работник: ${this.name}, Должность: ${this.position}`);
    }

    // стаж в годах
    calculateExperience(currentYear: number): number {
        return currentYear - this.startYear;
    }

    // смена должности
    updateposition(newJob: string): void {
        this.position = newJob;
    }
}


const myEmployee = new Employee("Алексей", "сотрудник", 2020);

// вывод информ. о сотруднике
myEmployee.printInfo(); 

// стаж в годах
let exp = myEmployee.calculateExperience(2026);
console.log(`Стаж работы: ${exp} (лет)`);

// смена должности
myEmployee.updateposition("Старший сотрудник");
myEmployee.printInfo();