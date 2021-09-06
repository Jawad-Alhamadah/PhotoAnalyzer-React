import React from "react"
import NavBar from './NavBar'
import Footer from './Footer'
import MainContent from "./MainContent"
import { Switch, Route } from 'react-router-dom'
import HomePage from '../HomePage/HomePage'
//import {Button, Alert,Breadcrumb,Card,Container,Row,Col,Nav,Navbar,NavDropdown} from 'react-bootstrap'
class MyApp extends React.Component {
 
  render(){
      return ( 
        
      <div  > 
         <Switch>
           
            <Route exact path='/crop' >
             
                <NavBar   backgroundColor='bg-warning' /> 
                <div id="main"> 
                <MainContent/>
              </div>
            </Route>

            <Route path='/home' >
                <NavBar   textColor='text-white' classes=' custom-shadow custom-index'  backgroundColor='bg-dark' /> 
                <HomePage/>
            </Route>
          
         </Switch>
        <Footer />
      </div>
      )     
  }
}

export default MyApp
//onMouseOver
//onCLick
//onChan