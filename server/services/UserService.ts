import BaseContext from '../BaseContext';

export default class UserService extends BaseContext {
    public findAll() {
        const { UserModel } = this.di;
        return UserModel.find({});       
    }

    public async save(body) {
        const { UserModel } = this.di;
        let user = await UserModel.findById(body.id);
        if (user) {
            user.set(body);
        } else {
            user = new UserModel(body);
        }
        return user.save();
    }

    public findOneByID(id) {
        const { UserModel } = this.di;
        console.log('find')
        return UserModel.findById(id);
    }

    public deleteByID(id) {
        const { UserModel } = this.di;
        return UserModel.findByIdAndDelete(id);
    }

}