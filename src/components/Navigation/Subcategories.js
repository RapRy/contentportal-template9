import { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'

const Subcategories = ({ cat, setActiveSubcat, activeSubcat }) => {
    const [active, set] = useState(false)

    const animation = useSpring({
        from : { opacity: 0 },
        to: { transform: active ? "translateY(0px)" : "translateY(-50px)", opacity: active ? 1 : 0 }
    })

    useEffect(() => {
        set(cat.active)

    }, [cat])

    return (
        <div className={`${active === false ? "h-0" : "h-full"} relative block top-0 overflow-hidden`}>
            {
                cat.subCategories.map(({ _id, subCatName }) => (
                    <animated.div key={_id} className="inline-block px-2.5 py-3.5" style={animation}>
                        <button onClick={() => setActiveSubcat(_id)} className={`text-sm font-rubik font-bold bg-none cursor-pointer ${_id === activeSubcat ? "text-gray-2" : "text-black"}`}>{subCatName}</button>
                    </animated.div>
                ))
            }
        </div>
    )
}

export default Subcategories
