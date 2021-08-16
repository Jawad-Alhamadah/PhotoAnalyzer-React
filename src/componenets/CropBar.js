import {React,Component, forwardRef} from 'react' 
import ImageToCanvasButton from './ImageToCanvasButton'
import axios from 'axios'
import { createCanvas } from 'canvas' 
const CropBar= forwardRef(function (props,ref) {
    function crop( ){
        let ctx=ref.current.getContext('2d')
        let imgData =ctx.getImageData(props.cropRect.x, props.cropRect.y, props.cropRect.width,props.cropRect.height)
        let tempCanvas=createCanvas(props.cropRect.width,props.cropRect.height)
        let tempCtx=tempCanvas.getContext('2d')               
        tempCtx.putImageData(imgData,0,0)
         
        let Pic=tempCanvas.toDataURL("image/jpeg", 1.0); 
        Pic = Pic.replace(/^data:image\/\w+;base64,/, "")
        console.log(' pic: '+Pic)
        axios.post("http://localhost:7800/UploadImage",{img:Pic})

      }
       
      const drawUploadImage=  async (data)=>{
        let img =data.image  
        let ctx= ref.current.getContext('2d')  
        let resizeWidh =  img.width
        let resizeHeight =  img.height
        let isImageTooWide = ( img.width > ref.current.width)
        let isImageTooLong = ( img.height > ref.current.height)
        while (isImageTooWide || isImageTooLong) {
          resizeWidh = resizeWidh * 0.75
          resizeHeight = resizeHeight * 0.75
          isImageTooWide = (resizeWidh > ref.current.width)
          isImageTooLong = (resizeHeight > ref.current.height)
        }
         let resizedImg = await createImageBitmap( img, {
          resizeWidth: resizeWidh,
          resizeHeight: resizeHeight,
          resizeQuality: 'high',
        })
          ctx.drawImage(resizedImg,0,0)
          props.setImage(resizedImg)
  
  
      }

          return (
              <div>
                  <ImageToCanvasButton drawUploadImage={drawUploadImage} /> 
                  <button onClick={crop}>Crop Image</button>
              </div>
          )  
  }) 

export default CropBar