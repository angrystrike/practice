import User, { userEntity } from './User'
import { normalize, schema } from 'normalizr';

export default interface Review {
    _id: string;
    user: User;
    mark: number;
    text: string;
}

export const reviewEntity = new schema.Entity('reviews', {
    user: userEntity,
}, {
    idAttribute: '_id'
});

