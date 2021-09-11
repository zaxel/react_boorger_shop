import React from "react";
import PropTypes from "prop-types";

class MenuEditorForm extends React.Component{
    static propTypes = {
        burger: PropTypes.shape({
            name: PropTypes.string,
            price: PropTypes.number,
            status: PropTypes.string,
            descr: PropTypes.string,
            image: PropTypes.string,
        }),
        changeBurger: PropTypes.func,
        index: PropTypes.string,
    }
    changeHandler = (e) => {
        const formData = {
            ...this.props.burger
        }
        
        formData[e.currentTarget.name] = e.currentTarget.value;
        if(e.currentTarget.name === 'price') formData[e.currentTarget.name] = parseFloat(e.currentTarget.value);
        this.props.changeBurger(formData, this.props.index);
    }
    
    render(){
        return(
            <form onSubmit={(e)=>{e.preventDefault(); this.props.removeBurger(this.props.index)}} className='editor__form editor-form'>
                <div className='editor-form__main'>
                    <input onChange={this.changeHandler} type="text" name="name" value={this.props.burger.name}/>
                    <input onChange={this.changeHandler} type="number" step=".01" name="price" value={parseFloat(this.props.burger.price).toFixed(2)}/>
                </div>
                <select onChange={this.changeHandler} name="status" value={this.props.burger.status}>
                    <option value="available">available</option>
                    <option value="out_of_stock">Out of stock</option>
                </select>
                <textarea onChange={this.changeHandler} name="descr" rows="3" value={this.props.burger.descr}/>
                <input onChange={this.changeHandler} type="text" name="image" value={this.props.burger.image}/>
                <button className="select-button">remove item<span>remove item</span></button>
            </form>
        )
    }
}

export default MenuEditorForm;