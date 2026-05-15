import { Hero } from './Hero';
import { Logger } from '../game/Logger';

export class Archer extends Hero {
  private _fireArrowUsed: boolean = false;

  constructor(name: string, health: number, strength: number) {
    super(name, health, strength);
    this._iceArrowsLimit = 2; // Переопределение лимита для лучника
  }

  public get className(): string { return 'Лучник'; }

  public useAbility(target: Hero, logger: Logger): void {
    if (!this._fireArrowUsed) {
      this._fireArrowUsed = true;
      target.receiveFireArrow();
      logger.log(`(${this.className}) ${this.name} использует (Огненные стрелы). (${target.className}) ${target.name} загорается!`);
    } else {
      this.attack(target, logger);
    }
  }
}