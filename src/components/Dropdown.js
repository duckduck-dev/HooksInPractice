import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ( { label, options, selected, onSelectedChange, value, setValue } ) => {

      //state
      const [open, setOpen] = useState(false);
      const ref = useRef();

      //useEffect-which listens to click event 
      useEffect( () => {
            const onBodyClick = event => {
                  if(ref.current.contains(event.target)){
                        return;
                  }
                  setOpen(false);
            };
            
            document.body.addEventListener('click', onBodyClick);

            //cleanUp function
            //will be invoked on two scenarios 1)after the above executes 2)when we stop showing entire  component
            //error will be thrown if cleanup hasn't included.because, addEventlistener listens for an event even if the component is hidden. 
            return () => document.body.removeEventListener('click', onBodyClick);

      } ,[]);


      const renderedOptions = options.map(option => {
            //Filtering the option list-returns null for the already selected list-so that it will not be shown.
            if(option.value === selected.value){
                  return null;
            }

            return(
                  <div key={option.value} className="item" onClick={() => onSelectedChange(option) }>
                        {option.label}
                  </div>
            );
      });

      return(
            <div ref={ref} className="ui form">
                  <div className="field">
                        <label className="label">{ label }</label>
                        <div className={`ui selection dropdown ${open ? 'visible active' : ''}`} onClick={ () => setOpen(!open) }>
                                    <i className="dropdown icon"></i>
                                    <div className="text">{selected.label}</div>
                                    <div className={`menu ${open ? 'visible transition' : ''}`}>
                                          { renderedOptions }
                                    </div>
                        </div>
                  </div>
            </div>
      );
};

export default Dropdown;