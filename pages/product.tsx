import Layout from 'components/partials/Layout'
import dynamic from 'next/dynamic'
import React from 'react'

const SimilarItem = dynamic(() => import('../partials/SimilarItem'))
const Review = dynamic(() => import('../partials/Review'))


export default function Product() {
  return (
    <Layout>

      <div className="mt-8 pb-3 max-w-5xl mx-auto">
        <div className="mx-6 flex flex-col sm:flex-row py-3 px-4 bg-white rounded-lg shadow-lg">
          <div className="mx-2 sm:w-3/5 sm:mx-0 sm:self-start sm:px-5">
            <img className="mt-3 w-full rounded-lg shadow-md" width="400" height="200" src="/images/car.jpg" />
            <div className="mt-3 flex flex-col items-center">
              <div className="sm:mt-1">
                <svg className="mx-auto sm:mx-0" xmlns="http://www.w3.org/2000/svg" width="45.532" height="45.532"><path d="M22.766.001C10.194.001 0 10.193 0 22.766s10.193 22.765 22.766 22.765c12.574 0 22.766-10.192 22.766-22.765S35.34.001 22.766.001zm0 6.807a7.53 7.53 0 11.001 15.06 7.53 7.53 0 01-.001-15.06zm-.005 32.771a16.708 16.708 0 01-10.88-4.012 3.209 3.209 0 01-1.126-2.439c0-4.217 3.413-7.592 7.631-7.592h8.762c4.219 0 7.619 3.375 7.619 7.592a3.2 3.2 0 01-1.125 2.438 16.702 16.702 0 01-10.881 4.013z" /></svg>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold">John Smith</h4>
                <div className="">
                  <span className="italic">august 14, 2018</span>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:w-2/5 text-xl text-center sm:text-left">
            <div className="mt-5 sm:mt-3 font-bold text-xl">CAR NAME</div>
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
              <span className="ml-2 font-normal">$3,400</span>
            </div>

            <div className="mt-5 flex items-center justify-center sm:justify-start">
              <label className="font-semibold">Color:</label>
              <button className="ml-2 h-5 w-5 rounded-full bg-blue-600 border-2 border-blue-200 mr-2 focus:outline-none"></button>
              <button className="h-5 w-5 rounded-full bg-gray-600 mr-2 focus:outline-none"></button>
              <button className="h-5 w-5 rounded-full bg-black mr-2 focus:outline-none"></button>
            </div>
            <div className="mt-5 font-semibold">
              Transmission:
            <span className="mt-5 ml-2 font-normal">Automat</span>
            </div>
            <div className="mt-5 font-semibold">
              Engine:
              <span className="mt-5 ml-2 font-normal">Diesel</span>
            </div>
            <div className="mt-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Duis non felis volutpat, pellentesque tellus vel, iaculis odio.
            </div>
            <button type="button" className="mt-3 sm:mt-9 px-7 font-medium py-1 text-white bg-blue-600 rounded-md shadow-lg">Order</button>
          </div>

        </div>

        <section className="mt-3 mx-6 py-3 rounded-lg justify-center">
          <h2 className="mt-2 text-4xl text-center">Similar Cars</h2>
          <div className="sm:flex sm:flex-row sm:flex-nowrap">
            <SimilarItem />
            <SimilarItem />
            <SimilarItem />
          </div>
        </section>

        <section className="p-3 rounded-lg justify-center">
          <h2 className="mt-2 text-4xl text-center">Reviews</h2>
          <Review />
          <Review />
          <Review />
        </section>

      
      </div>
    </Layout>
  )
}