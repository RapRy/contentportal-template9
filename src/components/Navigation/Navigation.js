import { useState } from 'react'
import { useSelector } from 'react-redux'

import { useChain, useSpring, animated, useSpringRef } from 'react-spring' 

import Categories from './Categories'

const Navigation = () => {
    const { height } = useSelector(state => state.height)

    const [navToggle, setNavToggle] = useState(false)
    
    const navBurger = [
        { width: "40px", height: "6px", top: "12px", left: "8px" }, 
        { width: "30px", height: "6px", top: "24px", left: "13px" },
        { width: "40px", height: "6px", top: "36px", left: "8px" }
    ]

    const burgerSpring = useSpringRef()
    const animBurger = useSpring({
        ref: burgerSpring,
        to: { transform: navToggle ? 'scale(0)' : 'scale(1)' },
        from: { transform: 'scale(1)', height: "54px" }
    })

    const closeSpring = useSpringRef()
    const animClose = useSpring({
        ref: closeSpring,
        to: { transform: navToggle ? 'scale(1)' : 'scale(0)' },
        from: { transform : 'scale(0)' }
    })

    const sideNavSpring = useSpringRef()
    const animSideNav = useSpring({
        ref: sideNavSpring,
        to: { transform: navToggle ? 'scale(1)' : 'scale(0)' },
        from: { transform : 'scale(0)', transformOrigin:  "99% top"}
    })

    useChain([burgerSpring, closeSpring, sideNavSpring], [0, 0.2, 0])

    return (
        <div className="absolute right-5 left-5 z-20" style={{ top: `${height - (54 / 2)}px` }}>
            <div onClick={() => setNavToggle(!navToggle)} className={`bg-white rounded-lg inline-block ${navToggle === false ? "shadow-navShadow" : ""} absolute z-30 top-0 right-0 cursor-pointer`} style={{ width: "56px", height: "54px" }}>
                {
                    navToggle === false &&
                        <animated.div className="origin-center" style={animBurger}>
                            {
                                navBurger.map((el, i) => (
                                    <span key={i} className="block absolute rounded-sm origin-center bg-lightRed" style={{ width: el.width, height: el.height, top: el.top, left: el.left }}></span>
                                ))
                            }
                        </animated.div>
                }

                {
                    navToggle === true &&
                        <animated.div className="origin-center" style={animClose}>
                            <span className="font-rubik text-lightRed text-sm font-bold inline-block pl-1.5 pt-2.5 pb-2.5 pr-2.5">Close</span>
                        </animated.div>
                }
            </div> 

            <animated.div className="bg-white rounded-lg shadow-navShadow text-center absolute top-0 right-0 px-5 py-9 mx-auto w-full transform origin-top-right" style={animSideNav}>
                <Categories />
            </animated.div>
        </div>
    )
}

export default Navigation
