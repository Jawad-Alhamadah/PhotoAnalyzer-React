import {
  React,
  useRef,
  forwardRef,
  useEffect,
  useState
} from 'react'




const CanvasArea = forwardRef(function (props, ref) {
      let [image, setImage] = useState(props.image)
      let [postion, setPostion] = useState({
        x: props.x,
        y: props.y,
        PrevX: props.PrevX,
        PrevY: props.PrevY
      })
      let [ctx, setCtx] = useState('')
      let [isMouseDown, setIsMouseDown] = useState(false)
       

      useEffect(() => {
        setCtx(ref.current.getContext('2d'))
      }, [])

      useEffect(() => {
        if (props.image !== "") {
          setImage(props.image)
        }

      }, [props.image])

      useEffect(() => {
        if (image !== "") {
          ctx.drawImage(image, postion.x, postion.y)
          ctx.strokeStyle = 'Red'
          ctx.strokeRect(props.cropRect.x, props.cropRect.y, props.cropRect.width, props.cropRect.height)
        }

      }, [image])


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
        if (isMouseDown && image !== '') {
          ctx.fillStyle = 'White'
          ctx.fillRect(0, 0, 1000, 1000)
          let imgX = postion.x + (event.clientX - postion.PrevX)
          let imgY = postion.y + (event.clientY - postion.PrevY)
          ctx.drawImage(image, imgX, imgY);
          ctx.strokeStyle = 'Red'
          ctx.lineWidth = 2;
          setPostion(prevState => ({
            ...prevState,
            PrevX: event.clientX,
            PrevY: event.clientY,
            x: imgX,
            y: imgY
          }));
          ctx.strokeRect(props.cropRect.x, props.cropRect.y, props.cropRect.width, props.cropRect.height)

         
          //ctx.strokeRect(cropRectX, cropRectY,  cropWidth, cropHeight)
          // prevX=  e.clientX
          // prevY=  e.clientY
        }
      }
    return (
        <canvas ref={ref} 
          width="1400" 
          height="500" 
          onMouseDown={handleMouseDown} 
          onMouseUp={handleMouseUp} 
          onMouseMove={handleMouseMove}>
            
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