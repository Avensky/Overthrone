import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';
import classes from '../Pages.module.scss';
import myClasses from './Faqs.module.scss';
import Faq from './Faq/Faq';
import Headline from './Headline/Headline';
import NewFaq from './NewFaq/NewFaq';

class Faqs extends Component {
    render () {
        let headlines = (
            <div className={myClasses.Headlines}>
                <h4>Select for more info </h4>
                <Headline headline = "Headline for my blog"/>
                <Headline headline = "Headline for me"/>
                <Headline headline = "Another headline" />
                <Headline headline = "Headline for my blog"/>
                <Headline headline = "Headline for my blog"/>
                <Headline headline = "Another headline"/>
            </div>
        )

        return(
            <Auxiliary>
                <div className="container">
                    <div className="page-header text-center">
                        <h2>Frequently Asked Questions</h2>
                    </div>
                </div>
                <div className={[classes.Card, myClasses.Faqs].join(' ')}>
                    
                    <NewFaq />
                    <Faq 
                        question="What is my order status?"
                        answer="You can view your order status by looking up your order."
                    />
                    <Faq 
                        question="How do I get technical support for my product?"
                        answer="For assistance with the installation, use, or uninstallation of your product, please contact Customer Support Team."
                    />
                    <hr />
                    {headlines}
                </div>
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Faqs);