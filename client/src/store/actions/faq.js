import * as actionTypes from './actionTypes'
import axios from 'axios';

export const newFaqStart  = () =>{
    return{
        type: actionTypes.NEW_FAQ_START
    }
}

export const newFaqFail = (error) => {
    return {
        type: actionTypes.NEW_FAQ_FAIL,
        error: error
    }
}

export const newFaqSuccess = (faqData) => {
    return {
        type: actionTypes.NEW_FAQ_SUCCESS,
        faqData: faqData
    }
}

export const newFaq = (question, answer) => {
    return dispatch => {
        dispatch(newFaqStart())

        const faqData = {
            question        : question, 
            answer          : answer
        }

        axios.post('/api/addFaq', faqData)
            .then(response => {
                console.log(response);
                dispatch(newFaqSuccess(faqData))
        })
        
        .catch(error => {
            console.log(error);
            dispatch(newFaqFail(error))
        })    
    }
}


export const getFaqsSuccess = (faqs) => {
    return {
        type:  actionTypes.GET_FAQS_SUCCESS,
        faqs: faqs
    }
}
export const getFaqsFail = (error) => {
    return {
        type:  actionTypes.GET_FAQS_FAIL, 
        error: error
    }
}
export const getFaqsStart = () => {
    return {
        type:  actionTypes.GET_FAQS_START
    }
}
export const getFaqs = () => {
    return dispatch => {
        dispatch(getFaqsStart());
        axios.get( '/api/faqs')
        .then( result => {
            console.log(result)
            const faqs = result.data
//            const faqs = []
//                for ( let key in posts ) {
//                    faqs.push( {
//                        ...result.data[key],
//                        id: key
//                    } );
//                }
                dispatch(getFaqsSuccess(faqs));
            } )
            .catch( error => {
                dispatch(getFaqsFail(error));
            } );
    };
}




export const getFaqByIdSuccess = (faqById) => {
    return {
        type:  actionTypes.GET_FAQ_BY_ID_SUCCESS,
        faqById: faqById,
    }
}
export const getFaqByIdFail = (error) => {
    return {
        type:  actionTypes.GET_FAQ_BY_ID_FAIL, 
        error: error
    }
}
export const getFaqByIdStart = () => {
    return {
        type:  actionTypes.GET_FAQ_BY_ID_START
    }
}
export const getFaqById = (id) => {
    return dispatch => {
        dispatch(getFaqByIdStart());
        axios.get( '/api/getfaqDetails/' + id)
        .then( result => {
            console.log(result)
            const faqById = result.data
//            const fetchedPostsById = {id: id}
//            const obj = {...post, ...fetchedPostsById}
            dispatch(getFaqByIdSuccess(faqById));
        })
        .catch( error => {
            dispatch(getFaqByIdFail(error));
        });
    };
}



export const updateFaqStart  = () =>{
    return{
        type: actionTypes.UPDATE_FAQ_START
    }
}

export const updateFaqFail = (error) => {
    return {
        type: actionTypes.UPDATE_FAQ_FAIL,
        error: error
    }
}

export const updateFaqSuccess = (faqData) => {
    return {
        type: actionTypes.UPDATE_FAQ_SUCCESS,
        faqData: faqData
    }
}
    
export const updateFaq = (question, answer) => {
    return dispatch => {
        dispatch(updateFaqStart())

        const faqData = {
            question        : question, 
            answer          : answer
        }

        axios.delete('/api/updatefaq/'+ faqData)
            .then(response => {
                console.log(response);
                dispatch(updateFaqSuccess(faqData))
        })
        .catch(error => {
            console.log(error);
            dispatch(updateFaqFail(error))
        })    
    }
}



export const deleteFaqStart  = () =>{
    return{
        type: actionTypes.DELETE_FAQ_START
    }
}

export const deleteFaqFail = (error) => {
    return {
        type: actionTypes.DELETE_FAQ_FAIL,
        error: error
    }
}

export const deleteFaqSuccess = () => {
    return {
        type: actionTypes.DELETE_FAQ_SUCCESS,
    }
}
    
export const deleteFaq = (id) => {
    return dispatch => {
        dispatch(deleteFaqStart())
        axios.delete('/api/deletefaq/'+ id)
            .then(response => {
                console.log(response);
                dispatch(deleteFaqSuccess())
        })
        .catch(error => {
            console.log(error);
            dispatch(deleteFaqFail(error))
        })    
    }
}



