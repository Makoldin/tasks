import { Hero } from '../domain/Hero';
import { Knight } from '../domain/Knight';
import { Mage } from '../domain/Mage';
import { Archer } from '../domain/Archer';

export type HeroClassType = 'Knight' | 'Mage' | 'Archer';

export class HeroFactory {
  private static names = ['Артур', 'Эльдар', 'Гэндальф', 'Вильямс', 'Леголас', 'Мерлин', 'Ланселот', 'Робин'];
  private static classes: HeroClassType[] = ['Knight', 'Mage', 'Archer'];

  // Метод 1: Точно определенные параметры
  public static createHero(heroClass: HeroClassType, name: string, health: number, strength: number): Hero {
    switch (heroClass) {
      case 'Knight': return new Knight(name, health, strength);
      case 'Mage': return new Mage(name, health, strength);
      case 'Archer': return new Archer(name, health, strength);
      default: throw new Error('Неизвестный класс героя');
    }
  }

  // Метод 2: Рандомайзер
  public static generateHeroes(count: number): Hero[] {
    if (count % 2 !== 0) throw new Error('Количество игроков должно быть чётным');
    
    const heroes: Hero[] = [];
    for (let i = 0; i < count; i++) {
      const randomClass = this.classes[Math.floor(Math.random() * this.classes.length)];
      const randomName = this.names[Math.floor(Math.random() * this.names.length)] + ` #${i+1}`;
      const randomHealth = Math.floor(Math.random() * 50) + 70; // Здоровье 70-119
      const randomStrength = Math.floor(Math.random() * 10) + 10; // Сила 10-19

      heroes.push(this.createHero(randomClass, randomName, randomHealth, randomStrength));
    }
    return heroes;
  }
}