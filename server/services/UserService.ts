import BaseContext from '../BaseContext';

export default class UserService extends BaseContext {

    public find() {
        const { User } = this.di;
        return User.find({});       
    }
}