import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'

import { NavLink } from 'react-router-dom'

import * as api from '../../api'
import { updateContents, updateDetails } from '../../redux/dataReducer'

import Subcategories from './Subcategories'

const Categories = ({ setNavToggle }) => {
    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.data)

    const catMatch = useRouteMatch('/Category/:cat/:subcat') || { params: { cat: null } }

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

        dispatch(updateDetails([]))
    }

    useEffect(() => {
        let modCats = []

        const catName = catMatch.params.cat
        const subcatName = catMatch.params.subcat

        if(catName != null){
            categories.forEach((cat, iCat) => {
                const category = { ...cat, active: (catName === cat.catName) ? true : false }

                modCats.push(category)

                cat.subCategories.forEach(({ _id, subCatName }, iSub) => {
                    (catName === cat.catName && subCatName === subcatName) && setActiveSubcat(_id) 
                })
            })

            setNewCats(modCats)
        }

        // categories.forEach((cat, iCat) => {

        //     const category = { ...cat, active: (iCat === 0) ? true : false }

        //     modCats.push(category)

        //     cat.subCategories.forEach(({ _id }, iSub) => {
        //         (iCat === 0 && iSub === 0) && setActiveSubcat(_id)
        //     })
        // })


    }, [categories, catMatch.params.cat, catMatch.params.subcat])

    return (
        <div>
            {
                newCats.map((cat, i) => (
                    <div key={cat._id}>
                        <div className="block py-2.5 px-5 relative top-0 left-0 z-20">
                            <NavLink to={ `/Category/${cat.catName}/${cat.subCategories[0].subCatName}` }>
                                <button onClick={() => showSubCats(i, cat.catName)} className={`font-rubik bg-none cursor-pointer font-bold text-xl ${cat.active === false ? "text-black" : "text-gray-2"}`}>{cat.catName}</button>
                            </NavLink>
                        </div>
                        <Subcategories cat={cat} setActiveSubcat={setActiveSubcat} activeSubcat={activeSubcat} setNavToggle={setNavToggle} />
                    </div>
                ))
            }
        </div>
    )
}

export default Categories
