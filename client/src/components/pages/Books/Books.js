import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Book from './Book/Book';
import classes from '../Pages.module.scss';
import myClasses from './Books.module.scss';


const Books = () => {
    return(
        <Auxiliary>
            <div className="container">
                <div className="page-header text-center">
                    <h2>Books</h2>
                </div>
            </div>
            <div className={[classes.Card, myClasses.Books].join(' ')}>
                <Book 
                    title="Overthrown"
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    author="suzie"
                    published="12-02-1990"
                />
            </div>
        </Auxiliary>
    )
    
}


export default Books;