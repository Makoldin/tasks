import { HeroFactory } from './factory/HeroFactory';
import { Game } from './game/Game';
import { Logger } from './game/Logger';

const logger = new Logger();
const players = HeroFactory.generateHeroes(4); // Чётное количество игроков

const game = new Game(players, logger);
game.start();