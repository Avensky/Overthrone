import React, { /*useEffect*/ } from 'react';
import {connect} from 'react-redux';
// import Auxiliary from '../../../hoc/Auxiliary';
import classes from '../Pages.module.scss';
import myClasses from './Faqs.module.scss';
// import Faq from './Faq/Faq';
// import Headline from './Headline/Headline';
import * as actions from '../../../store/actions/index';
// import NewFaq from './NewFaq/NewFaq';
import FaqList from './FaqList/FaqList';
import FaqEdit from './FaqEdit/FaqEdit';
import { Route, Switch } from 'react-router-dom';

const Faqs = props => {
    // const { onGetFaqs, faqs } = props;
    // 
    // useEffect(() => {
    //     const fetchData = async () => {
    //         onGetFaqs();
    //     };
    //     if ( faqs.length === 0 ){
    //       fetchData()
    //     }
    // }, [])

        let headlines = (
            <div className={myClasses.Headlines}>
                <div className={myClasses.Faq}>
                <div className={classes.CardTitle}>Is S.J.Evans related by any chance to Mary Anne Evans, whose pen name was George Elliot?</div>
                    <p>Not that I know of.</p>
                </div>

                <div className={myClasses.Faq}>
                    <div className={classes.CardTitle}>How do you pronounce the character’s names?</div>
                    <p>We have purposefully created names that are short and relatively easy to pronounce. We have tried to derive them from a variety of nationalities.</p>
                    <ul>
                        <li>Agni: Ag-knee    </li>   
                        <li>Ashkil: Ash-kill </li>   
                        <li>Bryndis: Brin-dis</li>   
                        <li>Coolee: Cool-ee  </li>
                        <li>Eira: Ear-a      </li>   
                        <li>Erle: Erle       </li>   
                        <li>Fia: Fee-a       </li>       
                        <li>Giver: Giv-er    </li>       
                        <li>Jaska: Jask-a    </li>       
                        <li>Kennari: Ken-nar-e</li>          
                        <li>Meena: Me-na     </li>       
                        <li>MiLord: My-Lord  </li>       
                        <li>Payman: Pay-man  </li>   
                        <li>Slocum: Slow-come</li>       
                        <li>Talon: Ta-lon    </li>       
                        <li>Tirth: Tirth     </li>   
                        <li>Yuri: Yur-e      </li>   
                    </ul>
                </div>
                
                <div className={myClasses.Faq}>
                    <div className={classes.CardTitle}>Will there be a movie or Netflix series?</div>
                    <p>We certainly hope so.</p>
                </div>
                
                <div className={myClasses.Faq}>
                    <div className={classes.CardTitle}>What are each of your favorite books?</div>
                    <h5><b>S.J.Evans</b></h5>
                    <ul>
                    <b>Fiction</b>
                    <li>Wuthering Heights by Emily Bronte</li>
                    <li>Lord of the Rings by J.R.R. Tolkien</li>
                    <li>A Connecticut Yankee in King Arthur’s Court by Mark Twain</li>
                    <li>The Master and Margarita by Mikhail Bulgakov</li>
                    <li>Hamlet by William Shakespeare</li>
                    <li>Game of Thrones by George R.R. Martin</li>
                    </ul>
                    <ul>
                    <b>Non-Fiction</b>
                    <li>Mindsight by Dan Siegel</li>
                    <li>Sapiens by Yuval Noah Harari</li>
                    <li>Unbroken by Laura Hillenbrand</li>
                    <li>A Long Way Gone: Memoirs of a Boy Soldier by Ishmael Beah</li>
                    </ul>

                    <h5><b>J.M. Prigot:</b></h5> 
                    <h5>Books that off the top of my head have made a big impression on me:</h5>   
                    <ul>             
                    <b>Fiction</b>
                    <li>The Scarlet Letter by Nathanial Hawthorne.</li>
                    <li>Leaving Cheyenne by Larry McMurty</li>
                    <li>The Lost Continent Series by Catherine Asaro</li>
                    <li>The Saga of the Skolian Empire by Catherine Asaro</li>
                    <li>Childhood’s End by Arthur C. Clarke</li>
                    <li>Most Plays by Eugene O’Neill</li>
                    <li>Fairy Tales by Grimm</li>
                    <li>Short stories by Mark Twain, Joyce Carol Oates</li>
                    </ul>

                    <ul>
                    <b>Non-Fiction</b>
                    <li>Noam Chomsky Reader</li>
                    <li>The God Delusion by Richard Dawkins</li>
                    <li>Guns, Germs, and Steel by Jared Diamond</li>
                    <li>Thinking Fast and Slow by Daniel Kahneman</li>
                    <li>The Positive Psychology of Buddhism and Yoga by Marvin Levine</li>
                    <li>Body for Life by Pamela Peeke</li>
                    <li>The Beck Diet Solution by Judith S. Beck</li>
                    <li>Tiny Habits by BJ Fogg</li>
                    </ul>                    
                </div>

                <div className={myClasses.Faq}>
                    <div className={classes.CardTitle}>What are some of your favorite TV shows?</div>
                    <h5><b>S.J.Evans</b></h5>
                    <ul>
                    <li>Battlestar Galactica reboot</li>
                    <li>Fringe</li>
                    <li>Game of Thrones</li>
                    <li>Prime Suspect</li>
                    <li>Star Trek: The Next Generation</li>
                    <li>Shows with strong yet flawed female roles such as Doctor Foster and Apple Tree Yard</li>
                    </ul>

                    <h5><b>J.M. Prigot:</b></h5>
                    <ul>
                    <li>Star Trek, classic, Next Gen, Voyager, Deep Space 9</li>
                    <li>Dharma and Greg</li>
                    <li>Law & Order: Special Victims Unit</li>
                    <li>Any show highlighting strong, non-vulgar comics</li>
                    <li>Any show with great dancing</li>
                    </ul>
                </div>


                <div className={myClasses.Faq}>
                    <div className={classes.CardTitle}>What are some of your favorite Movies?</div>
                    <h5><b>S.J.Evans</b></h5>
                    <ul>
                    <li>2001: A Space Odyssey</li>
                    <li>Gattaca</li>
                    <li>Withnail and I</li>
                    <li>The Hurt Locker</li>
                    <li>Truly Madly Deeply</li>
                    <li>Persona directed by Ingmar Bergman</li>
                    <li>Movies directed by Stanley Kubrick, early Polanski, the Coen brothers, and Christopher Nolan</li>
                    </ul>
                    <h5><b>J.M. Prigot:</b></h5>
                    <ul>
                    <li>Star Wars</li>
                    <li>The Sound of Music</li>
                    <li>Gone with the Wind</li>
                    <li>Bohemian Rhapsody</li>
                    </ul>
                </div>

                <div className={myClasses.Faq}>
                    <div className={classes.CardTitle}>I want to make a Halloween costume/piece of jewelry/etc.  based on one of your characters. Do I have to get your permission?</div>
                    <p>Not if the costume/piece of jewelry/etc. is just for your personal enjoyment and use. However, if you want to sell costumes or jewelry, etc.  and make profit from our books in some way, then you would need to try and secure some sort of agreement from S.J.Evans in writing.</p>
                </div>
        
                <div className={myClasses.Faq}>
                    <div className={classes.CardTitle}>Who designed the art for your book?</div>
                    <p>J.M. Prigot.</p>
                </div>
            </div>
        );

    return(
        <div className={[classes.Card, myClasses.Faqs].join(' ')}>
            <div className="container">
                <div className="page-header text-center">
                    <h1>Frequently Asked Questions</h1>
                </div>
            </div>
            {headlines}
            <Switch>
                <Route path="/faqs" exact component={FaqList} />
                <Route path="/faqs/faqEdit/:id"   exact   component={FaqEdit} />
                <Route render={() => <h1>Not found</h1>}/>
                {/* <Redirect from="/" to="/posts" /> */}
                {/* <Route path="/" component={Posts} /> */}
            </Switch>
            {/* <hr />  */}
        </div>
        );
    };


const mapStateToProps = state => {
    return {
        faqs: state.faq.faqs
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetFaqs: () => dispatch( actions.getFaqs())
    };
};

export default connect (mapStateToProps, mapDispatchToProps)(Faqs);