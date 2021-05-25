import Image from 'next/image'

export default function Product() {
  return (
    <div className="max-w-5xl mx-auto">
      <header className="bg-gray-200 pb-6">
        <div className="flex justify-between">
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 1280 826"><path d="M322.7 154.7c-1.2 1.1-.8 6.2.8 10 2 4.8 2 4.9-1.6 1.9-4.8-4-8.9-6-10.2-4.7-1.4 1.4.6 13.2 3.8 22.4 3.8 10.9 9.9 20.3 18.9 29.2 8.9 8.9 22.4 20 25.5 21 1 .3 5.2 4.5 9.3 9.3 7.3 8.6 17 17.6 23.8 22.2 1.9 1.3 7 5.7 11.2 9.7 4.3 4 14 11.9 21.5 17.4 15.5 11.5 42 37.1 51.4 49.9 11.6 15.6 17.3 28.1 16.7 36.3-.4 5.6-3.3 7.4-20.9 13.1-16 5.2-24.1 10.1-31.1 18.9-4.6 5.9-9.8 16.1-9.8 19.4 0 1.2-1.4 4.3-3.1 6.8-5.6 8.3-4.8 16.6 2.1 21.5l3 2.2 4-3.2c6.3-5 11.3-6 28.9-6 8.6.1 17.4.5 19.6 1 10.4 2.3 32.3 8.3 44 11.9 16.5 5.2 44 11.1 51.5 11.1 5.2 0 5.9.3 7.6 2.7 2.7 4.3 14.1 15.9 21.6 22 4.2 3.4 7.8 7.4 9.8 11 4.6 8.2 10.8 16.2 25.9 33.7 12.6 14.6 37.1 31 59.4 39.7 2.9 1.1 6.3 3.1 7.7 4.4 1.4 1.3 10.8 7.7 21 14.3 29.6 19.2 34.3 22.7 50.5 38.2 14.6 14 21.5 19 26.1 19 1.1 0 3.1 1.1 4.4 2.5 1.5 1.5 3.4 2.5 5.2 2.5 1.6 0 3.8.5 4.9 1.1 1.2.6 2.7.8 3.5.5 3.3-1.3-5.4-13.7-23.3-33.3-16.6-18.2-21.5-24.1-18.2-21.9 2.7 1.7 17.5 17.1 52.4 54.5 23.7 25.4 28.5 28.5 28.5 18.8 0-3.8-.9-5.4-8.5-15.2-4.7-6.1-12.2-15.2-16.6-20.4-6-6.9-7.5-9.1-5.8-8.6 2.6.8 2.7.8 4.7.6 4.4-.4-5.5-16.5-19.2-30.9-3.6-3.8-3.8-4.2-1.8-4.2 1.2 0 2.2-.6 2.2-1.3 0-2.2-5-9.1-13.1-17.9-4.1-4.6-8.9-10.1-10.7-12.4-1.8-2.2-8.2-8.5-14.3-13.9-9.7-8.7-10.8-10-9-10.7 2.5-.9 2.5-1.1.6-4.8-1.5-2.9-1.5-3 .6-3 1.9 0 2-.4 1.6-3.8-1.9-12.5-1.9-12.5-7.2-15.9-2.7-1.8-5.4-3.6-5.8-4-1.2-1.2-6.9-10-9.4-14.5l-2.3-4 2.8.6c1.5.4 5.7 1.3 9.4 2.1 15.2 3.2 104.1 44.4 123.1 57 4.3 2.8 6.9 3.9 10 3.9 3.6.1 4.2-.2 4.5-2.2.5-3.4-1.6-8.8-5.4-13.7L896 544h2.8c6.5 0 8.4-5.6 4.6-13.6-2.4-4.9-14-17.3-17-18-2-.5-2.4-1.3-2.4-4.3 0-5.3-11.2-20-17.5-23-2.5-1.2-5.1-2.1-5.9-2.1-1.6 0-15.7-9.2-17.6-11.5-1.1-1.3-1-1.4.4-.9.9.3 2.7.3 4.1 0 5.5-1.4 1.9-14.1-4.5-16.1-1.4-.5-2-1.5-2-3.8 0-4.5-3.2-10-6.3-10.8-3.5-.9-12.7-6-12.7-7.1 0-.4 1.1-.8 2.4-.8 2.8 0 7.6-4.2 7.6-6.7 0-2.4-1-3.7-3.7-5.2-1.6-.8-2.3-2.1-2.3-4.2 0-2.3-.7-3.4-2.9-4.7-1.7-.9-3.4-2.6-4-3.8-.8-1.9-2-2.2-12.1-2.6-6.1-.3-23.6-.3-38.8-.1-19.3.4-29.5.2-33.7-.6-3.3-.7-14.6-1.5-25.1-1.8l-19.1-.6-1.8-3.9c-.9-2.1-3.3-5.5-5.3-7.4-2-1.9-3.7-4.5-3.7-5.7 0-1.8-.7-2.3-3.5-2.5-2.9-.2-4.1-1.1-7.1-5.5-2-2.9-3.9-6.2-4.3-7.4-.8-2.5-5.8-6.8-15.2-13.1-3.3-2.2-7.2-5.8-8.6-8-4-6-13.6-16-18.7-19.5-6-4-19.1-16.7-19.1-18.4 0-2.8-7.2-9.1-15.7-13.5-4.8-2.5-15.3-7.1-23.3-10.2-8-3.1-22.1-9.5-31.5-14.2-9.3-4.6-17.5-8.4-18.1-8.4-.6 0-2.6-1.4-4.4-3.1-3.8-3.7-11.9-7.5-25.5-12-5.5-1.8-10.1-3.4-10.3-3.5-.2-.1 1-2.1 2.7-4.5 1.7-2.3 3.1-5 3.1-6.1 0-4.5-12.5-13.8-22.7-16.8-3.7-1.1-4-1.5-3-3.1 1.5-2.3-.1-6.8-2.8-8.2-3.2-1.6-4.7-2.5-9.5-5.7-2.5-1.6-7.6-4-11.5-5.2-3.8-1.2-8.1-3.2-9.5-4.4-3.6-3.3-10.3-6-19.4-7.9-8.2-1.6-9.7-1.5-7.7.9 1.1 1.2.6 1.3-3.1.1-2.4-.7-6.8-1.6-9.8-2-4.7-.6-6-1.3-8.8-4.5-3-3.6-3.7-3.9-10-4.5-11-1-10.7-.8-16.2-9.9l-5.1-8.3-6.1-.7c-7.8-.8-11.3-.8-12.1.1z" /></svg>
          <div>
            <button type="button" className="mt-4 mr-4 px-4 py-3 text-white bg-blue-500 rounded-md">Login</button>
          </div>
        </div>
      </header>

      <section className="mt-8 px-5 flex flex-col items-center">
        <div className="mx-auto">
          <img className="rounded-lg shadow-md" width="400" height="200" src="/images/car.jpg" />
        </div>
        <div className="mt-5 w-3/5">
          <div>
            <h1 className="text-3xl">Product title</h1>
            <div className="text-sm text-gray-600 mt-2 flex items-center">
              <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
              <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
              <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
              <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
              <svg className="h-4 w-4 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
              <span className="ml-2">34 reviews</span>
            </div>
            <div className="mt-2 pt-2 pb-4 border-b border-t border-solid border-gray-500 flex flex-row items-center">
              <div className="mt-2 text-gray-900 font-semibold text-xl">$3.400</div>
              <div className="ml-2 w-full">
                <label>
                  <span className="text-sm font-semibold text-gray-500">Select color:</span>
                  <select className="form-select bg-gray-500 text-white shadow block w-full focus:bg-gray-600">
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
        </div>
      </section>

      <footer className="mt-3 flex justify-center bg-gray-200">
        <div className="my-3 text-sm">Copyright 2021</div>
      </footer>

    </div>
  )
}
