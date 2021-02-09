import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
//import { Link } from 'react-router-dom'
import { removeItem,addQuantity,subtractQuantity} from '../../../store/actions/index'
import Recipe from './Recipe/Recipe'
import classes from '../Pages.module.scss'
import myClasses from './Cart.module.scss'
//import Item from '../Shop/Items/Item/Item'
import Auxiliary from '../../../hoc/Auxiliary'
import OrderSummary from './OrderSummary/OrderSummary'
import Modal from '../../UI/Modal/Modal'
import { useHistory } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
//import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
//const stripePromise = loadStripe('pk_test_v4y6jC0D3v8NiKZpKLfjru4300g9fG6D5X');


const Cart = props => {
    const [purchasing, setPurchasing] = useState(false);
    
    const reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue.quantity * currentValue.price);
    let total
   
    //to remove the item completely
    const handleRemove              = (id)=>{ props.removeItem(id)}
    //to add the quantity
    const handleAddQuantity         = (id)=>{ props.addQuantity(id)}
    //to substruct from the quantity
    const handleSubtractQuantity    = (id)=>{ props.subtractQuantity(id);}
    const history = useHistory()
    
    const purchaseHandler = () => {
        if (props.isAuth) {history.push('/contactData')
        } else {history.push('/authentication');}
    }

    const purchaseCancelHandler = () => {setPurchasing(false)}

    const purchaseContinueHandler = async (event) => {history.push('/cart')};

    useEffect(() => {
        const fetchData = async () => { props.loadCart() }
        if ( props.items.length === 0){ 
            console.log('fetchingData')
            fetchData() 
        }
    }, [])


    let orderSummary = null
    if (props.items) {
        orderSummary = <OrderSummary 
            items={props.items}
            total={total}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
        />;
    }

    let cartList = props.items;
    console.log("cartList"+cartList)
    let addedItems = props.items.length ?
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
                                <i className={["material-icons", myClasses.MaterialIcons, classes.noselect].join(' ')} onClick={()=>{handleSubtractQuantity(item.id)}}>arrow_drop_down</i>
                                <p><b>{item.amount}</b></p>
                                <i className={["material-icons", myClasses.MaterialIcons, classes.noselect].join(' ')} onClick={()=>{handleAddQuantity(item.id)}}>arrow_drop_up</i>                                   
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
                            <h1>Shopping Cart:</h1>
                        </div>
                        <div className={myClasses.Collection}>
                            {addedItems}
                            {total ? <h3>Total = ${total}</h3> : null}
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
        isAuth  : state.auth.payload
        //addedItems: state.addedItems
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        loadCart         : (cart)   =>{ dispatch(actions.loadCart(cart))},
        removeItem       : (id)     =>{dispatch(removeItem(id))},
        addQuantity      : (id)     =>{dispatch(addQuantity(id))},
        subtractQuantity : (id)     =>{dispatch(subtractQuantity(id))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)