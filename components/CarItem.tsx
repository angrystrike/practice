import Image from 'next/image'

export default function CarItem() {
    return (
        <div className="flex justify-center items-center px-3">
            <div className="text-center">
                <Image className="rounded-sm" width="200" height="200" src="/images/300x300.png" />
                <h4 className="text-lg font-semibold">Product name</h4>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis non felis volutpat, pellentesque tellus vel, iaculis odio.
                    Quisque viverra, mi vel gravida vestibulum, velit diam malesuada diam, id gravida mauris ligula quis eros.
                </p>

                <div className="mt-2 text-sm text-gray-600 flex justify-center">
                    <span className="mr-2 font-semibold">Rating:</span>
                    <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                    <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                    <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                    <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                    <svg className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>
                </div>
                <div className="mt-3 font-bold">$3000</div>
            </div>

        </div>
    )
}