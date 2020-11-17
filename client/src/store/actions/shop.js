import * as actionTypes from './actionTypes'
import axios from 'axios';

export const newItemStart  = () =>{
    return{
        type: actionTypes.NEW_ITEM_START
    }
}

export const newItemFail = (error) => {
    return {
        type: actionTypes.NEW_ITEM_FAIL,
        error: error
    }
}

export const newItemSuccess = (itemData) => {
    return {
        type: actionTypes.NEW_ITEM_SUCCESS,
        itemData: itemData
    }
}

export const newItem = (values) => {
    return dispatch => {
        dispatch(newItemStart())

        axios.post('/api/addItem', values)
            .then(response => {
                console.log(response);
                const data = response.data;
                console.log(data);
                dispatch(newItemSuccess(data))
        })
        .catch(error => {
            console.log(error);
            dispatch(newItemFail(error))
        })    
    }
}


export const getItemsSuccess = (items) => {
    return {
        type:  actionTypes.GET_ITEMS_SUCCESS,
        items: items
    }
}
export const getItemsFail = (error) => {
    return {
        type:  actionTypes.GET_ITEMS_FAIL, 
        error: error
    }
}
export const getItemsStart = () => {
    return {
        type:  actionTypes.GET_ITEMS_START
    }
}
export const getItems = () => {
    return dispatch => {
        dispatch(getItemsStart());
        axios.get( '/api/items')
        .then( result => {
            console.log(result)
            const items = result.data
//            const items = []
//                for ( let key in posts ) {
//                    items.push( {
//                        ...result.data[key],
//                        id: key
//                    } );
//                }

            items.sort(function(a, b){
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
            })
                dispatch(getItemsSuccess(items));
            } )
            .catch( error => {
                dispatch(getItemsFail(error));
            } );
    };
}




export const getItemByIdSuccess = (charById) => {
    return {
        type:  actionTypes.GET_ITEM_BY_ID_SUCCESS,
        charById: charById,
    }
}
export const getItemByIdFail = (error) => {
    return {
        type:  actionTypes.GET_ITEM_BY_ID_FAIL, 
        error: error
    }
}
export const getItemByIdStart = () => {
    return {
        type:  actionTypes.GET_ITEM_BY_ID_START
    }
}
export const getItemById = (id) => {
    return dispatch => {
        dispatch(getItemByIdStart());
        axios.get( '/api/getitemDetails/' + id)
        .then( result => {
            console.log(result)
            const charById = result.data
//            const fetchedPostsById = {id: id}
//            const obj = {...post, ...fetchedPostsById}
            dispatch(getItemByIdSuccess(charById));
        })
        .catch( error => {
            dispatch(getItemByIdFail(error));
        });
    };
}



export const updateItemStart  = () =>{
    return{
        type: actionTypes.UPDATE_ITEM_START
    }
}

export const updateItemFail = (error) => {
    return {
        type: actionTypes.UPDATE_ITEM_FAIL,
        error: error
    }
}

export const updateItemSuccess = (itemData) => {
    return {
        type: actionTypes.UPDATE_ITEM_SUCCESS,
        itemData: itemData
    }
}
    
export const updateItem = (id, name, age, relatives, bio) => {
    return dispatch => {
        dispatch(updateItemStart())

        const itemData = {
            id          : id,
            name        : name, 
            age         : age, 
            relatives   : relatives,
            bio         : bio, 
        }

        axios.delete('/api/updateitem/'+ itemData)
            .then(response => {
                console.log(response);
                dispatch(updateItemSuccess(itemData))
        })
        .catch(error => {
            console.log(error);
            dispatch(updateItemFail(error))
        })    
    }
}



export const deleteItemStart  = () =>{
    return{
        type: actionTypes.DELETE_ITEM_START
    }
}

export const deleteItemFail = (error) => {
    return {
        type: actionTypes.DELETE_ITEM_FAIL,
        error: error
    }
}

export const deleteItemSuccess = () => {
    return {
        type: actionTypes.DELETE_ITEM_SUCCESS,
    }
}
    
export const deleteItem = (id) => {
    return dispatch => {
        dispatch(deleteItemStart())
        axios.delete('/api/deleteitem/'+ id)
            .then(response => {
                console.log(response);
                dispatch(deleteItemSuccess())
        })
        .catch(error => {
            console.log(error);
            dispatch(deleteItemFail(error))
        })    
    }
}



