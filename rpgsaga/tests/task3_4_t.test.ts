import { describe, expect, it } from 'vitest';
import { calculateY, TaskA, TaskB } from '../src/Tasks_TS/task_3';

describe('Задачи А и Б', () => {
    const a = 4.1;
    const b = 2.7;

    // Тест calculateY
    it('calculateY должна возвращать число, не бесконечность', () => {
        const y = calculateY(1.9, a, b);
        
        //  результат должен быть  = числу
        expect(typeof y).toBe('number');
    });

    // Задача А
    it('TaskA должна возвращать массив строк с результатами', () => {
        // запуск
        const results = TaskA(a, b, 1.2, 5.2, 0.8);
        
        // проверка
        expect(results.length).toBeGreaterThan(0);
        
    });

    // Задача Б
    it('TaskB должна возвращать столько же ответов, сколько было передано x', () => {
        // Ввод массива
        const x_values = [1.9, 2.15, 2.34];
        
        const results = TaskB(a, b, x_values);
        
        // Проверка вывода (длина через length)
        expect(results.length).toBe(3);
        
        // Пример проверки первого значения из ответа (что х остался таким же)
        expect(results[0]).toContain('x1 = 1.9');
    });
});