import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../../hoc/Auxiliary';
import Faq from '../Faq/Faq';
import myClasses from './FaqList.module.scss';
//import classes from '../../Pages.module.scss';
//import NewFaq from '../NewFaq/NewFaq';
import * as actions from '../../../../store/actions/index';
//import FaqEdit from './FaqEdit/FaqEdit';
//import { Route, Switch } from 'react-router-dom';




class Faqs extends Component {
    state = {
        faqs : []
    }

    componentDidMount() {
        console.log(this.props)
        
        const faqs = this.props.faqs;
        const updatedFaqs = faqs.map( faq => {
            return {
                ...faq,
            }
        });
        this.setState({ faqs: updatedFaqs})
    }

    deleteFaqHandler = (id) => {
        this.props.onDeleteFaq(id);
    }

    render () {
        let faqs = <p style={{textAlign: 'center'}}>Something went wrong!</p>

        if (!this.props.error) {
            faqs = this.props.faqs.map( faq => {
                return (
                    <Faq
                        key         = {faq._id}  
                        id          = {faq._id}          
                        question        = {faq.question}
                        answer         = {faq.answer}
                        deleteClick  = {() => this.deleteFaqHandler(faq._id)}
                    />
                )
            })
        }

        return(
            <Auxiliary>
                <div className={myClasses.Items}>
                    <div className={['box', myClasses.Items ].join(' ')}></div>
                    {/* <NewFaq /> */}
                    {faqs}
                </div>

            </Auxiliary>
            
        )
    }
}

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
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Faqs);