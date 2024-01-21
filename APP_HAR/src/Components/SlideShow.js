import React, { useState } from 'react'
import { SliderBox } from 'react-native-image-slider-box'
import { FastImage } from 'react-native-fast-image'


export default function SlideShow() {

  const [image, setImage] = useState({
    images: [
      "https://source.unsplash.com/1024x768/?nature",
      "https://source.unsplash.com/1024x768/?water",
      "https://source.unsplash.com/1024x768/?girl",
      "https://source.unsplash.com/1024x768/?nature",
      "https://source.unsplash.com/1024x768/?tree", // Network image
      require('../assets/logo.png'),          // Local image
    ]
  })


  return (
    <SliderBox
      ImageComponent={FastImage}
      images={image.images}
      sliderBoxHeight={230}
      dotColor="#FFEE58"
      paginationBoxVerticalPadding={50}
      onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
      autoplay
      circleLoop
      resizeMethod={'resize'}
      resizeMode={'cover'}
    />

  )
}



