import { Hero } from '../domain/Hero';
import { Logger } from './Logger';

export class Game {
  private players: Hero[];
  private logger: Logger;

  constructor(players: Hero[], logger: Logger) {
    if (players.length % 2 !== 0) {
      throw new Error("Количество игроков должно быть чётным.");
    }
    this.players = players;
    this.logger = logger;
  }

  public start(): void {
    let round = 1;

    while (this.players.length > 1) {
      this.logger.log(`\n=== Кон ${round} ===`);
      const winners: Hero[] = [];
      
      this.players.sort(() => Math.random() - 0.5);

      for (let i = 0; i < this.players.length; i += 2) {
        const p1 = this.players[i];
        const p2 = this.players[i + 1];
        winners.push(this.fight(p1, p2));
      }

      this.players = winners;
      round++;
    }

    this.logger.log(`\nПобедитель турнира: (${this.players[0].className}) ${this.players[0].name}!`);
  }

  private fight(p1: Hero, p2: Hero): Hero {
    this.logger.log(`\n(${p1.className}) ${p1.name} vs (${p2.className}) ${p2.name}`);
    
    while (!p1.isDead && !p2.isDead) {
      this.executeTurn(p1, p2);
      if (p2.isDead) {
        this.logger.log(`(${p2.className}) ${p2.name} погибает`);
        break;
      }

      this.executeTurn(p2, p1);
      if (p1.isDead) {
        this.logger.log(`(${p1.className}) ${p1.name} погибает`);
        break;
      }
    }

    return p1.isDead ? p2 : p1;
  }

  private executeTurn(attacker: Hero, defender: Hero): void {
    attacker.applyEffects(this.logger);
    if (attacker.isDead) return;

    if (attacker.consumeSkipTurn()) {
      this.logger.log(`(${attacker.className}) ${attacker.name} пропускает ход из-за заворожения.`);
      return;
    }

    const action = Math.random();
    
    if (action < 0.3) {
      attacker.useAbility(defender, this.logger); // 30% на способность
    } else if (action < 0.5) {
      const used = attacker.useIceArrows(defender, this.logger); // 20% на ледяные стрелы
      if (!used) attacker.attack(defender, this.logger);
    } else {
      attacker.attack(defender, this.logger); // 50% на обычную атаку
    }
  }
}