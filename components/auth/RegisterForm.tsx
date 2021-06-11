import { xSave } from "modules";
import Router from "next/router";
import React from "react";

interface MyProps {

}

interface MyState {
    email: string,
    password: string,
    repeatPassword: string,
    firstName: string,
    lastName: string
}

export class RegisterForm extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            repeatPassword: '',
            firstName: '',
            lastName: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;

        if (name != 'repeatPassword') {
            this.setState<typeof name>({
                [name]: target.value
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        xSave('auth/register', this.state).then((res) => {
            Router.push('/login')
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="mt-6 flex flex-col font-lg">
                <label className="flex flex-col">
                    First Name:
                    <input name="firstName" onChange={this.handleChange} className="py-3 focus:shadow-none bg-gray-100 border-none rounded-md focus:border-none focus:outline-none focus:bg-gray-200" type="text" />
                </label>

                <label className="mt-5 flex flex-col">
                    Last Name:
                    <input name="lastName" onChange={this.handleChange} className="py-3 focus:shadow-none bg-gray-100 border-none rounded-md focus:border-none focus:outline-none focus:bg-gray-200" type="text" />
                </label>

                <label className="mt-5 flex flex-col">
                    Email:
                    <input name="email" onChange={this.handleChange} className="py-3 focus:shadow-none bg-gray-100 border-none rounded-md focus:border-none focus:outline-none focus:bg-gray-200" type="text" />
                </label>

                <label className="mt-5 flex flex-col">
                    Password:
                    <input name="password" onChange={this.handleChange} className="py-3 focus:shadow-none bg-gray-100 border-none rounded-md focus:border-none focus:outline-none focus:bg-gray-200" type="text" />
                </label>

                <label className="mt-5 flex flex-col">
                    Repeat Password:
                    <input name="repeatPassword" onChange={this.handleChange} className="py-3 focus:shadow-none bg-gray-100 border-none rounded-md focus:border-none focus:outline-none focus:bg-gray-200" type="text" />
                </label>

                <button type="submit" className="mt-8 self-start bg-blue-500 text-white rounded-md py-2 w-full md:w-24">Sign Up</button>
            </form>
        );
    }
}