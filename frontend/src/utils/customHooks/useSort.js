import React , { useEffect,useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



export const useSort=(colHeadIndex,colHead,colType="String")=>{
    const [sortToggle , setSortToggle]=useState(true)
    const [prevColumn , setPrevColumn]=useState("")
    const [sortIcons, setSortIcons]=useState(["","","",""])
    const totalsortableColumns=4
    console.log('sort do : ', colHeadIndex ," <> ",colHead)
    // setPrevColumn(colHead)
    // dispatch({type:OBJECT_LIST_SORT_RESET})
    // dispatch(sortObjectList(myorders,colHead,sortToggle,colType))
    // if(prevColumn===colHead){
    //     setSortToggle(!sortToggle)
    //     let new_sortIconList=[...sortIcons.slice(0,colHeadIndex), sortToggle ? "\u25BC" : "\u25B2" ,...sortIcons.slice(colHeadIndex+1)]
    //     setSortIcons(new_sortIconList)
    // }
    // else{
    //     if(prevColumn==='')
    //         setSortToggle(!sortToggle)  // Logic is If You Switch Column , It will start from ascending
    //     else
    //         setSortToggle(true) 
    //     const default_icons_list=Array(totalsortableColumns).fill("") //["","","",""]
    //     let new_sortIconList=[...default_icons_list.slice(0,colHeadIndex),"\u25B2",...default_icons_list.slice(colHeadIndex+1)]
    //     setSortIcons(new_sortIconList)
    // }
}