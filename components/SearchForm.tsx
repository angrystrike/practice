import React from "react";
import Router from 'next/router';
import saga from "redux/decorators/saga";
import ProductEntity  from 'redux/models/Product';
import { connect } from "react-redux";

interface MyProps {
}

interface MyState {
    search: string,
}

class SearchForm extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
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
        Router.push('/search/' + this.state.search)        

        // Router.push({
        //     pathname: '/search',
        //     query: { text: this.state.search },
        // })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="mt-6 px-6 flex items-center justify-center">
                <svg className="relative left-9 sm:left-12 h-6 w-9 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" /></svg>
                <input name="search" onChange={this.handleChange} className="block text-black w-full sm:w-1/2 mr-4 focus:outline-none focus:bg-gray-200 rounded-lg pl-10 pr-3 py-2 shadow-lg" placeholder="Search by model" />
                <button className="px-4 py-2 block text-white bg-pink-600 focus:outline-none focus:bg-pink-800 rounded-lg focus:rounded-xl font-semibold shadow-lg">Find</button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        search: ''
    };
};

export default connect(mapStateToProps, ProductEntity.triggers())(SearchForm);