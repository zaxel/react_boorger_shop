import React from "react";
import Header from "./Header";
import Burger from "./Burger";

class Menu extends React.Component{
    render(){
        return(
            <div className='burger__menu menu'>
                <Header {...this.props}/>
                <Burger/>
            </div>
            
        )
    }
}

export default Menu;