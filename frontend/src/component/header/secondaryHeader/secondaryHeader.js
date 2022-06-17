import React, { useEffect } from 'react'
import { MdOutlineCategory } from 'react-icons/md'
import { useAlert } from "react-alert"
import { useSelector, useDispatch } from "react-redux"
import { getFrontPageCategories } from '../../../actions/categoryAction';
import CategoryCard from '../categoryCard/categoryCard';
import './secondaryHeader.css'
import { Link } from 'react-router-dom';

function SecondaryHeader() {
    const alert = useAlert();
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getFrontPageCategories())
    }, [dispatch]);

    const { loading, error, frontPageCategories } = useSelector((state) => state.frontPageCategories)
    return (
        <>
            <div className="secondaryNav">
                {!loading &&
                    <><Link to={''}><div><div><MdOutlineCategory /></div>Categories</div></Link>
                        {frontPageCategories && frontPageCategories.map((elem) => <CategoryCard category={elem} />)}
                    </>
                }
            </div>
        </>
    )
}

export default SecondaryHeader