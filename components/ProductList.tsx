import React from "react";
import Product from 'src/Product';
import { ProductItem } from "./ProductItem";
import nextConfig from 'next.config';
import { xRead } from "modules";

interface MyProps {
    items: Array<Product>;
}

interface MyState {
    items: Array<Product>,
}

export class ProductList extends React.Component<MyProps, MyState> {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }

    componentDidMount() {
        if (this.props.items.length === 0) {
            xRead('products/featured').then((res) => {
                this.setState<typeof res.response.data>({
                    items: res.response.data
                })
            })
        }
    }

    render() {
        let items;
        if (this.props.items.length === 0) {
            items = this.state.items.map(
                (item) => <ProductItem product={item} key={item._id} />
            );
        } else {
            items = this.props.items.map(
                (item) => <ProductItem product={item} key={item._id} />
            );
        }
        return (
            <section className="mt-6 flex justify-center flex-wrap px-3">
                {items}
            </section>
        );
    }
}