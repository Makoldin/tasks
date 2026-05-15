import { describe, it, expect } from 'vitest';
import { Knight } from '../../src/domain/Knight';
import { Mage } from '../../src/domain/Mage';
import { Archer } from '../../src/domain/Archer';
import { Logger } from '../../src/game/Logger';

// Заглушка логгера для тестов
class DummyLogger extends Logger {
  public log(): void {} 
}

describe('Hero Abilities and Effects Unit Tests', () => {
  const logger = new DummyLogger();

  it('Рыцарь должен наносить дополнительные 30% урона от текущего здоровья противника', () => {
    const knight = new Knight('Артур', 100, 20);
    const mage = new Mage('Мерлин', 100, 10);
    
    knight.useAbility(mage, logger);
    // Сила (20) + 30% от 100 (30) = 50 урона.
    expect(mage.health).toBe(50);
  });

  it('Маг должен заставлять цель пропустить ход', () => {
    const mage = new Mage('Мерлин', 100, 10);
    const archer = new Archer('Робин', 100, 15);
    
    mage.useAbility(archer, logger);
    
    expect(archer.consumeSkipTurn()).toBe(true); // Ход должен быть пропущен
    expect(archer.consumeSkipTurn()).toBe(false); // Флаг должен сброситься после потребления
  });

  it('Огненные стрелы Лучника должны наносить 2 урона каждый ход', () => {
    const archer = new Archer('Робин', 100, 15);
    const knight = new Knight('Артур', 100, 20);
    
    archer.useAbility(knight, logger);
    knight.applyEffects(logger); 
    
    expect(knight.health).toBe(98);
  });

  it('Маг должен иметь иммунитет к обморожению (доп. урону от ледяных стрел)', () => {
    const archer = new Archer('Робин', 100, 15);
    const mage = new Mage('Мерлин', 100, 10);

    archer.useIceArrows(mage, logger);
    mage.applyEffects(logger); // Маг иммунен, поэтому доп. урон не пройдет
    
    // Получит только базовый урон (15) при попадании стрелы
    expect(mage.health).toBe(85);
  });
});