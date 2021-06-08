import React from "react";
import { Product } from "server/models/Product";
import { ProductItem } from "./ProductItem";

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
        console.log('mountLIST')
        fetch('/products/featured', { method: 'GET' })
            .then(response => response.json())
            .then(
                (result) => {                       
                    // console.log(result.data);
                    this.setState<typeof result.data>({ 
                        items: result.data 
                    });
                    //console.log(this.state);                               
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    render() {
        const items = this.state.items.map(         
            (item) => <ProductItem product={item} key={item.name} />            
        );
        return (
            <section className="mt-6 flex justify-center flex-wrap px-3">
                {items}
            </section>
        );
    }
} 