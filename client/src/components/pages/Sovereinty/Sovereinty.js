import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';
import classes from '../Pages.module.scss'


class Sovereinty extends Component {
    render () {
        let body = (
            <div className={classes.Card}>
                <h4><b>Background: The Lithe Crystal</b></h4>
                <p>
                The Lithe Crystal was an enormous organic crystal organism whose shards had been distributed amongst the planets in the galaxy after their planet’s sun had exploded. After eons, many of the shards landed on hospitable planets and they started re-growing. Originally a huge single organism, each new Lithe Crystal yearned to reconnect with its brethren. To do this, when each matured, it sent fractal-pattern tendrils out into space, searching for the others. Eventually some of these tendrils met up and developed into a trans-planetary communication network. This system allowed the non-mobile Lithe Crystals not only to reconnect but also, since they were curious by nature, to share information about their surrounds with each other.
                </p>
                <h4><b>The Age of Discovery</b></h4>
                <p>Pangea and Ra Elkun Pyrani were twins who lived over 800 years ago on a planet called Lithia. They were of a tall, dark-haired, almond-shaped, grey-eyed humanoid species (similar to humans but they are taller, stronger, and eventually longer-lived). The twins’ parents worked as funeral directors in caves in the canyons outside of Lia, a main city on Lithia, where Lithian dead were honored and laid to rest. While their parents worked, Pangea and Ra Elkun loved to explore the cave system using slip portals around the planet. Slip portals (also called slips) allowed them to teleport themselves instantly to other places on the planet. (They did not know at that time that these slip portals were intra-planetary networks created by Lithe Crystals. At that time, Lithians thought they were a natural terrain phenomenon of their planet.)</p>
            <p>
            One day, while exploring the canyons, the twins made a wondrous discovery. They found a huge cavern, the size of a whole village, totally covered with an energized Lithe Crystal whose electro-magnetic energy radiated out in gentle violet waves. In its middle was a Universal Portal (later known as Pangea’s Gate or the Gate) that allowed the twins to travel to other planets via the Lithe Crystal’s communication network (later known as Portal Tunnels or Tunnels.)
            </p>

            <p>
            This era refers to the earlier years of Pangea and Ra Elkin’s lives when they had found the Gate and started exploring other Worlds in the galaxy. After its discovery, they rarely left the Lithe Crystal, spending the rest of their youth visiting planets. The Lithe Crystal dropped a small shard for each twin to wear as a way to connect each of them to it. Through its shards, the Lithe Crystal could experience what they did, see what they saw, feel what they felt. Pangea wore hers as a Pendant necklace against her chest; Ra Elkun wore his on a wrist band. In exchange for the information it received, the Lithe Crystal augmented the twins’ senses and strength. By the end of this era, there were 19 planets under Pangea’s influence and  13 that were controlled by Ra Elkun.
            </p>
            <h4><b>Age of the Luras</b></h4>
            <p>
            Through the years, the powerful energy emanating from the Lithe Crystal seeped into the fiber of the twins’ beings. Pangea was enlightened to the possibilities of peaceful exploration and collaboration and became a strong, altruistic leader. Ra Elkun, however, became twisted by the Crystal’s darker energy and became destructive, seeking domination of the Worlds. While Pangea tried to cultivate trade and trust among the species on the planets, her brother waged wars, plundered, and enslaved the creatures on his Worlds.
            </p>
            <p>
            As Ra Elkun aged, he came to desire absolute power and control above all else. He expanded his influence by colonizing worlds and subtly at first and then brutally subjugating them to his will. He did this, in part by creating an army of Shadows from the Lithe Crystal’s energy.
            </p>
            <p>
            Ra Elkun’s power eventually overtook his sister’s efforts and many of the planets became dark as his shadow reached farther and farther outwards. Pangea knew she would have to stop her brother to keep her family safe, so she devised a plan. She told Ra Elkun that she had found the Elixir of Youth and led her brother to the entrance of a dimension that instead held only time, nothing else. When Ra Elkun entered the dimension it stripped him of his body. Only his soul’s energy could exist there, with no depth, length or width to support his flesh. His energy was trapped forever in time with no space. His body died instantly.
            </p>
            <p>
            Pangea declared herself the first Interplanetary Peacekeeper and founded the Sovereignty. Those in Ra ELkun’s armies who swore allegiance to her were retrained and became Pangea’s marshals. She developed a tripartite government on Lithia, somewhat similar to that in the United States of America, and created the Interplanetary Coalition.
            </p>
            <p>
            During this time, the remaining Shadows, under the direction of the Sadayshi Lords on Shi, continued to wreak havoc on Lithia and attempted to gain possession of Pangea’s Pendant. Pangea created twelve Luras from the energy of the Lithe Crystal to help combat them. The Luras and Shadows had a huge battle, known as The Battle of the Five, during the reign of Pangea’s great-great-great-great-granddaughter Collee (Lithura-6), after which they were not seen again for over 300 years. Unfortunately, all the Luras were killed in the battle, and this era is named in honor of them. After The Battle of the Five, knowing her life was near its end, Pangea created one more Lura to help protect the Lithe Crystal, the Lithe Pendant and the Lithe Bearers who wore it. This took all of Pangea’s remaining life-energy and she passed away. A great statue of her was created in Lia to commemorate her contributions. At the end of this era, there were 90 planets in the Coalition and 15 in “DeadSpace,” those planets that had been controlled by Ra Elkun that refused to join the Coalition. These rebel planets were banned from Portal Tunnels and trans-planetary trade.
            </p>

            <h4><b>Age of Enlightenment</b></h4>
            <p>
            After The Battle of the Five, the Sadayshi Lords and Shadows halted attacks on the Worlds and there was a 300 year period of security, growth, peace and prosperity. The Council of Elders was formed. Representatives from all the worlds held a seat in this governing Senate. Great research centers were established; science was at its zenith, with life saving and life enhancing medical inventions and implantable translation devices produced and distributed to all the Worlds. Technological advances included the stabilization of the inter-world portal tunnels, which allowed for the tunnels to become interconnected, creating major trade and tourist routes. The number of planets in the Coalition increased from 90 to 302, with 23 now in DeadSpace.
            </p>

            <h4><b>The Age of Empire</b></h4>
            <p>
            For its first three centuries, the Sovereignty was civilization at its most humanitarian. Then decadence set in, with the leaders of the Worlds and the aristocratic Lithian houses wanting ever greater wealth and power. Wealth started to consolidate in fewer and fewer centers. Historians suggest that this trend might have been able to have been turned around had not the Shadows begun attacks once more. There were now 312 planets in the Coalition and 27 in DeadSpace.
            </p>

            <h4><b>The Protectorate</b></h4>
            <p>
            When the Shadows began their attacks again in the reign of Blaise, Lithura-29, chaos set in. There was great fear, almost an undercurrent of panic, throughout the Sovereignty. The Worlds needed and demanded protection, and the Sovereignty increased its military branches, its Lithe Guard Army, Navy, Air & Space,  and Planetary Defenses. Soon it became a de facto militarized state that needed more resources from the Worlds, increased tariffs to pay for military expenditures, and finally declared a ‘State of Emergency’ on all Worlds, giving the Sovereignty dictatorship-like powers of enforcement. Currently, there are 313 planets in the Coalition and 29 in DeadSpace.
            </p>
            </div>
        )

        return(
            <Auxiliary>
                <div className="container">
                <div className="page-header text-center">
                    <h2>History of the Sovereignty</h2>
                </div>
                </div>
                {body}
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