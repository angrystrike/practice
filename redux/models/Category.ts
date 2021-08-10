import { normalize, schema } from 'normalizr';
import Entity from './Entity';

export default interface Category {
    id: string;
    name: string;
    description: string;
}

export const categoryEntity = new schema.Entity('categories', {}, {
    idAttribute: 'id'
});
