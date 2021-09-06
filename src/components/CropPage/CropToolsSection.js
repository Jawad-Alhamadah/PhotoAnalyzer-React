import {React,forwardRef} from 'react' 
import ImageToCanvasButton from './ImageToCanvasButton'
import axios from 'axios'
import { createCanvas } from 'canvas' 
//import Button from "./StyleComponents/Button"
import {Row} from 'react-bootstrap'
import useWindowDimensions from '../CustomHooks/windowDimensions'
import ButtonMDB from './ButtonMDB'
import 'bootstrap/dist/css/bootstrap.min.css'


/* <Card style={{color:"blue"}}>
<Card.Body>
  <Card.Title>fuck</Card.Title>
</Card.Body>
<Alert variant="danger"> scary text</Alert>
</Card> */

const CropBar= forwardRef(function (props,ref) {
  const { height, width } = useWindowDimensions();
    function crop( ){
        let ctx=ref.current.getContext('2d')
        
        let imgData =ctx.getImageData((width/2)-props.cropRect.width/2, (height/2)-props.cropRect.height, props.cropRect.width, props.cropRect.height)
        let tempCanvas=createCanvas(props.cropRect.width,props.cropRect.height)
        let tempCtx=tempCanvas.getContext('2d')               
        tempCtx.putImageData(imgData,0,0)
         
        let Pic=tempCanvas.toDataURL("image/jpeg", 1.0); 
        Pic = Pic.replace(/^data:image\/\w+;base64,/, "")
        console.log(' pic: '+Pic)
        axios.post("http://localhost:7800/UploadImage",{img:Pic})

      }
       
      async function drawUploadImage (data){
        let img =data.image  
        let ctx= ref.current.getContext('2d')  
        let resizedScales=resizeImage(img.width,img.height,ref.current.width,ref.current.height)
         let resizedImg = await createImageBitmap( img, {
          resizeWidth: resizedScales.width,
          resizeHeight: resizedScales.height,
          resizeQuality: 'high',
        })
          ctx.drawImage(resizedImg,0,0)
          props.setImage(resizedImg)
      }
    function  resizeImage(width,height,canvasWidth,canvasHeight){
          let ratio=0.9 //default ratio incase both width and height are equal
          let resizeWidth =  width
          let resizeHeight =  height
          let isImageTooWide = (width > canvasWidth)
          let isImageTooLong = (height > canvasHeight)
          if(resizeWidth>resizeHeight) ratio =resizeWidth/resizeHeight
          if(resizeWidth<resizeHeight) ratio =resizeHeight/resizeWidth 
          while (isImageTooWide || isImageTooLong) {
            if(resizeWidth>resizeHeight) {
              resizeWidth = resizeWidth - (ratio*5)
              resizeHeight = resizeHeight -5
            }
            if(resizeWidth<resizeHeight) {
              resizeWidth = resizeWidth -5
              resizeHeight = resizeHeight -(ratio*5)
            } 
            isImageTooWide = (resizeWidth >canvasWidth)
            isImageTooLong = (resizeHeight > canvasHeight)
          }
         return {width:resizeWidth,height:resizeHeight} 
      }


          return (
              <div >
               <Row className="row justify-content-center pt-3  p-0 g-0">
                    <ImageToCanvasButton drawUploadImage={drawUploadImage} className='col-2 bg-secondary m-1'/> 
                    <ButtonMDB function={crop} text='Crop'></ButtonMDB>
               </Row>
              </div>
          )  
  }) 

export default CropBar