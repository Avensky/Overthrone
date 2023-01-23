import React from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';
// import './Home.module.scss';
import classes from './Home.module.scss';

const Sovereinty = props => {
        let body = (
            <div className={["container", classes.container].join(' ')}>
                <div className="page-header text-center">
                    <h2>Home</h2>
                </div>
                <section className="paragraph">
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas omnis accusamus unde deserunt. Sapiente laboriosam sequi cupiditate sint debitis veritatis exercitationem dignissimos est enim molestias accusamus, suscipit nostrum asperiores minus!
             Eligendi ab fugiat dignissimos ipsam minima necessitatibus provident repellendus neque odit numquam aliquam expedita suscipit doloribus nesciunt facilis, molestiae quibusdam! Odit excepturi ab iure, aspernatur nemo aut repudiandae? Doloribus, earum?
             Eius blanditiis maxime impedit harum quasi pariatur atque beatae omnis expedita dolorum, vero explicabo numquam mollitia libero ut ratione, sit, amet assumenda voluptatem deserunt magnam rem facilis. Dolor, porro non?
             Tempore atque fugit quaerat neque esse? Unde doloremque odit distinctio mollitia quae quasi itaque atque dolor voluptatibus eligendi nemo labore repudiandae, sit maiores at eius. Nulla ipsa voluptatibus laboriosam culpa!
             Iusto ipsum aliquam obcaecati a ullam fuga dolorem dolores, eius, beatae corporis repudiandae quibusdam ab natus? Voluptates unde quaerat quas, placeat, blanditiis hic totam harum tempore assumenda ullam voluptatibus quod.
           </section>
            </div>
        );

        return(
            <Auxiliary className='Home'>
                {body}
            </Auxiliary>
        );
    };


const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect (mapStateToProps, mapDispatchToProps)(Sovereinty);