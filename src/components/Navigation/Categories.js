import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { NavLink } from "react-router-dom";

import _ from "lodash";

import { updateDetails } from "../../redux/dataReducer";

import Subcategories from "./Subcategories";

const Categories = ({ setNavToggle, isMobile }) => {
  const dispatch = useDispatch();
  const { categories, selectedContent } = useSelector((state) => state.data);

  const catMatch = useRouteMatch("/Category/:cat/:subcat") || {
    params: { cat: null },
  };

  const [activeSubcat, setActiveSubcat] = useState("");
  const [newCats, setNewCats] = useState([]);
  const [activeCat, setActiveCat] = useState({});

  const showSubCats = (ind) => {
    let modCats = [];

    newCats.forEach((cat, i) => {
      modCats.push({ ...newCats[i], active: i === ind ? true : false });
    });

    setActiveSubcat(modCats[ind].subCategories[0]._id);
    setNewCats(modCats);

    if (!_.isEmpty(selectedContent)) dispatch(updateDetails([]));
  };

  useEffect(() => {
    let modCats = [];

    const catName = catMatch.params.cat;
    const subcatName = catMatch.params.subcat;

    if (catName != null) {
      categories.forEach((cat, iCat) => {
        const category = {
          ...cat,
          active: catName === cat.catName ? true : false,
          subCategories: _.sortBy(cat.subCategories, "subCatName"),
        };

        if (catName === cat.catName) setActiveCat(category);

        modCats.push(category);

        cat.subCategories.forEach(({ _id, subCatName }, iSub) => {
          catName === cat.catName &&
            subCatName === subcatName &&
            setActiveSubcat(_id);
        });
      });

      setNewCats(modCats);
    }
  }, [categories, catMatch.params.cat, catMatch.params.subcat]);

  return (
    <>
      <div className="sm:pb-2.5">
        {newCats.map((cat, i) => (
          <div
            key={cat._id}
            className="sm:inline-block sm:border-l-2 sm:first:border-l-0 sm:border-gray-1"
          >
            <div className="block py-2.5 sm:py-1 px-5 relative top-0 left-0 z-20">
              <NavLink
                to={`/Category/${cat.catName}/${cat.subCategories[0].subCatName}`}
                onClick={() => showSubCats(i)}
              >
                <button
                  className={`font-rubik bg-none cursor-pointer font-bold text-xl ${
                    cat.active === false ? "text-black" : "text-gray-2"
                  }`}
                >
                  {cat.catName}
                </button>
              </NavLink>
            </div>
            {isMobile && (
              <Subcategories
                cat={cat}
                setActiveSubcat={setActiveSubcat}
                activeSubcat={activeSubcat}
                setNavToggle={setNavToggle}
                isMobile={isMobile}
              />
            )}
          </div>
        ))}
      </div>
      {!isMobile && !_.isEmpty(activeCat) && (
        <Subcategories
          cat={activeCat}
          setActiveSubcat={setActiveSubcat}
          activeSubcat={activeSubcat}
          setNavToggle={setNavToggle}
          isMobile={isMobile}
        />
      )}
    </>
  );
};

export default Categories;
