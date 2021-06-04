import passportLocal from 'passport-local';
import { IContextContainer } from 'server/container';
import BaseContext from '../BaseContext';
import { Request, Response } from 'express';


export default class SignUpStrategy extends BaseContext {
    private strategyUser: passportLocal.Strategy;

    get strategy() {
        return this.strategyUser;
    }

    constructor(opts: IContextContainer) {
        super(opts);

        console.log('jwt: initialization Local-SignUp strategy');
        this.verifyRequestUser = this.verifyRequestUser.bind(this);

        this.strategyUser = new passportLocal.Strategy({
            passwordField: 'password',
            passReqToCallback: true,
            usernameField: 'email',
            session: false,

        }, this.verifyRequestUser);
    }

    public async verifyRequestUser(req: Request, email: string, password: string, done: any) {
        console.log('auth verify')
        const { UserModel } = this.di;
        const user = await UserModel.findOne({ email: email });
        if (user) {
            return done({ email: 'That e-mail already taken!' });
        }

        const { firstName, lastName } = req.body;

        const userData = {
            email: email && email.trim().toLowerCase(),
            firstName: firstName && firstName.trim(),
            lastName: lastName && lastName.trim(),
            password: password && password.trim(),
            role: "user",
            image: "https://robohash.org/test"
        };

        const newUser = new UserModel(userData);

        newUser.save().then((user: any) => {
            return done(null, {
                _id: user._id
            });
        })
            .catch((error: any) => {
                console.log('verifyRequestUser__catch__error', error)
                return done(error.errmsg);
            });
    }
}
