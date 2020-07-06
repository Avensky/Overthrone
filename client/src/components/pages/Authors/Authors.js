import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';
import Author from '../Authors/Author/Author';
import classes from '../Pages.module.scss';
import myClasses from './Authors.module.scss';

class Authors extends Component {
    render () {
        return(
            <Auxiliary>
                <div className="container">
                    <div className="page-header text-center">
                        <h2>Authors</h2>
                    </div>
                </div>
                <div className={[classes.Card, myClasses.Authors].join(' ')}>
                    <Author                     
                        content="Having grown up in New York City, J.M. Prigot is a keen people watcher who endeavors
                        to portray on the page the realistic and often bizarre behaviors observed. Having worked
                        in the corporate, academic and non-profit worlds, Prigot has written or co-written eight
                        non-fiction publications and nine grants, made 13 regional or national presentations about
                        human behavior, and edited or co-edited 10 manuscripts on various topics. Happily
                        getting lost in science fiction and fantasy genres as a coping mechanism through the
                        years, Prigot is thrilled to be involved with S.J. Evans on a young-adult fantasy duology
                        that has the epic structure of Dune, the social consciousness of Star Trek and the growth
                        steps of Princess Diaries. Prigot holds a BA and a BFA from Queens College and a PhD
                        in Developmental Psychology from Stony Brook University. Prigot currently lives in
                        Boynton Beach on the east coast of southern Florida."                
                        author="J.M. Prigot"
                    />
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

export default connect (mapStateToProps, mapDispatchToProps)(Authors);