import { useState, useEffect, useRef } from 'react'
import UserTable from './components/userTable'

import './App.css'

interface Geo{
  lat: string
  lng: string
}

interface Address{
  city: string
  geo: Geo
  street: string
  suite: string
  zipcode: string
}

interface Company{
  bs: string
  catchPhrase: string
  name: string
}

interface User {
  username: string
  name: string
  email: string
  phone: string
  website: string
  id: number
  company: Company
  address: Address

}







function App() {
  
  const [userInfo, setUserInfo] = useState<Array<User>>([])
  const userInfoRef = useRef<Array<User>>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const selectRef = useRef<HTMLSelectElement>(null)

  useEffect(() =>{
  const apiCall = async() => {
    try{
      
      const data: Response = await fetch(`https://jsonplaceholder.typicode.com/users`)
      const response: Array<User> = await data.json()
      console.log(response[0]);
      userInfoRef.current = response
      setUserInfo(response)
      
      

    } catch(error){
      console.log(error);
      
    }
  }
  apiCall()
  }, [])

  const fauxQuery = () => {
    if(inputRef.current && selectRef.current){
        const category: string = selectRef.current.value
        const filter: string = inputRef.current.value
        if(userInfoRef.current){
            const tempuserInfo: any = userInfoRef.current
            const newUserInfo: Array<User> = []
            for(let i = 0; i < tempuserInfo.length; i++){
                if(tempuserInfo[i][category] === filter){
                    newUserInfo.push(tempuserInfo[i])
                }
            }
            userInfoRef.current = [... newUserInfo]
            setUserInfo([...newUserInfo])
        }
    }
  }
  

  return (
	<>
        
        <div className="bg-blue-500 flex justify-start  items-center w-[100%] h-[10vh]">
            <div className='ms-3 text-2xl'>
                Users
            </div>
        </div>
        <div className='flex my-2 text-base md:text-[3rem] flex-col items-center w-full'>
            <h2>Refine by column values!</h2>
            <div className='flex text-[.75rem] md:text-[1.75rem] justify-center gap-2 w-full mt-1' >
                <select ref={selectRef} className='text-black bg-blue-500  ' name="category">
                    <option value="name">Name:</option>
                    <option value="phone">Phone:</option>
                    <option value="email">Email:</option>
                    <option value="website">Website:</option>
                    <option value="company">Company:</option>
                    <option value="address">Address:</option>
                </select>
                <input ref={inputRef} className='bg-amber-50 text-black' type="text" name="categoryQuery"  />
                <button onClick={fauxQuery} className='bg-blue-500 text-[.5rem] md:text-[1.25rem] px-2 rounded-xs' >Filter!</button>
            </div>
        </div>
    	<div className='flex justify-self-center  my-4  w-fit max-w-[80vw] wrap-normal min-h-fit'>
			  <UserTable userList={userInfo} />
        </div>
    </>
  )
}



export default App
