import React from "react";
import Product, { fetchFeaturedProducts } from 'redux/models/Product';
import { ProductItem } from "./ProductItem";
import { xRead } from "modules";
import { connect } from "react-redux";

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
        const { fetchFeaturedProducts } = this.props
        fetchFeaturedProducts();
        //if (this.props.items.length === 0) {
            // xRead('products/featured').then((res) => {
            //     this.setState<typeof res.response.data>({
            //         items: res.response.data
            //     })
            // })           
            // const test = fetchFeaturedProducts();
            // console.log(test);            
    
       // }
    }

    render() {
        // let items;
        // if (this.props.items.length === 0) {
        //     items = this.state.items.map(
        //         (item) => <ProductItem product={item} key={item._id} />
        //     );
        // } else {
        //     items = this.props.items.map(
        //         (item) => <ProductItem product={item} key={item._id} />
        //     );
        // }
        const { products } = this.props
        console.log("product list: " +  products)
        return (
            <section className="mt-6 flex justify-center flex-wrap px-3">
                 {/* {items} */} 
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    const { products } = state;
    return {
        products
    };
};

export default connect(mapStateToProps, { fetchFeaturedProducts }) (ProductList);