import Image from 'next/image'
import dynamic from 'next/dynamic'

const CarItem = dynamic(() => import('../components/CarItem'))
const Header = dynamic(() => import('../components/Header'))
const Footer = dynamic(() => import('../components/Footer'))

export default function Home() {
  return (
    <div className="pb-3 max-w-5xl bg-gray-200 mx-auto">
      <Header />
      <section className="mt-5 px-3 pb-4 border-b border-gray-400">
        <div className="flex flex-col bg-white rounded-lg py-3 my-3">
          <h2 className="text-center text-gray-800 text-3xl">Featured categories</h2>
          <p className="mt-2 text-gray-600 text-center">Categories can help you find the best car</p>
        </div>

        <div className="mt-4 sm:w-full flex flex-col sm:flex-wrap sm:flex-row items-center px-4">
          <div className="mt-2 sm:w-1/2 bg-white sm:bg-gray-200 rounded-lg px-4 pt-4 pb-2 shadow-lg sm:shadow-none">
            <Image className="rounded-md" width="500" height="250" src="/images/lamborghini.jpg" />
            <div className="font-semibold text-center">Lamborghini</div>
          </div>
          <div className="mt-3 sm:w-1/2 bg-white sm:bg-gray-200  rounded-lg px-4 pt-4 pb-2 shadow-lg sm:shadow-none">
            <Image className="rounded-md" width="500" height="250" src="/images/car.jpg" />
            <div className="font-semibold text-center">Casual</div>
          </div>
          <div className="mt-3 sm:w-1/2 bg-white sm:bg-gray-200  rounded-lg px-4 pt-4 pb-2 shadow-lg sm:shadow-none">
            <Image className="rounded-md" width="500" height="250" src="/images/range-rover.jpg" />
            <div className="font-semibold text-center">Range-rover</div>
          </div>
          <div className="mt-3 sm:w-1/2 bg-white sm:bg-gray-200  rounded-lg px-4 pt-4 pb-2 shadow-lg sm:shadow-none">
            <Image className="rounded-md" width="500" height="250" src="/images/transport.jpg" />
            <div className="font-semibold text-center">Transporting</div>
          </div>
        </div>
      </section>

      <section className="mt-6 flex justify-center flex-wrap px-3">
        <CarItem />
        <CarItem />
        <CarItem />
        <CarItem />
      </section>

      <Footer />
    </div>
  )
}
