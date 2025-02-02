'use client'
import { useEffect, useState } from "react";
import { Checkout } from "../ui/checkout/checkout";
import { Spinner } from "@nextui-org/react";

export default function Page() {
    //this is to render cart information without ssr errors
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])
    return (
        <div className='h-full relative max-w-[1200px] flex flex-col mx-auto scrollbar items-center py-2 sm:py-8'>
            {isClient ? <Checkout /> : <Spinner/>}
        </div>
    )
}
