import BaseContext from '../BaseContext';

export default class UserService extends BaseContext {
    public findAll() {
        const { UserModel } = this.di;
        return UserModel.find({});       
    }

    public async save(body, id) {
        console.log('USER SERVICE', body);
        
        const { UserModel } = this.di;
        let user = await UserModel.findById(id);
        if (user) {
            user.set(body);
        } else {
            user = new UserModel(body);
        }
        return user.save();
    }

    public findOneByID(id) {
        const { UserModel } = this.di;
        return UserModel.findById(id);
    }

    public deleteByID(id) {
        const { UserModel } = this.di;
        return UserModel.findByIdAndDelete(id);
    }

}