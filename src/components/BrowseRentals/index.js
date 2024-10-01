import Navbar from "../Navbar"
import './index.css'
import RentalItem from "../RentalItem";


const BrowseRentals=(props)=>{
    const rentalsDetails = [
        {
          id: 1,
          title: "2 BHK Apartment in Whitefield",
          location: "Whitefield, Bangalore",
          price: "₹25,000/month",
          bedrooms: 2,
          bathrooms: 2,
          size: "1200 sq.ft",
          imageUrl: "https://media.architecturaldigest.in/wp-content/uploads/2020/04/Bengaluru-home-Bodhi-Design-Studio-17-1366x768.jpg",
          contact: {
            name: "Rohit Sharma",
            phone: "+91 9876543210",
            email: "rohit@example.com"
          }
        },
        {
          id: 2,
          title: "3 BHK Villa in HSR Layout",
          location: "HSR Layout, Bangalore",
          price: "₹55,000/month",
          bedrooms: 3,
          bathrooms: 3,
          size: "2400 sq.ft",
          imageUrl: "https://q-xx.bstatic.com/xdata/images/hotel/max1200/124262717.jpg?k=7e4b471f435e8c63958b5d82367904358a4e77116c56f4546ddf39e139b49c0b&o=",
          contact: {
            name: "Pooja Patel",
            phone: "+91 8765432109",
            email: "pooja@example.com"
          }
        },
        {
          id: 3,
          title: "1 BHK Studio Apartment in Koramangala",
          location: "Koramangala, Bangalore",
          price: "₹18,000/month",
          bedrooms: 1,
          bathrooms: 1,
          size: "600 sq.ft",
          imageUrl: "https://th.bing.com/th/id/R.c0bc93a3889c8a2e59110934680733e2?rik=R2GSx3Tf7aBvWg&riu=http%3a%2f%2fthehousedesignhub.com%2fwp-content%2fuploads%2f2021%2f05%2f40X.jpg&ehk=KZGRW14zA4%2behi2MaG2v2fQeCeqvopAzpnMQ2ZzKdEg%3d&risl=&pid=ImgRaw&r=0",
          contact: {
            name: "Amit Singh",
            phone: "+91 7654321098",
            email: "amit@example.com"
          }
        },
        {
          id: 4,
          title: "4 BHK Penthouse in Indiranagar",
          location: "Indiranagar, Bangalore",
          price: "₹80,000/month",
          bedrooms: 4,
          bathrooms: 4,
          size: "3200 sq.ft",
          imageUrl: "https://th.bing.com/th/id/OIP.GjxG6N8-29GwRPJZPNpFzAHaEK?rs=1&pid=ImgDetMain",
          contact: {
            name: "Shweta Nair",
            phone: "+91 6543210987",
            email: "shweta@example.com"
          }
        },
        {
          id: 5,
          title: "2 BHK Apartment in Jayanagar",
          location: "Jayanagar, Bangalore",
          price: "₹30,000/month",
          bedrooms: 2,
          bathrooms: 2,
          size: "1500 sq.ft",
          imageUrl: "http://ts1.mm.bing.net/th?id=OIP.9lXzQY3GnGMvKGFX6s5vDAHaG1&pid=15.1",
          contact: {
            name: "Manoj Kumar",
            phone: "+91 5432109876",
            email: "manoj@example.com"
          }
        },
        {
          id: 6,
          title: "3 BHK Independent House in Hebbal",
          location: "Hebbal, Bangalore",
          price: "₹50,000/month",
          bedrooms: 3,
          bathrooms: 3,
          size: "2000 sq.ft",
          imageUrl: "https://assets.architecturaldigest.in/photos/60084df58661bd303c240db8/master/w_1600%2Cc_limit/Bangalore-interior-design-images-2.jpg",
          contact: {
            name: "Ritu Verma",
            phone: "+91 4321098765",
            email: "ritu@example.com"
          }
        },
        {
          id: 7,
          title: "1 BHK Flat in Electronic City",
          location: "Electronic City, Bangalore",
          price: "₹15,000/month",
          bedrooms: 1,
          bathrooms: 1,
          size: "550 sq.ft",
          imageUrl: "https://www.idesignarch.com/wp-content/uploads/Modern-House-Bangalore_3.jpg",
          contact: {
            name: "Deepak Mehta",
            phone: "+91 3210987654",
            email: "deepak@example.com"
          }
        },
        {
          id: 8,
          title: "Luxury 5 BHK Villa in Sarjapur Road",
          location: "Sarjapur Road, Bangalore",
          price: "₹1,20,000/month",
          bedrooms: 5,
          bathrooms: 5,
          size: "4500 sq.ft",
          imageUrl: "https://th.bing.com/th/id/R.b050392d8e5c2cb30b16164a8431670e?rik=wyJAbOByyFRNxA&riu=http%3a%2f%2fphotonshouse.com%2fphoto%2fff%2fff08782872c8021f0832d95490452a3a.jpg&ehk=ReD2WcRZ6kd2kEL5ncS4q1GMVI%2bOiW0r9GL0GmuwjlA%3d&risl=&pid=ImgRaw&r=0",
          contact: {
            name: "Neha Kapoor",
            phone: "+91 2109876543",
            email: "neha@example.com"
          }
        }
      ];
      
    return(
        <div>
            <Navbar/>
            <div className="rental-section">
            <h1 className="availble-rental">Available Rentals</h1>
            <div className="rental-items-section">
                {rentalsDetails.map(each=>(
                    <RentalItem itemDetails={each} key={each.id}/>
                ))}
            </div>
            </div>
        </div>
    )
}

export default BrowseRentals