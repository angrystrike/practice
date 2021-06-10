import React from "react";
import Product from 'src/Product';
import { ProductItem } from "./ProductItem";
import nextConfig from 'next.config';

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
        fetch('/products/featured', { method: 'GET' })
        .then(response => response.json())
        .then(
            (result) => {                                       
                console.log(result);  
                this.setState<typeof result.data>({ 
                    items: result.data 
                });                                 
            },
            (error) => {
                console.log(error);
            }
        )
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