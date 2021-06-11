import React from "react";
import Product from 'src/Product';
import { ProductItem } from "./ProductItem";
import nextConfig from 'next.config';
import { xRead } from "modules";

interface MyProps {

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
        xRead('products/featured').then((res) => {
            this.setState<typeof res.response.data>({
                items : res.response.data
            })
        })
    }

    render() {
        const items = this.state.items.map(
            (item) => <ProductItem product={item} key={item._id} />
        );
        return (
            <section className="mt-6 flex justify-center flex-wrap px-3">
                {items}
            </section>
        );
    }
}