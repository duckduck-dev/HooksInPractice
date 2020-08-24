import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Search from './components/search';
import Dropdown from './components/Dropdown';
import Translate from './components/Translate';
import Header from './components/Header';
import Accordion from './components/Accordion';


const items = [
      {
            title: 'what is React?',
            content:'React is a front end javascript framework'
      },
      {
            title:'why use React?',
            content:'React is a favourite JS library among engineers'
      },
      {
            title:'How do you use React?',
            content:'You use React by creating components'
      }
];



const options = [
      {
            label : 'The Color Red',
            value:'red'
      },
      {
            label : 'The Color Green',
            value:'green'
      },
      {
            label : 'A shade of blue',
            value:'blue'
      }
];



export default () => {

            const [selected, setSelected] = useState(options[0]);
            const [value, setValue] = useState(selected.value);
            useEffect( () => setValue(selected.value) , [selected]);

      return  (  <div>
                              <Router>
                              <Header />
                              <Switch>
                                          <Route path='/' exact render={props => <Accordion {...props} items={items}/>} />                                  
                                          <Route path='/translate' component={ Translate } />
                                          <Route path='/search' component={ Search } />
                                          <Route path='/dropdown'  render={props => <React.Fragment><Dropdown  {...props}
                                                                  options={options}
                                                                  selected={selected}
                                                                  onSelectedChange={setSelected}
                                                                  value={value}
                                                                  setValue= {setValue}
                                    />
                                    <h3 style={{ color:`${value}` }}>{value}</h3></React.Fragment>
                                    } />
                              </Switch>
                             </Router>
                        </div>
                        );
};




/**
 *  ?       const [selected, setSelected] = useState(options[0]);
 *  ?     const [showDropdown, setShowDropdown] = useState(true);
  *  ?    const [value, setValue] = useState(selected.value);
  *  ?  useEffect( () => setValue(selected.value) , [selected]);
  **/


/** 
*  !<button onClick={ () => setShowDropdown(!showDropdown) }>Toggle dropdown</button>
*  !                          {showDropdown ?
*  !                          <React.Fragment>
*  !                              <Dropdown 
*  !                              options={options}
*  !                              selected={selected}
*  !                              onSelectedChange={setSelected}
 *  !                             value={value}
 *  !                             setValue= {setValue}
 *  !                             />
  *  !                            <h3 style={{ color:`${value}` }}>{value}</h3></React.Fragment>
   *  !                           : null }
**/



