import React from 'react';
// import Auxiliary from '../../../hoc/Auxiliary';
import Author from './Author/Author';
import classes from '../Pages.module.scss';
import myClasses from './Authors.module.scss';

const Authors = (props) => (
        <div className={[classes.Card, myClasses.Authors].join(' ')}>
            <div className="container">
                <div className="page-header text-center">
                    <h1>Authors</h1>
                </div>
            </div>
            <Author
                content="From London to the movie studios of L.A. to the corporate suites of New York City
                and finally to Florida, S.J Evans’ lifelong passion for communications has provided many
                rewarding experiences as a creator and producer of media. Evans brings a skillful
                authority to creative environments, and an artist’s perfectionism to prose."

                content2="After entering the film industry in England as a special effects make-up artist on major
                motion pictures such as Tim Burton’s Batman, Evans moved to Los Angeles in 1990 to assume
                more senior roles in film production, beginning with a two-year stint as Production
                Coordinator for Concord Pictures. After moving on to serve as Producer’s Assistant on
                Roman Polanski’s Death and the Maiden, Director of Development for The Mount/Kramer Company,
                and Director’s Assistant on Beeban Kidron’s Too Wong Foo, Evans enrolled at Columbia University
                in New York and received a full tuition scholarship for a M.F.A. in Film. Continuing to work in a
                professional creative capacity while finishing the degree, Evans worked for APT Films in London as
                director and screenwriter for short live action films and then partnered with RKO and The Mount Film
                Company in the US to write a feature script. Evans has worked in the corporate world directing and
                sproducing media products for major companies such as Met Life and taught film, writing and directing
                at first class institutions including Columbia University, the Museum of Modern Art in NY, and New York's
                Film Academy in NYand Amhurst College in MA."

                content3="Now in Florida, Evans taught film at a prestigious preparatory school, became an examiner in film for the International Baccalaureate Degree, and is now, using screenwriting skills, is writing a debut novel with JM. Prigot."
                author="S.J. Evans"
            />

            <br />
            <Author
                content= "Having grown up in New York City, J.M. Prigot is a keen people watcher who endeavors to portray on the page the realistic and often bizarre behaviors observed. Having worked in the corporate, academic and non-profit worlds, Prigot has written or co-written eight non-fiction publications and nine grants, made 13 regional or national presentations about human behavior, and edited or co-edited 10 manuscripts on various topics as well as a monthly newsletter about Mac computers."
                content2= "Happily getting lost in science fiction and fantasy genres as a coping mechanism through the years, Prigot is thrilled to be involved with S.J. Evans on a young-adult fantasy duology that has the epic structure of Dune, the social consciousness of Star Trek and the growth steps of Princess Diaries. Prigot holds a BA and a BFA from Queens College and a PhD in Developmental Psychology from Stony Brook University. Prigot currently lives in Boynton Beach on the east coast of southern Florida."
                author="J.M. Prigot"
            />
        </div>
);

export default Authors;
