import User from './User'

export default interface Reviews {
    _id: string;
    user: User;
    mark: number;
    text: string;
}

