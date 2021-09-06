import {React,useRef,useState,useEffect} from 'react' 
import CropToolsSection  from './CropToolsSection.js'
import CanvasArea from './CanvasArea'

function MainContent () {
    const canvas = useRef(null);
    const slider = useRef(null);
    let [image,setImage] = useState("")
    let [scale,setScale] = useState(1)

    useEffect(()=>{
        setScale(slider.current.value)
    },[])

   function handleSlide(){
       console.log('changed')
    setScale(slider.current.value)
    }
    let cropRect= { x: 500, y: 300, width: 230, height: 170 } 
        return (
            
                <div>
                    <div id="nav-and-tools-div">
                        <CropToolsSection    ref={canvas} cropRect={cropRect} setImage={setImage}/>  
                        <label for="customRange1" class="form-label">.</label>
                        <input ref={slider} type="range" class="form-range" id="customRange1" onChange={handleSlide}></input>
                    </div>
                    <CanvasArea ref={canvas} sliderScale={scale} image={image}  cropRect={cropRect} width={'500%'} height={'500%'}/>       
                </div>
           
        )
}

export default MainContent 