import { useState, useRef, useEffect } from "react"

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

  interface UserList {
	userList: Array<User>
  }


  interface Filter {
	name: boolean
	phone: boolean
	email: boolean
	website: boolean
	company: boolean
	address: boolean
  }


function UserTable({userList}: UserList) {
	const [filtering, setFiltering]= useState<Filter>({
		name: false,
		phone: false,
		email: false,
		website: false,
		company: false,
		address: false,

	})

	const filterList = useRef<HTMLDivElement>(null)

	const tableHolder = useRef<HTMLDivElement>(null)

	const addFilter = (filter: string, filterBool: boolean) => {
		
		setFiltering((prev: Filter) => {
			if(tableHolder.current){
				const tempFilter: any = prev
				tempFilter[filter] = !tempFilter[filter]
				console.log(tempFilter);
			
			
				return({...tempFilter})
			}
		})
		
		
	}

	useEffect(() => {
		if(tableHolder.current){
			tableHolder.current.scrollLeft = tableHolder.current.scrollWidth - tableHolder.current.clientWidth
		}
	}, [filtering])

	const openfilterChoices = () => {
		if(filterList.current){
			if(filterList.current.style.display !== "flex"){
				filterList.current.style.display = "flex"
			} else{
				filterList.current.style.display = "none"
			}
		}
	}


  return (

	<div ref={tableHolder} className="flex overflow-x-auto">
		<table className="text-[1rem] md:text-[1.25rem] border-aliceblue border">
			<tr>
				<th className="text-start md:text-[1.5rem] px-2 md:px-5" >
					Username
				</th>
		
				{filtering.name ? (
					<th className="border-s text-start md:text-[1.5rem] px-2 md:px-5 border-aliceblue" >
						Name
					</th>
				) : <></>}
				
				{filtering.phone ? (
					<th className="border-s text-start md:text-[1.5rem] px-2 md:px-5 border-aliceblue" >
						Phone
					</th>
				) : <></>}
		
				{filtering.email ? (
					<th className="border-s text-start md:text-[1.5rem] px-2 md:px-5 border-aliceblue" >
						Email
					</th>
				) : <></>}
		
				{filtering.website ? (
					<th className="border-s text-start md:text-[1.5rem] px-2 md:px-5 border-aliceblue" >
						Website
					</th>
				) : <></>}
				{filtering.company ? (
					<th className="border-s text-start md:text-[1.5rem] px-2 md:px-5 border-aliceblue" >
						Company
					</th>
				) : <></>}
				{filtering.address ? (
					<th className="border-s text-start md:text-[1.5rem] px-2 md:px-5 border-aliceblue" >
						Address
					</th>
				) : <></>}
				
		
			</tr>
			{userList.map((user: User, id: number) => {
				return(
					<tr key={id} className="border-aliceblue border" >
						<td className="text-start px-2 md:px-5 py-0 md:py-1 text-nowrap font-semibold text-[1rem]  md:text-[1.25rem]" >{user.username}</td>
						{filtering.name ? (
						<td className="border-s text-start px-2 md:px-5 py-0 md:py-1 text-nowrap border-aliceblue" >{user.name}</td>
						) : <></>}
						{filtering.phone ? (
						<td className="border-s text-start px-2 md:px-5 py-0 md:py-1 text-nowrap border-aliceblue" >{user.phone}</td>
						) : <></>}
		
						{filtering.email ? (
						<td className="border-s text-start px-2 md:px-5 py-0 md:py-1 text-nowrap border-aliceblue" >{user.email}</td>
						) : <></>}
		
						{filtering.website ? (
						<td className="border-s text-start px-2 md:px-5 py-0 md:py-1 text-nowrap border-aliceblue" >{user.website}</td>
						) : <></>}

						{filtering.company ? (
						<td className="border-s text-start px-2 md:px-5 py-0 md:py-1 text-nowrap border-aliceblue" >{user.company.name}</td>
						) : <></>}
						{filtering.address ? (
						<td className="border-s text-start text-[.5rem] md:text-[1rem] px-2 md:px-5 py-0 md:py-1 text-nowrap border-aliceblue" >{user.address.suite}, {user.address.street}, {user.address.city},<br/>{user.address.zipcode}</td>
						) : <></>}
					</tr>
				)
			})}
		</table>
		<div onClick={openfilterChoices} className="flex h-[20px] md:h-[40px] aspect-square justify-center leading-none items-center bg-amber-200 text-base md:text-[2rem]" >
			+
		</div>
		<div ref={filterList} className="hidden h-fit flex-col border border-aliceblue text-[.65rem] md:text-[1.2rem]" >
			<span className="pe-2 ps-1"  onClick={() => {addFilter("name", filtering.name)}} >Name</span>
			<span className="border-aliceblue border-t pe-2 ps-1" onClick={() => {addFilter("phone", filtering.phone)}} >Phone</span>
			<span className="border-aliceblue border-t pe-2 ps-1" onClick={() => {addFilter("email", filtering.email)}} >Email</span>
			<span className="border-aliceblue border-t pe-2 ps-1" onClick={() => {addFilter("website", filtering.website)}} >Website</span>
			<span className="border-aliceblue border-t pe-2 ps-1" onClick={() => {addFilter("company", filtering.company)}} >Company</span>
			<span className="border-aliceblue border-t pe-2 ps-1" onClick={() => {addFilter("address", filtering.address)}} >Address</span>
		</div>
	</div>

	
  )
}

export default UserTable