import {React,forwardRef,useEffect,useState} from 'react'
import useWindowDimensions from '../CustomHooks/windowDimensions'
 
const CanvasArea = forwardRef(function (props, ref) {
      let [image, setImage] = useState(props.image)
      let [scale, setScale] = useState(1)
      const { height, width } = useWindowDimensions();
      let [ctx, setCtx] = useState('')
      let [isMouseDown, setIsMouseDown] = useState(false)
      let [postion, setPostion] = useState({
      
        x: 0,
        y: 0,
        PrevX: 0,
        PrevY: 0
      })
     
      useEffect(() => {
       
        setCtx(ref.current.getContext('2d'))
        setScale(props.sliderScale)
      }, [])
    
      useEffect(() => { 
        setScale(props.sliderScale) 
        if(props.image!=="") rescaleImage() 
      }, [props.sliderScale])
async function rescaleImage(){
  let ratio=(scale-50)/70;
  ctx.fillStyle = "#262a31"
  ctx.fillRect(0, 0, width, height)
  let resizedImg = await createImageBitmap( image, {
    resizeWidth:  Math.ceil(image.width+(image.width*ratio)), 
    resizeHeight:  Math.ceil(image.height+(image.height*ratio)) ,
    resizeQuality: 'high'
  })
  ctx.drawImage(resizedImg, postion.x, postion.y);
  
  let centered_X=(width/2)-props.cropRect.width/2
  let centered_Y=(height/2)-props.cropRect.height

  
  let unshadedArea=ctx.getImageData(centered_X, centered_Y, props.cropRect.width, props.cropRect.height)

  ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
  ctx.fillRect(0, 0, width, height)
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'Red'
  ctx.putImageData(unshadedArea,centered_X,centered_Y)
  ctx.strokeRect(centered_X,centered_Y, props.cropRect.width, props.cropRect.height)
}

useEffect(() => {
   console.log('heeh')
}, [ ])
      useEffect(() => {
         if (props.image !== "") setImage(props.image)
      }, [props.image])

      useEffect(() => {
         if (image !== "") drawCanvasImage({clientX:0,clientY:0})
      }, [image])

      useEffect(() => {
        if (image !== "") drawCanvasImage({clientX:0,clientY:0}) 
      },[width,height])
     
    
      async function handleMouseDown(event) {
        setPostion(prevState => ({
          ...prevState,
          PrevX: event.clientX,
          PrevY: event.clientY
        }));
        setIsMouseDown(true)
      }

      function handleMouseUp(event) {
        setIsMouseDown(false)
      }
      function handleMouseMove(event) {
        if (isMouseDown && image !== '') drawCanvasImage(event)
      }
      async function drawCanvasImage(event){

        let ratio=(scale-50)/70;
      
       
        let resizedImg = await createImageBitmap( image, {
          resizeWidth:  Math.ceil(image.width+(image.width*ratio)), 
          resizeHeight:  Math.ceil(image.height+(image.height*ratio)) ,
          resizeQuality: 'high'
        })
         

        let centered_X=(width/2)-props.cropRect.width/2
        let centered_Y=(height/2)-props.cropRect.height
        ctx.fillStyle = "#262a31"
        ctx.fillRect(0, 0, width, height)
        let imgX = postion.x + (event.clientX - postion.PrevX)
        let imgY = postion.y + (event.clientY - postion.PrevY)
      
        ctx.drawImage(resizedImg, imgX, imgY);
        if (isMouseDown)setPostion(prevState => ({
          ...prevState,
          PrevX: event.clientX,
          PrevY: event.clientY,
          x: imgX,
          y: imgY
        }));
        let unshadedArea=ctx.getImageData(centered_X, centered_Y, props.cropRect.width, props.cropRect.height)

        ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
        ctx.fillRect(0, 0, width, height)
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'Red'
        ctx.putImageData(unshadedArea,centered_X,centered_Y)
        ctx.strokeRect(centered_X,centered_Y, props.cropRect.width, props.cropRect.height)
      }

    return (
        <canvas ref={ref} 
          width={width}
          height={height-200}
          onMouseDown={handleMouseDown} 
          onMouseUp={handleMouseUp} 
          onMouseMove={handleMouseMove}
        >
            
        </canvas>
    )

    // constructor(){
    //     super()
    //     this.state={
    //         image : new Image(),
    //         ImageWidth:0,
    //         ImageHeight:0,
    //         imageSrc:''
    //     }
    // }
    
    
      /* 
        img.onload = async () => {
      console.log(this.canvas )
      let resizeWidh =  img.width
      let resizeHeight =  img.height
      let isImageTooWide = ( img.width > this.canvas.width)
      let isImageTooLong = ( img.height > this.canvas.height)
      while (isImageTooWide || isImageTooLong) {
        resizeWidh = resizeWidh * 0.75
        resizeHeight = resizeHeight * 0.75
        isImageTooWide = (resizeWidh > this.canvas.width)
        isImageTooLong = (resizeHeight > this.canvas.height)
      }
      this.data = await createImageBitmap( img, {
        resizeWidth: resizeWidh,
        resizeHeight: resizeHeight,
        resizeQuality: 'high',
      })
      this.ctx.drawImage(this.data, 0, 0)
      this.ctx.strokeStyle = 'Red'
      let rectCenterOffsetX = (this.canvas.width / 2) - (this.rectangleInfoObject.recWidth / 2)
      let rectCenterOffsetY = (this.canvas.height / 2) - (this.rectangleInfoObject.recHeight / 2)
      this.ctx.strokeRect(rectCenterOffsetX, rectCenterOffsetY, this.rectangleInfoObject.recWidth, this.rectangleInfoObject.recHeight)

    }
          */
   
}) 


export default CanvasArea