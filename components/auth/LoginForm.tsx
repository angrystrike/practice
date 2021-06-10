import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";

interface MyProps {

}

interface MyState {
    email: string,
    password: string
}

// interface WithRouterProps {
//     router: NextRouter
// }

export class LoginForm extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState<typeof name>({
            [name]: target.value
        });
    }

    handleSubmit(event) {      
        event.preventDefault();           
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };
        const router = useRouter()
        fetch('/auth/login', requestOptions)
            .then(response => response.json())
            .then(
                (result) => {     
                    // var Router = require('react-router');
                    // Router.browserHistory.push('/');
                    useEffect(() => {
                        // Always do navigations after the first render
                        //this.props.router
                        router.push('/')
                    }, [])          
                    // console.log(result);
                    //router.push('/login', '/', { shallow: true })
                    // window.location.href = '/';
                    // return (<Redirect to="/" />);                   
                },            
                (error) => {
                    console.log(error);
                }
            )
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="mt-6 flex flex-col font-lg">
                <label className="flex flex-col">
                    Email:
                    <input name="email" onChange={this.handleChange} className="text-black py-3 focus:shadow-none bg-gray-100 border-none rounded-md focus:border-none focus:outline-none focus:bg-gray-200" type="text" />
                </label>

                <label className="mt-5 flex flex-col">
                    Password:
                    <input name="password" onChange={this.handleChange} className="text-black py-3 focus:shadow-none bg-gray-100 border-none rounded-md focus:border-none focus:outline-none focus:bg-gray-200" type="text" />
                </label>

                <button type="submit" className="mt-8 self-start bg-blue-500 text-white rounded-md py-2 w-full sm:w-24">Sign In</button>
            </form>
        );
    }
}