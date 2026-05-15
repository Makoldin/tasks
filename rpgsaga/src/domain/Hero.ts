import { Logger } from '../game/Logger';

export abstract class Hero {
  protected _name: string;
  protected _health: number;
  protected _maxHealth: number;
  protected _strength: number;
  
  protected _iceArrowsLimit: number = 1;
  protected _iceArrowsUsed: number = 0;
  
  protected _fireDamage: number = 0;
  protected _iceStacks: number = 0;
  protected _iceTurns: number = 0;
  protected _skipNextTurn: boolean = false;

  constructor(name: string, health: number, strength: number) {
    this._name = name;
    this._health = health;
    this._maxHealth = health;
    this._strength = strength;
  }

  public get name(): string { return this._name; }
  public get health(): number { return this._health; }
  public get strength(): number { return this._strength; }
  public get isDead(): boolean { return this._health <= 0; }
  public abstract get className(): string;

  public takeDamage(amount: number): void {
    if (amount < 0) amount = 0;
    this._health -= amount;
    if (this._health < 0) this._health = 0;
  }

  public attack(target: Hero, logger: Logger): void {
    target.takeDamage(this._strength);
    logger.log(`(${this.className}) ${this.name} наносит урон ${this._strength} противнику (${target.className}) ${target.name}`);
  }

  public abstract useAbility(target: Hero, logger: Logger): void;

  public useIceArrows(target: Hero, logger: Logger): boolean {
    if (this._iceArrowsUsed < this._iceArrowsLimit) {
      this._iceArrowsUsed++;
      target.receiveIceArrow(this._strength);
      logger.log(`(${this.className}) ${this.name} использует Ледяные стрелы против (${target.className}) ${target.name}!`);
      return true;
    }
    return false;
  }

  // Эти методы позволяют не "лезть" в чужой класс, а передать сообщение о получении эффекта
  public receiveIceArrow(baseDamage: number): void {
    this.takeDamage(baseDamage);
    this._iceStacks++;
    this._iceTurns = 3;
  }

  public receiveFireArrow(): void {
    this._fireDamage = 2;
  }

  public receiveEnchantment(): void {
    this._skipNextTurn = true;
  }

  public consumeSkipTurn(): boolean {
    if (this._skipNextTurn) {
      this._skipNextTurn = false;
      return true;
    }
    return false;
  }

  public applyEffects(logger: Logger): void {
    if (this.isDead) return;

    if (this._fireDamage > 0) {
      this.takeDamage(this._fireDamage);
      logger.log(`(${this.className}) ${this.name} горит и теряет ${this._fireDamage} здоровья. Осталось: ${this.health}`);
    }

    if (this._iceTurns > 0) {
      const iceDamage = 5 * this._iceStacks; 
      this.takeDamage(iceDamage);
      logger.log(`(${this.className}) ${this.name} получает ${iceDamage} доп. урона от обморожения. Осталось: ${this.health}`);
      this._iceTurns--;
      if (this._iceTurns === 0) {
        this._iceStacks = 0; 
      }
    }
  }
}