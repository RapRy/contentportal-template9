import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useChain, useSpring, animated, useSpringRef } from 'react-spring' 

import Categories from './Categories'

const Navigation = () => {
    const { height } = useSelector(state => state.height)

    const [navToggle, setNavToggle] = useState(false)
    const [isMobile, setMobile] = useState(true)
    
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

    const animSideNavDesktop = useSpring({
        ref: sideNavSpring,
        to: { x: isMobile ? "100%" : "50%", opacity: isMobile ? 0 : 1 },
        from : { x: isMobile ? "50%" : "100%", opacity: isMobile ? 1 : 0 }
    })  


    useChain([burgerSpring, closeSpring, sideNavSpring], [0, 0.2, 0])

    useEffect(() => {
        if(window.matchMedia('(min-width: 640px)').matches){
            setNavToggle(true)
            setMobile(false)
        }else{
            setNavToggle(false)
            setMobile(true) 
        }

        window.addEventListener('resize', () => {
            if(window.matchMedia('(min-width: 640px)').matches){
                setNavToggle(true)
                setMobile(false)
            }else{
                setNavToggle(false)
                setMobile(true) 
            }
        })
    }, [])

    return (
        <>
            <div className="absolute right-5 left-5 z-30" style={{ top: `${height - ((isMobile === true ? 54 : 110) / 2)}px` }}>
                {
                    isMobile &&
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
                }
                <animated.div className="bg-white rounded-lg shadow-navShadow text-center absolute top-0 right-0 sm:right-1/2 px-5 py-9 sm:py-4 sm:px-12 mx-auto w-full sm:w-max transform sm:translate-x-1/2" style={isMobile === true ? animSideNav : animSideNavDesktop}>
                    <Categories setNavToggle={setNavToggle} isMobile={isMobile} />
                </animated.div>
            </div>
            {(navToggle && isMobile) && <div className="bg-blackOpac w-full h-screen absolute top-0 left-0 z-20" onClick={() => setNavToggle(!navToggle)}></div>}
        </>
    )
}

export default Navigation
