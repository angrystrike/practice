import wrapper from '../../redux/store';
import { withRouter, NextRouter } from 'next/router'
import React from 'react'
import Layout from 'components/partials/Layout';
import { connect } from 'react-redux';
import saga from "redux/decorators/saga";
import ProductEntity from "redux/models/Product";
import { ProductItem } from 'components/ProductItem';


interface MyProps {
    fetchSearch: (data: any) => void;
    router: NextRouter;
    products: Map<string, any>;
}

interface MyState {
    input: string | string[];
}

@saga(ProductEntity)
class SearchPage extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props)
        this.state = {
            input: this.props.router.query.text
        };
    }

    public static getInitialProps = wrapper.getInitialAppProps(store => ({ query }) => {
        store.dispatch(ProductEntity.triggers().fetchSearch({ input: query?.text }));
    });

    render() {
        return (
            <Layout>
                <div className="pb-3 max-w-5xl mx-auto">
                    <section className="mt-6 flex justify-center flex-wrap px-3">
                        { 
                            this.props.products && this.props.products.valueSeq().map((product: any, i: number) =>
                                <ProductItem key={'product_item_' + i} product={product} />
                            )
                        }
                    </section>
                </div>
            </Layout>
        );
    }

    
}

const mapStateToProps = (state, props) => {
    const { entities } = state;
    const allProducts = entities.get('products');   
    const input = props.router.query.text;
    
    const searchProducts = allProducts && allProducts.filter(element => {
        return (element.get('name').toLowerCase().includes(input)) || 
        (element.get('description').toLowerCase().includes(input))
    })

    return {
        products: searchProducts
    };
}

const searchPage = connect(mapStateToProps, ProductEntity.triggers())(SearchPage);
export default withRouter(searchPage);
