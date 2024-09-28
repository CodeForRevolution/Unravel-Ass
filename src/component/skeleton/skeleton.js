import React from 'react'
import './skeleton.css'

const Skeleton = () => {
  return (
    <div class="col-sm-6  col-md-4 col-lg-3   my-3 px-1">
   
    <div class="room-card-skeleton">
    
      <div class="room-image-skeleton skeleton"></div>

      
      <div class="room-info-skeleton">
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>

        <div class="skeleton price-skeleton"></div>

        <div class="skeleton skeleton-text small"></div>
        <div class="skeleton skeleton-text small"></div>

        <div class="skeleton button-skeleton"></div>
      </div>
    </div>
  </div>
  )
}

export default Skeleton