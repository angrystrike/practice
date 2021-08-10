import userEntity, { User } from './User'
import { normalize, schema } from 'normalizr';
import Entity from './Entity';
import { ENTITIES } from 'server/common';

export default interface Review {
    id: string;
    user: User;
    mark: number;
    text: string;
}

export const reviewEntity = new schema.Entity('reviews', {
    user: new schema.Entity(ENTITIES.USERS),
}, {
    idAttribute: 'id'
});
