import React from 'react'

export const Rating = ({value , text , color}) => {
    const star_level_1=value>=1 ? 'fas fa-star' : value>=0.5 ? 'fas fa-star-half-alt' : 'far fa-star'
    const star_level_2=value>=2 ? 'fas fa-star' : value>=1.5 ? 'fas fa-star-half-alt' : 'far fa-star'
    const star_level_3=value>=3 ? 'fas fa-star' : value>=2.5 ? 'fas fa-star-half-alt' : 'far fa-star'
    const star_level_4=value>=4 ? 'fas fa-star' : value>=3.5 ? 'fas fa-star-half-alt' : 'far fa-star'
    const star_level_5=value>=5 ? 'fas fa-star' : value>=4.5 ? 'fas fa-star-half-alt' : 'far fa-star'

    return (
        <div className='rating'>
            <span> <i style={{color}} className={star_level_1}> </i> </span>
            <span> <i style={{color}} className={star_level_2}> </i> </span>
            <span> <i style={{color}} className={star_level_3}> </i> </span>
            <span> <i style={{color}} className={star_level_4}> </i> </span>
            <span> <i style={{color}} className={star_level_5}> </i> </span>
            <span>{text && text}</span>
        </div>
  )
}