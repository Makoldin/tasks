import { Hero } from './Hero';
import { Logger } from '../game/Logger';

export class Knight extends Hero {
  public get className(): string { return 'Рыцарь'; }

  public useAbility(target: Hero, logger: Logger): void {
    const bonusDamage = Math.floor(target.health * 0.3);
    const totalDamage = this._strength + bonusDamage;
    target.takeDamage(totalDamage);
    logger.log(`(${this.className}) ${this.name} использует (Удар возмездия) и наносит урон ${totalDamage} противнику (${target.className}) ${target.name}`);
  }
}