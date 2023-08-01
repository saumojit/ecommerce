import React from 'react'
import { Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Paginate = ({pages , page , keyword='' , isAdmin=false}) => {
    if(keyword){
        keyword=keyword.split('?keyword=')[1].split('&')[0]
    }
    const admin_base=isAdmin ? '/admin/productlist' : ''

    return (pages >1 && (
        <Pagination>
            {[...Array(pages).keys()].map((x)=>(
                <Link  className='mx-1' key={x+1} to={`${admin_base}/?keyword=${keyword}&page=${x+1}`} enabled={true}>
                    <Pagination.Item  active={true}>
                        {x+1}
                    </Pagination.Item>
                </Link>
            ))}
        </Pagination>
    )
    )
}
