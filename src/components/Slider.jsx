import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import { Swiper, SwiperSlide } from 'swiper/react'
import Spinner from './Spinner'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import 'swiper/swiper.min.css'


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';




function Slider() {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)  

  const navigate = useNavigate()

  useEffect( () => {

    const fetchListing = async () => {
      const listingRef = collection(db, 'listings')
      const q = query(listingRef, orderBy('timestamp', 'desc'), limit(5))
      const querySnap = await getDocs(q)

      let listings = []
  
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

    console.log(listings)  
    setListings(listings)
    setLoading(false)
    }

    fetchListing()

  }, [])

  if(loading) {
      return <Spinner />
  }

  if(listings.length === 0) {
    return <></>
  }

  return (
     listings && (
      <>
        <p className="exploreHeading">Recommended</p>
        <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} 
                slidesPerView={1} 
                navigation
                pagination={{ clickable: true }}
         >
            { 
              listings.map(({data, id}) => (
                <SwiperSlide  key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
                    <div 
                        className="swiperSlideDiv"
                        style={{
                          background: `url(${data.imgUrls[0]}) center no-repeat`, 
                          backgroundSize: 'cover',  
                          minHeight: '20rem' 
                        }} 
                    >
                      <p className="swiperSlideText">{data.name}</p>
                      <p className="swiperSlidePrice">
                        ${data.discountedPrice ?? data.regularPrice}
                      </p>
                    </div> 
                </SwiperSlide> 
              ))}
        </Swiper>
      </>
     )
  )
}

export default Slider