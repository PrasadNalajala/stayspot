import React, { useState } from 'react';
import './index.css';
import Navbar from '../Navbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 


const RentalDetails = () => {
    const rentalData = {
        title: "Luxury Villa with Private Pool",
        images: [
            "https://res.cloudinary.com/dnd03w7us/image/upload/v1731258220/utdfg7ymlkwm9quu7ugc.jpg",
            "https://res.cloudinary.com/dnd03w7us/image/upload/v1731258221/another-image.jpg",
            "https://th.bing.com/th/id/OIP.h61IxV-gjE7jF1i0Xw_qRAHaJ3?pid=ImgDet&w=184&h=245&c=7&dpr=1.3",
            ""
        ],
        location: "789 Palm Avenue, Beverly Hills, CA",
        price: "$15,000/month",
        description:
            "Experience ultimate luxury in this stunning villa located in Beverly Hills. Featuring a private pool, home theater, and gourmet kitchen, this property is perfect for entertaining guests or enjoying a peaceful retreat. The villa is surrounded by lush greenery and offers unparalleled privacy.",
        bedrooms: 5,
        bathrooms: 6,
        size: "5,500 sqft",
        availableFrom: "Available from: January 1, 2025",
        status: "Status: Available",
        phone: "+1 (123) 456-7890",
        email: "michael.johnson@example.com",
        owner: {
            name: "Michael Johnson",
            profilePicture: "https://res.cloudinary.com/dnd03w7us/image/upload/v1731750393/lpjo3imiv1sm06lnj5j9.jpg",
        },
    };

    const {
        title,
        images,
        location,
        price,
        description,
        bedrooms,
        bathrooms,
        size,
        availableFrom,
        status,
        phone,
        email,
        owner,
    } = rentalData;

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const handlePostComment = () => {
        if (newComment.trim()) {
            setComments([...comments, newComment.trim()]);
            setNewComment("");
        }
    };

    return (
        <>
            <Navbar />
            <div className="rental-details-page">
                <div className="rental-header-container">
                    <div className="rental-image-container">
                        {images.length > 1 ? (
                            <Swiper spaceBetween={10} slidesPerView={1} loop>
                                {images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <img src={image} alt={title} className="rental-image" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <img src={images[0]} alt={title} className="rental-image" />
                        )}
                    </div>
                    <div className="rental-header">
                        <h1 className="rental-title">{title}</h1>
                        <p className="rental-location">{location}</p>
                        <p className="rental-price">{price}</p>
                        <div className="rental-specs">
                            <span>{bedrooms} Bedrooms</span>
                            <span>{bathrooms} Bathrooms</span>
                            <span>{size}</span>
                        </div>
                        <div className="rental-description">
                        <h2>Description</h2>
                        <p>{description}</p>
                        <p><strong>{availableFrom}</strong></p>
                        <p><strong>{status}</strong></p>
                    </div>
                    </div>
                </div>

                <div className="rental-details-info">
                    <div className="posted-by-section">
                        <img
                            src={owner.profilePicture}
                            alt={owner.name}
                            className="owner-profile-pic"
                        />
                        <p><strong>Posted By:</strong> {owner.name}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Phone:</strong> {phone}</p>
                    </div>
                    
                </div>

                <div className="comments-section">
                    <h2>Comments</h2>
                    <div className="comments-list">
                        {comments.length === 0 ? (
                            <p>No comments yet. Be the first to comment!</p>
                        ) : (
                            comments.map((comment, index) => (
                                <div key={index} className="comment">
                                    <p>{comment}</p>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Post a Comment */}
                    <div className="post-comment">
                        <textarea
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button onClick={handlePostComment}>Post Comment</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RentalDetails;
