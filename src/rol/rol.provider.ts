import { Rol } from '../../db/entitys/rol';
export const RolProvider = {
    provide: 'RolRepository',
    useValue: Rol,
};
