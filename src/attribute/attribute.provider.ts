import { Attribute } from '../../db/entitys/attribute';
export const AttributeProvider = {
    provide: 'AttributeRepository',
    useValue: Attribute,
};
