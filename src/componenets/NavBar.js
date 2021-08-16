import {React,Component} from 'react' 

class NavBar extends Component {

    constructor(){
        super()
    }
    
    render(){
        return (
            <div>
                <button>Home</button>
                <button>History</button>
                <button>Contact </button>
                <button>filler</button>
                <button>anoter filler</button>
            </div>
        )
    }
}

export default NavBar