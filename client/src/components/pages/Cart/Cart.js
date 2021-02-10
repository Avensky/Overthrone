import React, {useState} from 'react';
import { connect } from 'react-redux'
import classes from '../Pages.module.scss'
import myClasses from './Cart.module.scss'
//import Item from '../Shop/Items/Item/Item'
import Auxiliary from '../../../hoc/Auxiliary'
import OrderSummary from './OrderSummary/OrderSummary'
import Modal from '../../UI/Modal/Modal'
import { useHistory } from 'react-router-dom';
import * as actions from '../../../store/actions/index';

const Cart = props => {
    const [purchasing, setPurchasing] = useState(false);
    //const reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue.quantity * currentValue.price);
    //to remove the item completely
    const handleRemove              = (id)=>{ props.removeItem(id)}
    //to add the quantity
    const addToCart                 = (id)=>{ props.addToCart(id)}
    //to substruct from the quantity
    const handleSubtractQuantity    = (id)=>{ props.subtractQuantity(id);}
    const history = useHistory()
    
    const purchaseHandler = () => {
        if (props.isAuth) {history.push('/contactData')
        } else {history.push('/authentication');}
    }

    const purchaseCancelHandler = () => {setPurchasing(false)}

    const purchaseContinueHandler = async (event) => {history.push('/cart')};

    let orderSummary = null
    if (props.items) {
        orderSummary = <OrderSummary 
            items={props.items}
            total={props.total}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
        />;
    }

    let cartList = props.items;
    //console.log("cartList"+cartList)
    let addedItems = cartList.length ?
        (  
            cartList.map(item=>{
                return(
                    <div className={myClasses.Cart} key={item._id}>
                        {/* Product */}
                        <div className={myClasses.Item}>
                            {/* Remove */}
                            <div className={myClasses.Remove}>
                                <i className="material-icons" onClick={()=>{handleRemove(item._id)}}>clear</i>
                            </div>

                            {/* Image */}
                            <div className={myClasses.CardThumbnail}>
                                <img src={'http://localhost:5000/'+item.imageData} alt={item.alt} />
                            </div>
                            
                            {/* Description */}
                            <div className={myClasses.CardDescription}>
                                <b><span className="title">{item.title}</span></b>
                                <p>{item.desc}</p>
                            </div>

                            {/* Quantity */}
                            <div className={myClasses.CardQuantity}>
                                <i className={["material-icons", myClasses.MaterialIcons, classes.noselect].join(' ')} onClick={()=>{handleSubtractQuantity(item._id)}}>arrow_drop_down</i>
                                <p><b>{item.amount}</b></p>
                                <i className={["material-icons", myClasses.MaterialIcons, classes.noselect].join(' ')} onClick={()=>{addToCart(item._id)}}>arrow_drop_up</i>                                   
                            </div>

                            {/* Price */}
                            <div className={myClasses.CardPrice}><b> ${item.price}</b></div>
                        </div>
                    </div>
                )
            })
        )
        :<p>Nothing.</p>
        return(
            <Auxiliary>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
                <div className={[classes.Card, myClasses.Shop].join(' ')}>
                    <div className={myClasses.Cart}>
                        {/* Title */}
                        <div className={myClasses.Title}>
                            <h1><a href="/cart">Shopping Cart</a></h1>
                        </div>
                        <div className={myClasses.Collection}>
                            {addedItems}
                            {props.total ? <h3>Total = ${props.total}</h3> : null}
                            <button 
                                className='btn-primary btn'
                                // disabled={!props.purchaseable}
                                type="button" role="link"
                                onClick={purchaseHandler}>{
                                    props.isAuth 
                                        ? 'CONTINUE TO CHECKOUT' 
                                        : 'SIGN IN TO ORDER'}
                            </button>
                            {/* <Recipe items={array} total={total}/> */} 
                        </div>
                    </div>
                </div>
            </Auxiliary>
       )
    }



const mapStateToProps = (state)=>{
    return{
        items   : state.cart.addedItems,
        total   : state.cart.total,
        isAuth  : state.auth.payload
        //addedItems: state.addedItems
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        loadCart         : (cart)   =>{ dispatch(actions.loadCart(cart))},
        removeItem       : (id)     =>{ dispatch(actions.removeItem(id))},
        addToCart        : (id)     =>{ dispatch(actions.addToCart(id))},
        subtractQuantity : (id)     =>{ dispatch(actions.subtractQuantity(id))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)