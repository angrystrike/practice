import dynamic from 'next/dynamic'

const SimilarItem = dynamic(() => import('../components/SimilarItem'))
const Review = dynamic(() => import('../components/Review'))
const Header = dynamic(() => import('../components/Header'))
const Footer = dynamic(() => import('../components/Footer'))

export default function Product() {
  return (
    <div className="bg-gray-200">
      <Header />

      <div className="mt-8 pb-3 max-w-5xl mx-auto">
        <div className="mx-6 flex flex-col sm:flex-row py-3 px-4 bg-white rounded-lg shadow-lg">
          <div className="mx-2 sm:w-3/5 sm:mx-0 sm:self-start sm:px-5">
            <img className="mt-3 w-full rounded-lg shadow-md" width="400" height="200" src="/images/car.jpg" />
            <div className="mt-2 text-sm text-gray-600 flex justify-center items-center">
              <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
              <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
              <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
              <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
              <svg className="h-4 w-4 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
              <span className="ml-2">34 reviews</span>
            </div>
          </div>

          <div className="text-xl text-center sm:text-left">
            <div className="mt-5 sm:mt-3 font-bold text-xl">CAR NAME</div>
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

        <Footer />
      </div>
    </div>
  )
}
