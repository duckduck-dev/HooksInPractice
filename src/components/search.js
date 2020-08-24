import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Search = () => {

      //state
      const [term, setTerm] = useState('linux');
      const [debouncedTerm, setDebouncedTerm] = useState(term);
      const [result, setResult] = useState([]);

      
      //usestate 1 
      useEffect(() => {
            const timerId = setTimeout(() => {
                  setDebouncedTerm(term);
            } , 1000);

            //cleanup func
            return () => clearTimeout(timerId);
      } , [term]);

      //useEffect 2
      useEffect( () => {
            const search = async () => {
                  const  { data }  =  await  Axios.get('https://en.wikipedia.org/w/api.php', { 
                        params : {
                              action : 'query',
                              list: 'search',
                              srsearch : debouncedTerm,
                              format : 'json',
                              origin : '*'
                        }
                   });
                   //updating the state once the data has been fetched.
                   setResult(data.query.search);
                  }
            search();
      } , [debouncedTerm]);

      //method -2
      //something like ife cycle method
      /*useEffect(  () => {
            const search = async () => {
            const  { data }  =  await  Axios.get('https://en.wikipedia.org/w/api.php', { 
                  params : {
                        action : 'query',
                        list: 'search',
                        srsearch : term,
                        format : 'json',
                        origin : '*'
                  }
             });
             //updating the state once the data has been fetched.
             setResult(data.query.search);
            }
            //Intial render
            if ( term && !result.length ){
                  search();
            }
            else{
                  
                  //assigning the id to a const, which is used to clear the timeout
                 const timeOutId =  setTimeout( () => {
                        if(term){
                              search();
                        }
                  } ,1000);
                  
                  //cleanup function
                  return () => {
                        clearTimeout(timeOutId);
            }
            }
       
      }, [term, result.length] );*/

      const renderedResults = result.map( result => {
            return (
                  <div className="item" key={result.pageid}>
                   <div className="right floated item">
                         <a className="ui button" href={`https://en.wikipedia.org?curid=${result.pageid}`}>GO</a>
                   </div>
                        <div className="content">
                              <div className="header">
                                    { result.title }
                              </div>
                                    <span dangerouslySetInnerHTML={ { __html : result.snippet } }></span>
                        </div>
                  </div>
            );
      } );

      return(
            <div>
                  <div className="ui form">
                        <div className="field">
                              <label>Enter Search Term</label>
                              <input 
                                    value = { term }
                                    onChange = { e => setTerm(e.target.value) }
                                    className="input" />
                        </div>
                  </div>
                  <div className="ui celled list">{ renderedResults }</div>
            </div>
      );
};

export default Search;
