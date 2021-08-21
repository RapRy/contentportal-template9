import { useRef, useEffect, useState } from 'react'

const Screenshots = ({ images }) => {
    const screenshotsContainer = useRef()
    const [scrollWidth, set] = useState(0)

    const scroll = (e) => {
        screenshotsContainer.current.scrollLeft = e.target.value
    }

    useEffect(() => {
        screenshotsContainer.current !== undefined && set(screenshotsContainer.current.scrollWidth - screenshotsContainer.current.clientWidth)
    }, [screenshotsContainer])

    return (
        <div className="relative z-10 pt-9 px-5">
            <span className="float-right text-white text-sm font-rubik customMarginRight spanAfter">Screenshots</span>
            <div ref={screenshotsContainer} className="clear-right pt-5 overflow-x-hidden whitespace-nowrap cur">
                {
                    images.map((image, i) => <img className="w-11/12 lg:w-8/12 inline-block mr-3 last:mr-0 max-h-20" key={i} src={image} alt={`screenshot-${i + 1}`} />)
                }
            </div>
            <div className="w-9/12 pr-2.5 pt-2">
                <input className="customScrollbar" type="range" min="0" max={scrollWidth} step="1" onInput={(e) => scroll(e)}/>
            </div>
        </div>
    )
}

export default Screenshots
