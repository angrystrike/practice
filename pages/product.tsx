import dynamic from 'next/dynamic'

const SimilarItem = dynamic(() => import('../components/SimilarItem'))
const Review = dynamic(() => import('../components/Review'))
const Header = dynamic(() => import('../components/Header'))
const Footer = dynamic(() => import('../components/Footer'))

export default function Product() {
  return (
    <div className="pb-2 bg-gray-200 px-3 max-w-5xl mx-auto">
      <Header />
      
      <h1 className="mt-4 text-3xl text-center">Product title</h1>
      <section className="mt-3 mx-4 p-3 rounded-lg bg-white flex flex-col sm:flex-row items-center shadow-lg">

        <div className="mx-auto sm:mx-0 sm:self-start lg:px-5">
          <img className="mt-3 rounded-lg shadow-md" width="400" height="200" src="/images/car.jpg" />
          <div className="mt-2 text-sm text-gray-600 flex justify-center items-center">
            <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
            <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
            <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
            <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
            <svg className="h-4 w-4 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
            <span className="ml-2">34 reviews</span>
          </div>
        </div>

        <div className="mt-3 sm:ml-5 sm:mt-6 w-4/5">
          <div className="mt-2 pt-2 pb-4 border-b border-solid border-gray-500 flex flex-row items-center">
            <div className="mt-2 text-gray-900 font-semibold text-xl">$3.400</div>
            <div className="ml-2 w-full sm:w-1/2">
              <label>
                <span className="text-sm font-semibold">Select color:</span>
                <select className="form-select bg-gray-500 text-white block w-full focus:bg-gray-600 rounded-md shadow-lg">
                  <option>Blue</option>
                  <option>Black</option>
                  <option>White</option>
                </select>
              </label>
            </div>
          </div>

          <div className="my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Duis non felis volutpat, pellentesque tellus vel, iaculis odio.
          </div>
          <div className="flex justify-center">
            <button className="px-4 py-2 w-20 block text-white bg-blue-500 font-semibold rounded-lg">Buy</button>
          </div>
        </div>
      </section>

      <section className="mt-3 ml-0 mr-4 py-3 rounded-lg justify-center">
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
  )
}
