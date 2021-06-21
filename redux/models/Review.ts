import userEntity, { User } from './User'
import { normalize, schema } from 'normalizr';
import Entity from './Entity';

export interface Review {
    _id: string;
    user: User;
    mark: number;
    text: string;
}
export class ReviewEntity extends Entity {

    constructor() {
        super("reviews", {
            user: userEntity
        });
    }
}

const reviewEntity = new ReviewEntity();
export default reviewEntity;
