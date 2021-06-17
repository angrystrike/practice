import Link from "next/link";
import React from "react";
import { connect } from "react-redux";
import { Product } from 'redux/models/Product';
import Review from "redux/models/Review";
import { Comment } from "./Comment";

interface MyProps {
    product: Map<string, any>;
}

interface MyState {
    search: string,
}

export class ProductItem extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        };
    }

    render() {
        return (
            <div className="sm:flex-50 max-w-xs sm:w-full sm:flex-shrink-0 my-3 pb-5 sm:px-2">
                <div className="relative pb-5/6 bg-white rounded-lg shadow-md">
                    <img className="absolute inset-0 h-full object-cover" width="400" height="200" src={this.props.product.get('image')} />
                </div>
                <div className="relative px-4 -mt-16">
                    <div className="bg-white rounded-lg px-4 py-4 shadow-lg">
                        <div className="flex">
                            <span className="inline-black px-2 py-2 leading-none bg-green-200 text-green-800 rounded-full font-semibold uppercase tracking-wide text-xs">Featured</span>
                            <div className="mt-2 ml-2 text-xs text-gray-600 font-semibold uppercase tracking-wide">
                                Fast &middot; Secure
                            </div>
                        </div>
                        <Link href={`/product/${encodeURIComponent(this.props.product.get('_id'))}`}>
                            <a className="text-gray-900 font-semibold text-lg ">{this.props.product.get('name')}</a>
                        </Link>
                        <div className="mt-2">
                            {this.props.product.get('description')}
                        </div>
                        <div className="mt-1">
                            <span className="text-gray-900 font-semibold">${this.props.product.get('price')}</span>
                        </div>
                        {/* <Comment items={this.props.reviews} />                    */}
                    </div>
                </div>
            </div>
        );
    }
}