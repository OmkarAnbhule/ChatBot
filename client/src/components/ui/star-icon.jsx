import { Sparkle, Star } from 'lucide-react'
import React from 'react'

export default function StarIcon() {
    return (
        <div className='relative border-2 border-muted-foreground rounded-full w-fit h-fit p-4'>
            <Star className='text-black dark:text-white absolute left-3 size-3 top-1 animate-pingOnce' />
            <Sparkle className='text-black dark:text-white absolute size-2 left-1 animate-pingOnce' />
            <Sparkle className='text-black dark:text-white absolute size-2 right-1.4 bottom-1 animate-pingOnce' />
        </div>
    )
}
