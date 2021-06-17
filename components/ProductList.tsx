import React from "react";
import { Product, fetchFeaturedProducts } from 'redux/models/Product';
import { ProductItem } from './ProductItem';
import { connect } from "react-redux";
import { get, List, Map } from 'immutable';
import { isEmpty } from "server/common";

interface MyProps {
    fetchFeaturedProducts: () => void;
    products: Map<string, Product>;
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

        return (
            <section className="mt-6 flex justify-center flex-wrap px-3">
                { 
                    products && products.valueSeq().map((product: any, i: number) =>
                        <ProductItem key={'product_item_' + i} product={product} />
                    )
                }
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    const { entities } = state;
    const allProducts = !isEmpty(entities) && entities.get('products');

    let featuredProducts = allProducts && allProducts
    .filter(t => t.get('featured') == true)
    .sortBy(f => f.get('price'))
    .reduce((accum, data) => (accum.size < 4 ? accum.push(data) : accum), List())

    return {
        products: featuredProducts
    };
};

const mapDispatchToProps = {
    fetchFeaturedProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);