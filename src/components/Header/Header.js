import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { setHeight } from '../../redux/heightReducer'

import Search from './Search'

const Header = () => {
    const dispatch = useDispatch()
    const headerRef = useRef()
    const [height, set] = useState(0)

    useEffect(() => {
        dispatch(setHeight(headerRef.current.clientHeight))
    }, [height, dispatch])

    return (
        <div ref={headerRef} className="bg-gradient-to-r from-darkRed to-lightRed px-5 pt-7 pb-12">
            <h1 className="text-4xl font-medium font-rubik text-center pb-5 text-white">Powerland</h1>
            <Search />
        </div>
    )
}

export default Header
