import React, { useState } from 'react';
//import classes from '../../Pages.module.scss';
import myClasses from './NewItem.module.scss';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';

const NewItem = ( props ) => {
    const [name, setName]           = useState("");
    const [desc, setDesc]           = useState("");
    const [price, setPrice]         = useState("");
    const [priceId, setPriceId]     = useState("");
    const [quantity, setQuantity]   = useState("");
    const [avatar, setAvatar]       = useState("");

    return (
        <div className={myClasses.NewItem}>
            <form action="/api/addImage" method="post" encType="multipart/form-data">
                <div className={myClasses.MidLine}>
                    <label className={myClasses.Left}>Name </label> 
                    <input  
                        type="text" 
                        name="name" 
                        onChange={e => setName(e.target.value)}
                        className={myClasses.Right}
                    />                            
                </div>
                <div className={myClasses.MidLine}>
                    <label className={myClasses.Left}>Description </label> 
                    <input  
                        type="text" 
                        name="desc" 
                        onChange={e => setDesc(e.target.value)}
                        className={myClasses.Right}
                    />
                </div>
            <div className={myClasses.MidLine}>
                <label className={myClasses.Left}>Price </label> 
                <input  
                    type="text" 
                    name="price" 
                    onChange={e => setPrice(e.target.value)}
                    placeholder=""
                    className={myClasses.Right}
                />                            
            </div>
            <div className={myClasses.MidLine}>
                <label className={myClasses.Left}>Price Id</label> 
                <input  
                    type="text" 
                    name="priceId" 
                    onChange={e => setPriceId(e.target.value)}
                    placeholder=""
                    className={myClasses.Right}
                />                            
            </div>
            <div className={myClasses.MidLine}>
                <label className={myClasses.Left}>Quantity </label> 
                <input  
                    type="text" 
                    name="quantity"
                    onChange={e => setQuantity(e.target.value)}
                    className={myClasses.Right}
                />
            </div>
            <div className={myClasses.MidLine}>
                <label className={myClasses.Left}>Photo </label> 
                <input  
                    type="file" 
                    name="avatar" 
                    onChange={e => setAvatar(e.target.value)}
                    className={[myClasses.Photo, myClasses.Right].join(' ')}
                />                            
            </div>
            <button  
                className={[myClasses.Btn, myClasses.AuthBtn, 'auth-btn' ].join(' ')}
                type='submit'>
                <div className={myClasses.BtnDiv}>Add new item</div>
            </button>
        </form>
        </div>     
    );
};


const mapStateToProps = state => {
    return {
        error       : state.char.error,
        isLoggedIn  : state.auth.payload !== null,
        payload     : state.auth.payload,
        userId      : state.auth.userId,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onNewItem: (values) => dispatch(actions.newItem(values)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewItem);