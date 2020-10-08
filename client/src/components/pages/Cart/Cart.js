import React from 'react';
import { connect } from 'react-redux'
//import { Link } from 'react-router-dom'
import { removeItem,addQuantity,subtractQuantity} from '../../../store/actions/index'
import Recipe from './Recipe/Recipe'
import classes from '../Pages.module.scss'
import myClasses from './Cart.module.scss'
//import Item from '../Shop/Items/Item/Item'
import Auxiliary from '../../../hoc/Auxiliary'

const Cart = props => {

    //to remove the item completely
    const handleRemove = (id)=>{
        props.removeItem(id);
    }
    //to add the quantity
    const handleAddQuantity = (id)=>{
        props.addQuantity(id);
    }
    //to substruct from the quantity
    const handleSubtractQuantity = (id)=>{
        props.subtractQuantity(id);
    }

        let cart = props.items;
        let uniqueChars = [...new Set(cart)];
        let addedItems = props.items.length ?
            (  
                uniqueChars.map(item=>{
                    return(
                         <div className={myClasses.Cart} key={item.id}>
                            {/* Product */}
                            <div className={myClasses.Item}>
                                {/* Remove */}
                                <div className={myClasses.Remove}>
                                    <i className="material-icons" onClick={()=>{handleRemove(item.id)}}>clear</i>
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
                                    <i className={["material-icons", myClasses.MaterialIcons, classes.noselect].join(' ')} onClick={()=>{handleSubtractQuantity(item.id)}}>arrow_drop_down</i>
                                    <p><b>{item.quantity}</b></p>
                                    <i className={["material-icons", myClasses.MaterialIcons, classes.noselect].join(' ')} onClick={()=>{handleAddQuantity(item.id)}}>arrow_drop_up</i>                                   
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
            <Auxiliary>
                <div className='container'>
                    <div className={['page-header', 'text-center'].join(' ')}>
                        <a href='/shop' ><h2>Shop</h2></a>
                    </div>
                </div>

                <div className={[classes.Card, myClasses.Shop].join(' ')}>
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
                </div>
            </Auxiliary>
       )
    }



const mapStateToProps = (state)=>{
    return{
        items: state.cart.addedItems,
        //addedItems: state.addedItems
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem       : (id)=>{dispatch(removeItem(id))},
        addQuantity      : (id)=>{dispatch(addQuantity(id))},
        subtractQuantity : (id)=>{dispatch(subtractQuantity(id))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)