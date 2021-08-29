import React from 'react';

const formHandler = (e) => {
    e.preventDefault();
}

class MenuForm extends React.Component{
    render(){
        return(
            <form onSubmit={formHandler} className='editor__form editor-form'>
                <div className='editor-form__main'>
                    <input type="text" name="burger_title" placeholder="Title"/>
                    <input type="number" name="burger_price" placeholder="Price"/>
                </div>
                <select name="burger_status">
                    <option defaultValue="available">Available</option>
                    <option value="out_of_stock">Out of stock</option>
                </select>
                <textarea name="burger_descr" placeholder="Enter burger description" rows="3"/>
                <input type="text" name="burger_img" placeholder="Image"/>
                <button className="select-button">Add To Menu<span>Add To Menu</span></button>
            </form>
        )
    }
}

export default MenuForm;