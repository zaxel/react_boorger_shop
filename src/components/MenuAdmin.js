import React from "react";
import MenuForm from "./MenuForm";
import sample_burgers from "../sample-burgers";
import MenuEditorForm from "./MenuEditForm";
import { TransitionGroup, CSSTransition } from "react-transition-group"

class MenuAdmin extends React.Component{
    
    render(){
        return(
            <div className='burgers__editor editor'>
                <h2 className='editor__tittle'>Edit Menu</h2>
                {/* <div className='editor__forms'> */}
                    <TransitionGroup component='div' className="edtr">
                        {Object.keys(this.props.burgers).map((key)=> {
                            return(
                                <CSSTransition classNames='edtr' key={key} timeout={{enter: 800, exit: 800}}>
                                    <MenuEditorForm key={key} index={key} burger={this.props.burgers[key]} changeBurger={this.props.changeBurger} removeBurger={this.props.removeBurger}/>
                                </CSSTransition>)
                        })}
                    <MenuForm {...this.props}/>
                    </TransitionGroup>
                
                {/* </div> */}
                <button onClick={() => this.props.loadSamples(sample_burgers)} className="editor__button select-button">Load Burgers Samples<span>Load Burgers Samples</span></button>
            </div>
            
        )
    }
}

export default MenuAdmin;