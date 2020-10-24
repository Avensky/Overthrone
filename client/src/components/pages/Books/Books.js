import React from 'react';
// import Auxiliary from '../../../hoc/Auxiliary';
import Book from './Book/Book';
import classes from '../Pages.module.scss';
import myClasses from './Books.module.scss';

const Books = () => {
    return(
        <div className={[classes.Card, myClasses.Books].join(' ')}>
            <div className="container">
                <div className="page-header text-center">
                    <h1>Books</h1>
                </div>
            </div>
            <Book 
                title="Overthrown"
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                author="suzie"
                published="12-02-1990"
            />
        </div>
    )  
}

export default Books;