import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem,addQuantity,subtractQuantity} from '../../../store/actions/index'
import Recipe from './Recipe/Recipe'
//import classes from '../Pages.module.css'
import myClasses from './Cart.module.css'
//import Item from '../Shop/Items/Item/Item'
//import Auxiliary from '../../../hoc/Auxiliary'

class Cart extends Component{

    //to remove the item completely
    handleRemove = (id)=>{
        this.props.removeItem(id);
    }
    //to add the quantity
    handleAddQuantity = (id)=>{
        this.props.addQuantity(id);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (id)=>{
        this.props.subtractQuantity(id);
    }
    render(){
              
        let addedItems = this.props.items.length ?
            (  
                this.props.items.map(item=>{
                    return(
                         <div className={myClasses.Cart} key={item.id}>
                            {/* Product */}
                            <div className={myClasses.Item}>
                                {/* Remove */}
                                <div className={myClasses.Remove}>
                                    <i className="material-icons" onClick={()=>{this.handleRemove(item.id)}}>clear</i>
                                </div>

                                {/* Image */}
                                <div className={myClasses.CardThumbnail}>
                                    <img src={item.img} alt={item.alt} />
                                </div>
                                
                                {/* Description */}
                                <div className={myClasses.CardDescription}>
                                    <b>
                                    <span className="title">{item.title}</span>
                                    </b>
                                    <p>{item.desc}</p>
                                </div>

                                 {/* Quantity */}
                                <div className={myClasses.CardQuantity}>
                                    <Link to="/shop/cart"><i className="material-icons" onClick={()=>{this.handleSubtractQuantity(item.id)}}>arrow_drop_down</i></Link>
                                    <p><b>{item.quantity}</b></p>
                                    <Link to="/shop/cart"><i className="material-icons" onClick={()=>{this.handleAddQuantity(item.id)}}>arrow_drop_up</i></Link>                                    
                                </div>
 
                                {/* Price */}
                                <div className={myClasses.CardPrice}><b> ${item.price}</b></div>
                            </div>
                        </div>
                    )
                })
            ):

             (  
                <p>Nothing.</p>
             )
        return(
            <div className={myClasses.Cart}>
                {/* Title */}
                <div className={myClasses.Title}>
                    <h3>My Shopping Cart:</h3>
                </div>
                <div className={myClasses.Collection}>
                    {addedItems}
                    <Recipe />  
                </div>
            </div>
       )
    }
}


const mapStateToProps = (state)=>{
    return{
        items: state.cart.addedItems,
        //addedItems: state.addedItems
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (id)=>{dispatch(removeItem(id))},
        addQuantity: (id)=>{dispatch(addQuantity(id))},
        subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)