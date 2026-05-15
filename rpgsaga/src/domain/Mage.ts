import { Hero } from './Hero';
import { Logger } from '../game/Logger';

export class Mage extends Hero {
  public get className(): string { return 'Маг'; }

  public useAbility(target: Hero, logger: Logger): void {
    target.receiveEnchantment();
    logger.log(`(${this.className}) ${this.name} использует (Заворожение). (${target.className}) ${target.name} пропустит ход.`);
  }

  // Демонстрация полиморфизма: Маг получает урон от стрелы, но иммунен к обморожению
  public override receiveIceArrow(baseDamage: number): void {
    this.takeDamage(baseDamage); 
  }
}