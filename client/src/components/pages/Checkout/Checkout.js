import React, {useState} from 'react'
import { connect } from 'react-redux'
import classes from '../Pages.module.scss'
import myClasses from './Checkout.module.scss'
import Auxiliary from '../../../hoc/Auxiliary'
import { useHistory } from 'react-router-dom'
import { removeItem,addQuantity,subtractQuantity} from '../../../store/actions/index'

const Checkout = props => {    
    const history = useHistory()
    return (
        <Auxiliary>
            <div className={[classes.Card, myClasses.Shop].join(' ')}>
                <div className={myClasses.Cart}>
                    {/* Title */}
                    <div className="container">
                        <div className="page-header text-center border-bottom">
                            <h1>Checkout</h1>
                        </div>
                    </div>
                    <div className={myClasses.Progress}>
                    <html>
  <head><title>Thanks for your order!</title></head>
  <body>
    <h1>Thanks for your order!</h1>
    <p>
      We appreciate your business!
      If you have any questions, please email
      <a href="mailto:orders@example.com">orders@example.com</a>.
    </p>
  </body>
</html>
                    </div>
                </div>
            </div>
        </Auxiliary>
    )
}



const mapStateToProps = (state)=>{
    return{
        items: state.cart.addedItems,
        isAuth: state.auth.payload
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
export default connect(mapStateToProps,mapDispatchToProps)(Checkout)