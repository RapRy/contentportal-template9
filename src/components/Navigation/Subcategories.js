import { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import _ from 'lodash'

import { updateDetails } from '../../redux/dataReducer'

const Subcategories = ({ cat, setActiveSubcat, activeSubcat, setNavToggle, isMobile }) => {
    const dispatch = useDispatch()
    const { selectedContent } = useSelector(state => state.data)
    const [active, set] = useState(false)

    const animation = useSpring({
        from : { opacity: 0, transform: "translateY(-50px)" },
        to: { transform: active ? "translateY(0px)" : "translateY(-50px)", opacity: active ? 1 : 0 },
        config: {
            tension: 180,
            friction: 28
          }
    })

    const updateContentsViaSubcat = (_id) => {
        if(!_.isEmpty(selectedContent))
            dispatch(updateDetails([]))

        setActiveSubcat(_id)
        if(isMobile === true)
            setNavToggle(false)
    }

    useEffect(() => {
        set(cat.active)
    }, [cat])

    return (
        <div className={`${active === false ? "h-0" : "h-full"} relative block top-0 overflow-hidden`}>
            {
                cat.subCategories.map(({ _id, subCatName, catName }) => (
                    <animated.div key={_id} className="inline-block px-2.5 py-3.5 sm:py-1" style={animation}>
                        <NavLink to={`/Category/${catName}/${subCatName}`} onClick={() => updateContentsViaSubcat(_id)}>
                            <button className={`text-sm font-rubik font-bold bg-none cursor-pointer ${_id === activeSubcat ? "text-gray-2" : "text-black"}`}>{subCatName}</button>
                        </NavLink>
                    </animated.div>
                ))
            }
        </div>
    )
}

export default Subcategories
