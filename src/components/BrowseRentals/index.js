import Navbar from "../Navbar"
import './index.css'
import RentalItem from "../RentalItem";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import ImageGrid from "../Loader";

const BrowseRentals=(props)=>{
   const [rentalsDetails,setRentaldetails]=useState([])
   const [isLoading,setIsLoading]=useState(true)
  const fetchRentals=async()=>{
    const response=await axios.get('http://localhost:3000/rentals')
    try{
      if (response.status===200){
        setRentaldetails(response.data)
        setIsLoading(false)
    }
    } 
    catch(er){
      toast.error(er.message)
      setIsLoading(false)
    }
  }

   useEffect(()=>{
      fetchRentals()
   },[])
    return(
        <div style={{minHeight:'100vh'}}>
            <Navbar/>
            {isLoading?
            <div style={{marginTop:'120px',height:'100%'}}>
            <ImageGrid/>
            </div>
            :
            <div className="rental-section">
            <h1 className="availble-rental">Available Rentals</h1>
            <div className="rental-items-section">
                {rentalsDetails.map(each=>(
                    <RentalItem itemDetails={each} key={each.id}/>
                ))}
            </div>
            </div>
            }
            <Footer/>
        </div>
          

    )
}

export default BrowseRentals