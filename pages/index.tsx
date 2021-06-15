import Image from 'next/image'
import React from 'react'
import ProductList from 'components/ProductList'
import Layout from 'components/partials/Layout'

export default function Home() {
  return (
    <Layout>
      <div className="pb-3 max-w-5xl mx-auto">
        <section id="categories" className="mt-5 mx-6 pb-4 bg-white rounded-lg">
          <div className="flex flex-col py-3 my-3">
            <h2 className="text-center text-3xl">Categories</h2>
          </div>

          <div className="mt-4 sm:w-full flex flex-col sm:flex-wrap sm:flex-row items-center px-4">
            <div className="mt-2 sm:w-1/2  px-4 pt-4 pb-2">
              <Image className="rounded-md" width="500" height="250" src="/images/lamborghini.jpg" />
              <div className="font-semibold text-center">Lamborghini</div>
            </div>
            <div className="mt-3 sm:w-1/2 px-4 pt-4 pb-2">
              <Image className="rounded-md" width="500" height="250" src="/images/car.jpg" />
              <div className="font-semibold text-center">Casual</div>
            </div>
            <div className="mt-3 sm:w-1/2 px-4 pt-4 pb-2">
              <Image className="rounded-md" width="500" height="250" src="/images/range-rover.jpg" />
              <div className="font-semibold text-center">Range-rover</div>
            </div>
            <div className="mt-3 sm:w-1/2  px-4 pt-4 pb-2">
              <Image className="rounded-md" width="500" height="250" src="/images/transport.jpg" />
              <div className="font-semibold text-center">Transporting</div>
            </div>
          </div>
        </section>

        <ProductList />
      </div>

    </Layout>
  )
}
