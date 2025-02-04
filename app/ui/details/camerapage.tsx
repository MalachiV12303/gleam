'use client'

import BackButton from './backbutton'
import Image from 'next/image'
import React, { useRef } from 'react'
import { useCart } from 'react-use-cart'
import { Camera } from '@/app/lib/db/schema'
import { Accordion, AccordionItem, Button } from '@nextui-org/react'
import { notFound } from 'next/navigation'
import { ListBlobResultBlob } from '@vercel/blob'
import { motion, MotionValue, useScroll, useTransform } from 'motion/react'

export function CameraPage({ cam, image }: { cam: Camera, image: ListBlobResultBlob | null }) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref })
    const { addItem } = useCart()
    const [isOpen, setIsOpen] = React.useState(false);
    const y = useParallax(scrollYProgress, 100)
    if (cam === undefined) {
        return notFound();
    }
    function useParallax(value: MotionValue<number>, distance: number) {
        return useTransform(value, [0, 1], [-distance, distance]);
    }

    return (
        <section className='flex mx-auto h-full max-w-[1400px] items-center'>
            <div ref={ref} className='flex flex-col md:flex-row lg:gap-8 items-center w-full'>
                <div className='flex flex-col gap-4' id='leftPanel'>
                    <BackButton />
                    <div className='flex w-[200px] lg:w-[300px] xl:w-[400px] border-1 bg-white border-foreground aspect-square items-center justify-center'>
                        {image ?
                            <Image
                                key={cam.id}
                                src={image.url}
                                alt='image'
                                width={400}
                                height={400}
                                style={{ width: '80%', height: 'auto' }}
                            /> :
                            <div className='flex h-full items-center justify-center'>
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1} stroke='currentColor' className='size-6'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z' />
                                </svg>
                            </div>
                        }
                    </div>
                    <div className='flex gap-2 items-center justify-evenly'>
                        <p className='text-3xl'>{cam.price}</p>
                        <Button size='sm' onPress={() => {
                            addItem(cam);
                            setIsOpen(!isOpen);
                        }} className='text-sm text-nowrap border-1 border-foreground bg-transparent text-foreground'>add to cart</Button>
                    </div>
                </div>

                <div id='rightPanel' className='flex-1 flex flex-col gap-2 min-w-[70%] items-center '>
                    <div className='flex flex-col gap-2 text-nowrap w-full items-center md:items-start'>
                        <motion.div className='text-3xl flex items-center gap-2' style={{ y }}>{cam.brand} {cam.name}</motion.div>
                        <span className='text-2xl lg:ml-4'>{cam.res}p</span>
                        <div className='ml-4 flex gap-2 max-w-[60%]'>
                        </div>
                    </div>
                    <Accordion className='mt-2 w-10/12' itemClasses={{ trigger:'text-nowrap', content: 'pl-2', indicator: 'text-foreground' }} isCompact>
                        <AccordionItem key='description' aria-label='description' title='description'>
                            <p className='text-sm'>{cam.description}</p>

                        </AccordionItem>
                        <AccordionItem key='shutter' aria-label='shutter' title='shutter'>
                            <div className='max-w-full scrollbar pr-1 overflow-y-scroll text-wrap'>{cam.shutter}</div>
                        </AccordionItem>
                        <AccordionItem key='compatible with' aria-label='compatible with' title='compatible with'>
                            <div className='flex flex-wrap gap-2'>storage: {cam.storage?.map((sdtype, index) => (<div key={index}>{sdtype}</div>))}</div>
                            <div className='flex gap-2'>lense type: {cam.mount?.map((lentype, index) => (<div key={index}>{lentype}</div>))}</div>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </section>
    )
}