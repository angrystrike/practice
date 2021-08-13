import { connect } from 'react-redux';
import React from 'react'
import Layout from 'components/partials/Layout';
import ProductList from 'components/ProductList';
import saga from 'redux/decorators/saga';
import ProductEntity from "redux/models/Product";
import { withRouter, NextRouter, useRouter } from 'next/router'
import { List } from 'immutable';
import { ProductItem } from 'components/ProductItem';

interface MyProps {
    fetchSearch: (data: any) => void;
    router: NextRouter;
    products: Map<string, any>;
}

interface MyState {
    input: string | string[];
    // items: Array<Product>;
}

@saga(ProductEntity)
class SearchPage extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props)
        this.state = {
            input: this.props.router.query.text
        };
    }


    componentDidMount() {
        const { fetchSearch, router: { query } } = this.props;
        console.log('did mount', query.text);
        
        fetchSearch({ input: query.text });
    }

    // static async getInitialProps({req, query: { text }}) {
    //     return {
    //         input: text
    //     }
    // }
    // componentDidMount() {
    //     const { fetchSearch } = this.props;
    //     fetchSearch({ input: this.props.input });
    // }

    // componentDidMount() {
    //     console.log('searrch page');
    //     const { fetchSearch, router: { query } } = this.props;
        
    //     // fetchProduct({ productId: query.id });
        
    //     console.log('input', query.text);
        
    //     // fetchSearch({ input: query.text });
    // }

    render() {
        console.log('TEXT', this.state.input);
        console.log('PRODS', this.props.products);
        
        return (
            <Layout>
                <div className="pb-3 max-w-5xl mx-auto">
                <section className="mt-6 flex justify-center flex-wrap px-3">
                { 
                    this.props.products.valueSeq().map((product: any, i: number) =>
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
    console.log( props.router.query.text);
    
    const searchProducts = allProducts.filter(element => {
        return (element.get('name').includes(input)) || (element.get('description').includes(input))
    })

    return {
        products: searchProducts
    };
}

const searchPage = connect(mapStateToProps, ProductEntity.triggers())(SearchPage);
export default withRouter(searchPage);
