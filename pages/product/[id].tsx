import Link from "next/link";
import { withRouter, NextRouter, Router } from 'next/router'
import React from 'react'
import Layout from 'components/partials/Layout';
import { Comment } from '../../components/Comment';
import { connect } from 'react-redux';
import { fetchProduct, fetchSimilarProducts } from 'redux/models/Product';
import { isEmpty } from 'server/common';
import { List } from 'immutable';

interface MyProps {
    fetchProduct: (productId: string | string[]) => void;
    fetchSimilarProducts: (productId: string | string[]) => void;
    product: Map<string, any>;
    similarProducts: Map<string, any>;
    users: Map<string, any>;
    reviews: Map<string, any>;
    owner: Map<string, any>;
    router: NextRouter;
}

interface MyState {
    productId: string | string[];
}

class ProductPage extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props)
        this.state = {
            productId: this.props.router.query.id
        };
    }

    componentDidMount() {
        const { fetchProduct, fetchSimilarProducts, router: { query } } = this.props;
        //const { fetchProduct, router: { query } } = this.props;
        fetchProduct(query.id);
        fetchSimilarProducts(query.id);
    }

    render() {
        const { product, users, reviews, owner, similarProducts } = this.props
        console.log('product', product);
        console.log('reviews', reviews);
        console.log('users', users);
        
        
        const reviewsItems = reviews ? reviews.valueSeq().map(
            (item) => {
                console.log('review', item);
                
                const reviewUser = users.get(item.get('user'));
                console.log('reviewUser', reviewUser);
                
                const reviewMark = new List([item]);

                return (
                    <div key={item?.get('_id')} className="mt-6 bg-white rounded-lg p-4 flex flex-row justify-center shadow-lg">
                        <div className="sm:flex sm:flex-col items-center w-3/12">
                            <div className="sm:mt-1">
                                <img width="45" height="45" src={reviewUser?.get('image')} alt="profile" />
                            </div>
                            <div className="mt-3 sm:ml-3">
                                <h4 className="text-center sm:text-left text-lg font-semibold">{reviewUser?.get('firstName')} {reviewUser?.get('lastName')}</h4>
                                <Comment items={reviewMark} />
                            </div>
                        </div>

                        <div className="ml-4 text-center sm:text-left w-9/12">{item?.get('text')}</div>
                    </div>
                )
            }
        ) : []

        const similarItems = similarProducts ? similarProducts.valueSeq().map(
            (item) => {
                if (item.get('_id') != product.get('_id')) {
                    return (
                        <div className="mt-5 sm:ml-4 bg-white rounded-lg pt-2 pb-4 flex flex-row sm:flex-col items-center justify-center shadow-lg" key={item?.get('_id')}>
                            <img className="mt-3 self-center w-3/5 rounded-lg shadow-md" width="150" height="250" src={item?.get('image')} />
                            <div className="ml-2 -mt-2 sm:mt-2">
                                <Link href={`/product/${encodeURIComponent(item?.get('_id'))}`}>
                                    <a className="text-xl sm:text-md font-semibold">{item?.get('name')}</a>
                                </Link>
                                <div className="mt-2 text-gray-900 font-semibold text-xl text-center ">${item?.get('price')}</div>
                            </div>
                        </div>
                    )
                }
            }
        ) : []

        return (
            <Layout>
                <div className="mt-8 pb-3 max-w-5xl mx-auto">
                    <div className="mx-6 flex flex-col sm:flex-row py-3 px-4 bg-white rounded-lg shadow-lg">
                        <div className="mx-2 sm:w-3/5 sm:mx-0 sm:self-start sm:px-5">
                            <img className="mt-3 w-full rounded-lg shadow-md" width="400" height="200" src={product?.get('image')} />
                            <div className="mt-3 flex flex-col items-center">
                                <div className="sm:mt-1">
                                    <img className="rounded-md" width="45" height="45" src={owner?.get('image')} />
                                </div>
                                <div className="text-center">
                                    <h4 className="text-lg font-semibold">{owner?.get('firstName')} {owner?.get('lastName')}</h4>
                                </div>
                            </div> 
                        </div>

                        <div className="sm:w-2/5 text-xl text-center sm:text-left">
                            <div className="mt-5 sm:mt-3 font-bold text-xl">{product?.get('name')}</div>
                            <Comment items={reviews} />

                            <div className="mt-5 font-semibold">
                                Price:
                                <span className="ml-2 font-normal">${product?.get('price')}</span>
                            </div>                          

                            <div className="mt-5 font-semibold">
                                Transmission:
                                <span className="mt-5 ml-2 font-normal">{product?.get('transmission')}</span>
                            </div>

                            <div className="mt-5 font-semibold">
                                Engine:
                                <span className="mt-5 ml-2 font-normal">{product?.get('engine')}</span>
                            </div>

                            <div className="mt-5"> {product?.get('description')} </div>

                            <button type="button" className="mt-3 sm:mt-9 px-7 font-medium py-1 text-white bg-blue-600 rounded-md shadow-lg">Order</button>
                        </div>
                    </div>

                    <section className="p-3 rounded-lg justify-center">
                        <h2 className="mt-2 text-4xl text-center">Reviews</h2>
                        {reviewsItems} 
                    </section>

                    <section className="mt-3 mx-6 py-3 rounded-lg">
                        <h2 className="mt-2 text-4xl text-center">Similar Cars</h2>
                        <div className="sm:flex sm:flex-row sm:flex-nowrap justify-between">
                            {similarItems}
                        </div>
                    </section>
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = (state, props) => {
    const { entities } = state;
    const { router } = props

    let reviews = null;
    let users = null;
    let owner = null;
    let similarProducts = List();
    const product = !isEmpty(entities) && entities.getIn(['products', router.query.id]);

    if (product) {
        const ar = entities.get('reviews');
        reviews = product
            .get('reviews')
            .reduce((accum, data) => (ar?.get(data) ? accum.push(ar.get(data)) : accum), List())

        const u = entities.get('users');
        console.log('USERS', u);

        owner = u?.get(product.get('user'))

        users = reviews
            .map(r => r.get('user'))
            .reduce((accum, key) => (u?.get(key) ? accum.set(key, u.get(key)) : accum), new Map())

        const allProducts = entities.get('products');

        similarProducts = allProducts
            .filter(element => {
                return (element.get('engine') == product.get('engine')) &&
                    (element.get('transmission') == product.get('transmission'))
            })
            .reduce((accum, item) => {
                return accum.size < 4 ? accum.push(item) : accum
            }, List())
    };

    return {
        product,
        reviews,
        users,
        owner,
        similarProducts
    };
}

const mapDispatchToProps = {
    fetchProduct,
    fetchSimilarProducts
}

const prodPage = connect(mapStateToProps, mapDispatchToProps)(ProductPage);
export default withRouter(prodPage);