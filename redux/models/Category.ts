import { normalize, schema } from 'normalizr';

export default interface Category {
    id: string;
    name: string;
    description: number;
}

export const categoryEntity = new schema.Entity('categories', {}, {
    idAttribute: 'id'
});