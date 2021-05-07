import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getPopularVideos, getVideosByCategory } from '../../redux/actions/videos.action';
import "./_categoriesBar.scss"

const keywords = [
    'All',
    'React Js',
    'Angular Js',
    'Vue JS',
    'React Native',
    'Rest Api',
    'Redux',
    'Films',
    'Music',
    'Algorthim Art',
    'Guitar',
    'Hans Zimmer',
    'Coding',
    'Football',
    'Barclona',
    'Abodi', 
    'PhD'
]


function CategoriesBar() {

const [activeElement, setActiveElement] =useState('All');

const dispatch = useDispatch()

const handelClick = (value) => {
    setActiveElement(value)
    if(value === "All"){
        dispatch(getPopularVideos())
    } else{
    dispatch(getVideosByCategory(value))
    }
} 

    return (
        <div className="categoriesBar">
           {
               keywords.map((value, i) => <span
               onClick={() => handelClick(value)}
               className={activeElement === value ? 'active' : ''}
               key={i}>{value}</span>)
           }
        </div>
    )   
}

export default CategoriesBar
