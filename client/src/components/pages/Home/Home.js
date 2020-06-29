import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';
import './Home.module.css';

class Sovereinty extends Component {
    render () {
        let body = (
            <div className="container">
                <div className="page-header text-center">
                    <h2>Sovereinty</h2>
                </div>
            </div>
        )

        return(
            <Auxiliary>
                {body}
                <header>
                    <h1>CSS-Only Parallax Effect</h1>
                </header>
                <section class="section1">
                    <h1>Section w/o parallax effect</h1>
                </section>
                <section class="section2">
                    <h1>Section w/ parallax effect</h1>
                </section>
                <div class="author"><a href="https://twitter.com/yagoestevez" target="_blank" rel="noopener noreferrer" title="Link to author's Twitter Profile">Yago Estévez</a></div>
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

export default connect (mapStateToProps, mapDispatchToProps)(Sovereinty);