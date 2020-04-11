import { Level } from '../../db/entitys/level';
export const LevelProvider = {
    provide: 'LevelRepository',
    useValue: Level,
};
