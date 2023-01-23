import React, { Component, useEffect, useState } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../../hoc/Auxiliary';
import Faq from '../Faq/Faq';
import myClasses from './FaqList.module.scss';
//import classes from '../../Pages.module.scss';
//import NewFaq from '../NewFaq/NewFaq';
import * as actions from '../../../../store/actions/index';
//import FaqEdit from './FaqEdit/FaqEdit';
//import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

const Faqs =(props)=> {
    const [faqs, setFaqs] = useState([]);
    

    useEffect(()=> {
        console.log(props);
        
        const faqs = props.faqs;
        const updatedFaqs = faqs.map( faq => {
            return {
                ...faq,
            };
        });
        setFaqs(updatedFaqs);
    },[]);

    const deleteFaqHandler = (id) => {
        props.onDeleteFaq(id);
    };
        let content = <p style={{textAlign: 'center'}}>Something went wrong!</p>;

        if (!props.error) {
            content = props.faqs.map( faq => {
                return (
                    <Faq
                        key         = {faq._id}  
                        id          = {faq._id}          
                        question        = {faq.question}
                        answer         = {faq.answer}
                        deleteClick  = {() => deleteFaqHandler(faq._id)}
                    />
                );
            });
        }

        return(
            <Auxiliary>
                <div className={myClasses.Items}>
                    <div className={['box', myClasses.Items ].join(' ')}></div>
                    {/* <NewFaq /> */}
                    {content}
                </div>

            </Auxiliary>
            
        );
    
};

const mapStateToProps = state => {
    return {
        faqs : state.faq.faqs,
        getFaqById: state.faq.getFaqById
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetFaqs: () => dispatch( actions.getFaqs()),
        onGetFaqById: (id) => dispatch( actions.getFaqById(id)),
        onDeleteFaq: (id) => dispatch( actions.deleteFaq(id))
    };
};

Faqs.propTypes = {
    faqs:PropTypes.any,
    onDeleteFaq:PropTypes.func,
    error:PropTypes.any,
};

export default connect (mapStateToProps, mapDispatchToProps)(Faqs);