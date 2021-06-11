import React from 'react'
import Product from 'src/Product';
import Layout from 'components/partials/Layout';
import { xRead } from 'modules';
import { ProductList } from 'components/ProductList';


interface MyProps {
    text: string;
    items: Array<Product>;
}

interface MyState {
    items: Array<Product>;
}

class SearchPage extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props)
        this.state = {
            items: this.props.items
        };
    }

    static async getInitialProps(ctx) {
        console.log('TEST')
        const [items] = await Promise.all([
            xRead('products/search/' + ctx.query.text).then((res) => res.response.data)
        ]);

        return {
            items: items
        };
    }

    render() {
        // console.log('state: ' + this.state.items[0].image)
        // console.log('props text: ' + this.props.text)
        return (
            <Layout>
                <div className="pb-3 max-w-5xl mx-auto">
                    <ProductList items={this.state.items} />
                </div>
            </Layout>
        );
    }
}

export default SearchPage
