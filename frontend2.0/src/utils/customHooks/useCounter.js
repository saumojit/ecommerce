import {useState} from 'react'

const useCounter = (initialValue , maxValueAllowed=999999999) => {
    const [value, setValue] = useState(initialValue);
    
    const increment = () => setValue(c => c > maxValueAllowed-1 ? maxValueAllowed : c + 1)
    const decrement = () => setValue(c => c < 2 ? 1 : c - 1)
    

    return { value , increment , decrement }
}

export default useCounter
