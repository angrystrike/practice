import React from "react";
import { Product, fetchFeaturedProducts } from 'redux/models/Product';
import { ProductItem } from './ProductItem';
import { connect } from "react-redux";
import { get, Map } from 'immutable';

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
        const { fetchFeaturedProducts } = this.props;
        fetchFeaturedProducts();
    }

    render() {
        const { products } = this.props;

        let items = [];
        for (var i in products) {
            if (products.hasOwnProperty(i)) {
                items.push(<ProductItem product={products[i]} key={products[i]._id} />);
            }
        }

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