import {React,Component,useRef,forwardRef,useState} from 'react' 
import CropBar from './CropBar.js'
import CanvasArea from './CanvasArea'

function MainContent () {
    const canvas = useRef(null);
    let [image,setImage] = useState("")  
    let cropRect= { x: 500, y: 300, width: 230, height: 170 } 
    
    

        return (
            <div>
                <CropBar    ref={canvas} cropRect={cropRect} setImage={setImage}/>  
                <CanvasArea ref={canvas} image={image} x={0} y={0} PrevX={0} PrevY={0} cropRect={cropRect}/>       
            </div>
        )
}

export default MainContent 