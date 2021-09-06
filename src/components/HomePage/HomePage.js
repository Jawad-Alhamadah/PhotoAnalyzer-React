import {React, useEffect} from "react"
import { Row,Col,Card,Button } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import useWindowDimensions from '../CustomHooks/windowDimensions'

//<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
//<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
//<div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
//Photo by Andrej Lišakov on Unsplash

//Photo by Adrienn87 form PxHere
function HomePage(){



    useEffect(()=>{
        const firstPageTextObserver = new IntersectionObserver(entries => {
           
            entries.forEach(entry => {
                 
              const text = entry.target.querySelectorAll('div');
          
              if (entry.isIntersecting) {
                text.forEach(s=>s.classList.add('custom-title-main'))
                
                return; // if we added the class, exit the function
              }
          
              // We're not intersecting, so remove the class!
              text.forEach(s=>s.classList.remove('custom-title-main'))
            });
          });
          firstPageTextObserver.observe(document.querySelector('.square-wrapper'));



          const secondPageBackGroundObserver = new IntersectionObserver(entries => {
           
            entries.forEach(entry => {
                
              const image = entry.target.querySelectorAll('img');
          
              if (entry.isIntersecting) {
                image.forEach(s=>s.classList.add('custom-fade-in','slide-down'))
                
                return; // if we added the class, exit the function
              }
          
              // We're not intersecting, so remove the class!
              image.forEach(s=>s.classList.remove('custom-fade-in','slide-down'))
            });
          });
          secondPageBackGroundObserver.observe(document.querySelector('.square-wrapper2'));



          const secondPageTextObserver = new IntersectionObserver(entries => {
           
            entries.forEach(entry => {
                
              const text = entry.target.querySelectorAll('div');
          
              if (entry.isIntersecting) {
                text.forEach(s=>s.classList.add('custom-fade-in'))          
                return; // if we added the class, exit the function
              }
              // We're not intersecting, so remove the class!
              text.forEach(s=>s.classList.remove('custom-fade-in'))
            });
          });
          secondPageTextObserver.observe(document.querySelector('.square-wrapper3'));
    },[])
    const { height, width } = useWindowDimensions();
    
    return(
        <div id="whole-page-home">
            <Row id="main-content"  className="   gx-0 "  >
                <div  className="col-4 gx-0  custom-margin-left square-wrapper ">
                    <div className="  custom-font-size   custom-margin-top text-white  custom-font-bold custom-font-family   "  >
                    UPLOAD IMAGES     
                    </div >
                    <div className="   custom-font-size   text-white   custom-font-bold  custom-font-family px-5 "   >
                    &
                    </div >
                    <div className="  custom-font-size  text-white  custom-font-bold custom-font-family  "  >
                    REVIEW PRODUCTS
                    </div >
                    <Button className="  custom-font-size custom-font-bold custom-font-family  "  variant ="outline-danger" >
                    REVIEW PRODUCTS
                    </Button >
                    
                </div >
                    <img src='glass1.jpg'   className="col-9  "    id="first-page-background" ></img>      
            </Row>
            <div id="main-content" className=" ">
                <div className="square-wrapper2">
                 <img src='glass4.jpg'   height={height}    width={width}  id="second-page-background"  ></img>
                </div>
                <div className=" custom-flex-center">
                    <div className="square-wrapper3">
                                            <Card style={{ width: '27rem' ,height: '30rem' }}>
                        <Card.Img variant="top" src="whatdidyousayaboutme.png "     />
                        <Card.Body>
                            <Card.Title>Upload and Crop</Card.Title>
                            <Card.Text>
                                upload an image. Resize it, move it to position and Crop!
                                We will give you as much product information as we can 
                            </Card.Text>
                            <Button variant="outline-info" href='crop' className=" custom-font-size-2 custom-font-bold custom-font-family">LETS GO!</Button>
                        </Card.Body>
                        </Card>
                    </div>
                    
                </div>
            </div>  
        </div>
        
                
    )
}

export default HomePage