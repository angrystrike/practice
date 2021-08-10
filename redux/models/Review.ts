import User, { userEntity } from './User'
import { normalize, schema } from 'normalizr';

export default interface Review {
    id: string;
    user: User;
    mark: number;
    text: string;
}

export const reviewEntity = new schema.Entity('reviews', {
    user: userEntity,
}, {
    idAttribute: 'id'
});

