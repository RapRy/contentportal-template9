import { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { useDispatch } from 'react-redux'

import * as api from '../../api'
import { updateContents } from '../../redux/dataReducer'

const Subcategories = ({ cat, setActiveSubcat, activeSubcat }) => {
    const dispatch = useDispatch()
    const [active, set] = useState(false)

    const animation = useSpring({
        from : { opacity: 0 },
        to: { transform: active ? "translateY(0px)" : "translateY(-50px)", opacity: active ? 1 : 0 }
    })

    const updateContentsViaSubcat = async (_id, subCatName, catName) => {
        const { data } = await api.updateContentsViaSubcat(subCatName, catName)

        dispatch(updateContents(data))

        setActiveSubcat(_id)
    }

    useEffect(() => {
        set(cat.active)
    }, [cat])

    return (
        <div className={`${active === false ? "h-0" : "h-full"} relative block top-0 overflow-hidden`}>
            {
                cat.subCategories.map(({ _id, subCatName, catName }) => (
                    <animated.div key={_id} className="inline-block px-2.5 py-3.5" style={animation}>
                        <button onClick={() => updateContentsViaSubcat(_id, subCatName, catName)} className={`text-sm font-rubik font-bold bg-none cursor-pointer ${_id === activeSubcat ? "text-gray-2" : "text-black"}`}>{subCatName}</button>
                    </animated.div>
                ))
            }
        </div>
    )
}

export default Subcategories
