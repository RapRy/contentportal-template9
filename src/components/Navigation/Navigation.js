import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const Navigation = () => {
    const { height } = useSelector(state => state.height)
    const { categories } = useSelector(state => state.data)

    const [activeSubcat, setActiveSubcat] = useState("")
    const [newCats, setNewCats] = useState([])
    const [navToggle, setNavToggle] = useState(false)
    
    const navBurger = [
        { width: "40px", height: "6px", top: "12px", left: "8px" }, 
        { width: "30px", height: "6px", top: "24px", left: "13px" },
        { width: "40px", height: "6px", top: "36px", left: "8px" }
    ]

    const showSubCats = (ind) => {
        let modCats = []

        newCats.forEach((cat, i) => {
            modCats.push({ ...newCats[i], ["active"]: i === ind ? true : false})
        }) 

        setActiveSubcat(modCats[ind].subCategories[0]._id)
        setNewCats(modCats)
    }

    useEffect(() => {
        let modCats = []

        categories.forEach((cat, iCat) => {

            const category = { ...cat, active: (iCat === 0) ? true : false }

            modCats.push(category)

            cat.subCategories.forEach(({ _id }, iSub) => {
                (iCat === 0 && iSub === 0) && setActiveSubcat(_id)
            })
        })

        setNewCats(modCats)

    }, [categories])

    return (
        <div className="absolute right-5 left-5 z-20" style={{ top: `${height - (54 / 2)}px` }}>
            <div onClick={() => setNavToggle(!navToggle)} className={`bg-white rounded-lg inline-block ${navToggle === false ? "shadow-navShadow" : ""} absolute z-30 top-0 right-0`} style={{ width: "56px", height: "54px" }}>
                {
                    navToggle === false ?
                        navBurger.map((el, i) => (
                            <span key={i} className="block absolute rounded-sm origin-center bg-lightRed" style={{ width: el.width, height: el.height, top: el.top, left: el.left }}></span>
                        ))
                    : <span className="font-rubik text-lightRed text-sm font-bold inline-block pl-1.5 pt-2.5 pb-2.5 pr-2.5">Close</span>
                }
            </div> 

            <div className={`bg-white rounded-lg shadow-navShadow text-center absolute top-0 right-0 px-5 py-9 mx-auto w-full transform origin-top-right ${navToggle ? "scale-1" : "scale-0"}`}>
                <div>
                    {
                        newCats.map((cat, i) => (
                            <div key={cat._id}>
                                <div className="block py-2.5 px-5 relative top-0 left-0 z-20">
                                    <button onClick={() => showSubCats(i)} className={`font-rubik bg-none cursor-pointer font-bold text-xl ${cat.active === false ? "text-black" : "text-gray-2"}`}>{cat.catName}</button>
                                </div>
                                <div className={`${cat.active === false ? "h-0" : "h-full"} relative block top-0 overflow-hidden`}>
                                    {
                                        cat.subCategories.map(({ _id, subCatName }) => (
                                            <div key={_id} className="inline-block px-2.5 py-3.5">
                                                <button onClick={() => setActiveSubcat(_id)} className={`text-sm font-rubik font-bold bg-none cursor-pointer ${_id === activeSubcat ? "text-gray-2" : "text-black"}`}>{subCatName}</button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Navigation
