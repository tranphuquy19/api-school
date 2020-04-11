import { Tokens } from '../../db/entitys/token';
export const TokensProvider = {
    provide: 'TokensRepository',
    useValue: Tokens,
};
