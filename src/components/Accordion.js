import React, { useState } from 'react';

const Accordion = ( { items } ) => {

      //state
      const [activeIndex, setActiveIndex] = useState(null);

      //shows index when the event triggerd.
      const onTitleClick = index => setActiveIndex(index);

      //returns an object
      const renderedItems = items.map( (item, index)=>  {

            //sets active className  if index prop matches to activeIndex in state.
            const active = index === activeIndex ? 'active' : ''

            return (<React.Fragment key={item.title}>
                                    <div className={`title ${active}`}
                                          onClick={ () => onTitleClick(index) }>
                                          <i className="dropdown icon"></i>
                                                {item.title}
                                    </div>
                                    <div className={`content ${active}`}>
                                                <p>{item.content}</p>
                                    </div>
                              </React.Fragment>);
            } );

            //main
            return (<div className="ui styled accordion">
                              {renderedItems}
                        </div>);
      
};

export default Accordion;