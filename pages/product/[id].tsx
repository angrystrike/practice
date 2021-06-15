import { withRouter, NextRouter } from 'next/router'
import dynamic from 'next/dynamic'
import React from 'react'
import Product from 'redux/models/Product';
import User from 'redux/models/User';
import nextConfig from 'next.config'
import Layout from 'components/partials/Layout';
import Image from 'next/image'
import { xRead } from 'modules';
import { Comment } from '../../components/Comment';
import { connect } from 'react-redux';
import  { fetchProduct, fetchSimilarProducts } from 'redux/models/Product';

interface MyProps {
    fetchProduct: (productId: string | string[]) => void;
    fetchSimilarProducts: (productId: string | string[]) => void;
    product: Product;
    items: Array<Product>;
    router: NextRouter;
}

interface MyState {
}

class ProductPage extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props)
        this.state = {
        };
    }

    componentDidMount() {
        const { fetchProduct, router : { query } } = this.props;
        fetchProduct(query.id);

        const { fetchSimilarProducts } = this.props;
        fetchSimilarProducts(query.id);
    }

    render() {       
        const { product } = this.props
        console.log('Product render', product)

        const { items } = this.props
        console.log('items', items)

        // let similarItems = items.map(
        //     (item) =>
        //         <div className="mt-5 sm:ml-4 bg-white rounded-lg pt-2 pb-4 flex flex-row sm:flex-col items-center justify-center shadow-lg" key={item._id}>
        //             <img className="mt-3 self-center w-3/5 rounded-lg shadow-md" width="150" height="250" src={item.image} />
        //             <div className="ml-2 -mt-2 sm:mt-2">
        //                 <h5 className="text-xl sm:text-sm font-semibold">{item.name}</h5>
        //                 <Comment items={product.reviews} />
        //                 <div className="mt-2 text-gray-900 font-semibold text-xl text-center ">${item.price}</div>
        //             </div>
        //         </div>
        // );

        // let reviews = product.reviews.map(
        //     (item) =>
        //         <div className="mt-6 bg-white rounded-lg py-4 px-4 flex flex-row justify-center shadow-lg">
        //             <div className="sm:flex sm:flex-col items-center w-full">
        //                 <div className="sm:mt-1">
        //                     <img width="45" height="45" src={item.user.image} alt="profile" />
        //                 </div>
        //                 <div className="mt-3 sm:ml-3">
        //                     <h4 className="text-center sm:text-left text-lg font-semibold">{item.user.firstName} {item.user.lastName}</h4>
        //                     <div className="mb-3 text-center">
        //                         <span className="italic">august 14, 2018</span>
        //                     </div>

        //                     <Comment items={[item]} />
        //                 </div>
        //             </div>

        //             <div className="ml-4 text-center sm:text-left self-center">{item.text}</div>
        //         </div>
        // );

        return (
            <div>TEST</div>
            // <Layout>
            //     <div className="mt-8 pb-3 max-w-5xl mx-auto">
            //         <div className="mx-6 flex flex-col sm:flex-row py-3 px-4 bg-white rounded-lg shadow-lg">
            //             <div className="mx-2 sm:w-3/5 sm:mx-0 sm:self-start sm:px-5">
            //                 <img className="mt-3 w-full rounded-lg shadow-md" width="400" height="200" src={product.image} />
            //                 <div className="mt-3 flex flex-col items-center">
            //                     <div className="sm:mt-1">
            //                         <img className="rounded-md" width="45" height="45" src={product.user.image} />
            //                     </div>
            //                     <div className="text-center">
            //                         <h4 className="text-lg font-semibold">{product.user.firstName} {product.user.lastName}</h4>
            //                         <div className="">
            //                             <span className="italic">august 14, 2018</span>
            //                         </div>
            //                     </div>
            //                 </div>
            //             </div>

            //             <div className="sm:w-2/5 text-xl text-center sm:text-left">
            //                 <div className="mt-5 sm:mt-3 font-bold text-xl">{product.name}</div>
            //                 <Comment items={product.reviews} />

            //                 <div className="mt-5 font-semibold">
            //                     Price:
            //                     <span className="ml-2 font-normal">${product.price}</span>
            //                 </div>

            //                 <div className="mt-5 flex items-center justify-center sm:justify-start">
            //                     <label className="font-semibold">Color:</label>
            //                     <button className="ml-2 h-5 w-5 rounded-full bg-blue-600 border-2 border-blue-200 mr-2 focus:outline-none"></button>
            //                     <button className="h-5 w-5 rounded-full bg-gray-600 mr-2 focus:outline-none"></button>
            //                     <button className="h-5 w-5 rounded-full bg-black mr-2 focus:outline-none"></button>
            //                 </div>
            //                 <div className="mt-5 font-semibold">
            //                     Transmission:
            //                     <span className="mt-5 ml-2 font-normal">{product.transmission}</span>
            //                 </div>
            //                 <div className="mt-5 font-semibold">
            //                     Engine:
            //                     <span className="mt-5 ml-2 font-normal">{product.engine}</span>
            //                 </div>
            //                 <div className="mt-5"> {product.description} </div>
            //                 <button type="button" className="mt-3 sm:mt-9 px-7 font-medium py-1 text-white bg-blue-600 rounded-md shadow-lg">Order</button>
            //             </div>
            //         </div>

            //         <section className="mt-3 mx-6 py-3 rounded-lg justify-center">
            //             <h2 className="mt-2 text-4xl text-center">Similar Cars</h2>
            //             <div className="sm:flex sm:flex-row sm:flex-nowrap">
            //                 {similarItems}
            //             </div>
            //         </section>

            //         <section className="p-3 rounded-lg justify-center">
            //             <h2 className="mt-2 text-4xl text-center">Reviews</h2>
            //             {reviews}
            //         </section>
            //     </div>
            // </Layout>            
        );
    }
}

const mapStateToProps = (state, props) => {
    const { products } = state;
    const { router } = props;
    return {
        product : router ? products.find(o => o._id === router.query.id) : null,
        items : router ? products.filter(o => o._id !== router.query.id) : null,
    };
};

const mapDispatchToProps = {
    fetchProduct,
    fetchSimilarProducts
}

const prodPage = connect(mapStateToProps, mapDispatchToProps)(ProductPage);

export default withRouter(prodPage);


        

/*          */