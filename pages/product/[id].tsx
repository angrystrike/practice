import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import React from 'react'
import Product from 'src/Product';
import User from 'src/User';
import nextConfig from 'next.config'
import Layout from 'components/partials/Layout';
import Image from 'next/image'
interface MyProps {
    id: string,
    product: Product,
    similarProducts: Array<Product>
}

interface MyState {
    product: Product,
    similarProducts: Array<Product>
}

class ProductPage extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props)
        this.state = {
            product: this.props.product,
            similarProducts: this.props.similarProducts
        };
    }

    static async getInitialProps(ctx) {
        const [item, similarItems] = await Promise.all([
            fetch(nextConfig.public.BASE_URL + '/products/' + ctx.query.id).then(r => r.json()),
            fetch(nextConfig.public.BASE_URL + '/products/similar/' + ctx.query.id).then(r => r.json())
        ]);
        
        return {
            product: item.data,
            similarProducts: similarItems.data
        };
    }

    render() {
        const items = this.state.similarProducts.map(
            (item) => 
                
                <div className="mt-5 sm:ml-4 bg-white rounded-lg pt-2 pb-4 flex flex-row sm:flex-col items-center justify-center shadow-lg" key={item._id}>
                    <img className="mt-3 self-center w-3/5 rounded-lg shadow-md" width="150" height="250" src={item.image} />
                    <div className="ml-2 -mt-2 sm:mt-2">
                        <h5 className="text-xl sm:text-sm font-semibold">{item.name}</h5>
                        <div className="mt-2 text-sm text-gray-600 flex justify-center items-center">
                            <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                            <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                            <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                            <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                            <svg className="h-4 w-4 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                        </div>
                        <div className="mt-2 text-gray-900 font-semibold text-xl text-center ">${item.price}</div>
                    </div>
                </div>          
        );
        
        return (
            <Layout>
                <div className="mt-8 pb-3 max-w-5xl mx-auto">
                    <div className="mx-6 flex flex-col sm:flex-row py-3 px-4 bg-white rounded-lg shadow-lg">
                        <div className="mx-2 sm:w-3/5 sm:mx-0 sm:self-start sm:px-5">
                            <img className="mt-3 w-full rounded-lg shadow-md" width="400" height="200" src={this.state.product.image} />
                            <div className="mt-3 flex flex-col items-center">
                                <div className="sm:mt-1">
                                    <img className="rounded-md" width="45" height="45" src={this.state.product.user.image} />                                   
                                </div>
                                <div className="text-center">
                                    <h4 className="text-lg font-semibold">{this.state.product.user.firstName} {this.state.product.user.lastName}</h4>
                                    <div className="">
                                        <span className="italic">august 14, 2018</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sm:w-2/5 text-xl text-center sm:text-left">
                            <div className="mt-5 sm:mt-3 font-bold text-xl">{this.state.product.name}</div>
                            <div className="mt-2 text-sm text-gray-600 flex justify-center sm:justify-start items-center">
                                <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                                <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                                <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                                <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                                <svg className="h-4 w-4 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                                <span className="ml-2">34 reviews</span>
                            </div>
                            <div className="mt-5 font-semibold">
                                Price:
                        <span className="ml-2 font-normal">${this.state.product.price}</span>
                            </div>

                            <div className="mt-5 flex items-center justify-center sm:justify-start">
                                <label className="font-semibold">Color:</label>
                                <button className="ml-2 h-5 w-5 rounded-full bg-blue-600 border-2 border-blue-200 mr-2 focus:outline-none"></button>
                                <button className="h-5 w-5 rounded-full bg-gray-600 mr-2 focus:outline-none"></button>
                                <button className="h-5 w-5 rounded-full bg-black mr-2 focus:outline-none"></button>
                            </div>
                            <div className="mt-5 font-semibold">
                                Transmission:
                            <span className="mt-5 ml-2 font-normal">{this.state.product.transmission}</span>
                            </div>
                            <div className="mt-5 font-semibold">
                                Engine:
                        <span className="mt-5 ml-2 font-normal">{this.state.product.engine}</span>
                            </div>
                            <div className="mt-5"> {this.state.product.description} </div>
                            <button type="button" className="mt-3 sm:mt-9 px-7 font-medium py-1 text-white bg-blue-600 rounded-md shadow-lg">Order</button>
                        </div>
                    </div>

                    <section className="mt-3 mx-6 py-3 rounded-lg justify-center">
                        <h2 className="mt-2 text-4xl text-center">Similar Cars</h2>
                        <div className="sm:flex sm:flex-row sm:flex-nowrap">
                            {items}
                        </div>
                    </section>
                </div>
            </Layout>
        );
    }
}

export default ProductPage
