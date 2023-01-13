import React,{useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
const UserForm = () => {
	const[formData ,setformData] = useState({
	firstname: "",
	lastname: "",
	Email: "",
	Address: "",
	City: "",
	});
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(fal)
	const handleInputChange = (e) => {
		setformData({ ...formData, [e.traget.name] : e.traget.value});
	};
	const handlesubmit = (e) =>{
	e.preventdefault();
	console.log(formData);
	};

	const reference = useRef()





  return (
	<section className="p-6 dark:bg-gray-800 dark:text-gray-50">
	<form
	onsubmit={handlesubmit}
	className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
		<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
			<div className="space-y-2 col-span-full lg:col-span-1">
				<p className="font-medium">Personal Inormation</p>
				<p className="text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci fuga autem eum!</p>
			</div>
			<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
				<div className="col-span-full sm:col-span-3">
					<label for="firstname" className="text-sm" ref={reference} onClick={() => reference.current.innerHTML = "Name"}>First name</label>
					<input
					name="firstName" 
					value={formData.firstName} 
					onChange={handleInputChange}
					 type="text" 
					 placeholder="First name" 
					 className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" fdprocessedid="tzbmzc" />
				</div>
				<div className="col-span-full sm:col-span-3">
					<label for="lastname" className="text-sm">Last name</label>
					<input name="lastName"
					value={formData.lastName}
					onChange={handleInputChange}
						
					type="text" placeholder="Last name" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" fdprocessedid="3q4der" />
				</div>
				<div className="col-span-full sm:col-span-3">
					<label for="email" className="text-sm">Email</label>
					<input name="email"
					value={formData.email}
					onChange={handleInputChange} type="email" placeholder="Email" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" fdprocessedid="mv9bvf" />
				</div>
				<div className="col-span-full">
					<label for="address" className="text-sm">Address</label>
					<input name="address"
					value={formData.address}
					onChange={handleInputChange} type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" fdprocessedid="mjuiki" />
				</div>
				<div className="col-span-full sm:col-span-2">
					<label for="city" className="text-sm">City</label>
					<input name="city" 
					value={formData.city} 
					onchange={handleInputChange}
					type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" fdprocessedid="wx32c" />
				</div>
				
			</div>
		</fieldset>
		<button type='submit'>Submit</button>
	</form>
</section>
  )
}

export default UserForm