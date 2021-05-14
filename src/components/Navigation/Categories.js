import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as api from '../../api'
import { updateContents } from '../../redux/dataReducer'

import Subcategories from './Subcategories'

const Categories = () => {
    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.data)

    const [activeSubcat, setActiveSubcat] = useState("")
    const [newCats, setNewCats] = useState([])

    const updateContentList = async (catName) => {
        const { data } = await api.updateContentsViaCat(catName)

        dispatch(updateContents(data))
    }

    const showSubCats = (ind, catName) => {
        let modCats = []

        newCats.forEach((cat, i) => {
            modCats.push({ ...newCats[i], ["active"]: i === ind ? true : false})
        }) 

        updateContentList(catName)        

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
        <div>
            {
                newCats.map((cat, i) => (
                    <div key={cat._id}>
                        <div className="block py-2.5 px-5 relative top-0 left-0 z-20">
                            <button onClick={() => showSubCats(i, cat.catName)} className={`font-rubik bg-none cursor-pointer font-bold text-xl ${cat.active === false ? "text-black" : "text-gray-2"}`}>{cat.catName}</button>
                        </div>
                        <Subcategories cat={cat} setActiveSubcat={setActiveSubcat} activeSubcat={activeSubcat} />
                    </div>
                ))
            }
        </div>
    )
}

export default Categories
