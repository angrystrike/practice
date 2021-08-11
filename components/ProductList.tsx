import React from "react";
import { Product, fetchFeaturedProducts } from 'redux/models/Product';
import { ProductItem } from './ProductItem';
import { connect } from "react-redux";
import { get, List, Map } from 'immutable';
import { isEmpty } from "server/common";
import Entity from "redux/models/Entity";

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
        console.log('PRODUCTS', products);
        
        let featuredProducts = products && products
            .filter(t => t.get('featured') == true)
            .sort((a, b) => b.get('price') - a.get('price'))
            .reduce((accum, data) => (accum.size < 4 ? accum.push(data) : accum), List());

        console.log('fet', featuredProducts);
            
        return (
            <section className="mt-6 flex justify-center flex-wrap px-3">
                { 
                    featuredProducts && featuredProducts.valueSeq().map((product: any, i: number) =>
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

    return {
        products: allProducts
    };
};


export default connect(mapStateToProps, Entity.triggers())(ProductList);