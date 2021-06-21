import { normalize, schema } from 'normalizr';
import Entity from './Entity';

export interface Category {
    _id: string;
    name: string;
    description: string;
}

export class CategoryEntity extends Entity {
    constructor() {
        super("categories", {});
    }
}

const categoryEntity = new CategoryEntity();
export default categoryEntity;