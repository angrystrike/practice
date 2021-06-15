import React from "react";
import Product, { fetchFeaturedProducts } from 'redux/models/Product';
import { ProductItem } from './ProductItem';
import { connect } from "react-redux";

interface MyProps {
    fetchFeaturedProducts: () => void;
    products: Array<Product>;
}

interface MyState {
}

class ProductList extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }

    componentDidMount() {
        const { fetchFeaturedProducts } = this.props
        fetchFeaturedProducts()
    }

    render() {
        const { products } = this.props
        
        let items = products.map(           
            (item) => <ProductItem product={item} key={item._id} />
        );

        return (
            <section className="mt-6 flex justify-center flex-wrap px-3">
                { items }
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

const mapDispatchToProps = {
    fetchFeaturedProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);