import React from "react";
import { Product } from 'redux/models/Product';
import { ProductItem } from './ProductItem';
import { connect } from "react-redux";
import { get, List, Map } from 'immutable';
import { isEmpty } from "server/common";
import ProductEntity  from 'redux/models/Product';
import saga from "redux/decorators/saga";

interface MyProps {
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

    render() {
        const { products } = this.props;
        
        let featuredProducts = products && products
            .filter(t => t.get('featured') == true)
            .sort((a, b) => b.get('price') - a.get('price'))
            .reduce((accum, data) => (accum.size < 4 ? accum.push(data) : accum), List());

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


export default connect(mapStateToProps, ProductEntity.triggers())(ProductList);