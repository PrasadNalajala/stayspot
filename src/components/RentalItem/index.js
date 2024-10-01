import './index.css'
import { FaMapMarkedAlt } from "react-icons/fa";
const RentalItem=(props)=>{
    const {itemDetails}=props
    const {id,location,title,bedrooms,bathrooms,price,size,imageUrl,contact}=itemDetails
    console.log('itemDetails')
    return(
        <div className='rental-item'>
            <img className='rental-img' src={imageUrl}/>
            <div className='rental-details'>
            <div className='rental-heading-container'>
            <h1 className="rental-item-heading">{title}</h1>
            <p className='rental-price'>{price}</p>
            </div>
            <div className='specifications-container'>
                <p>{bedrooms} Bedrooms</p>
                <p>{bathrooms} Bathrooms</p>
                <p>{size}</p>
            </div>
            <div className='location-container'>
                <p className='location'><FaMapMarkedAlt className='map-icon'/>{location}</p>
                
            </div>
            <div className='button-container'>
                <button className='view-details-btn button'>View Details</button>
                <button className='contact-btn button'>Contact</button>
            </div>
            </div>
        </div>
    )
}

export default RentalItem