import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Keys} from '../config/keys';

console.log(Keys);

export default ( { language, text } ) => {

      const [translated, setTranslated] = useState('');
      const [deBouncedText, setDeBouncedText] = useState(text);


      useEffect( () => {
            const timerId = setTimeout( () => {
                  setDeBouncedText(text);
            } , 500);
            return () => clearTimeout(timerId);
      } , [text]);


      useEffect( () => {
            const doTranslation = async() => {
                  const {data} = await axios.post('https:/translation.googleapis.com/language/translate/v2', {}, {
                        params: {
                              q : deBouncedText,
                              target : language.value,
                              key : Keys
                        }
                  } );
                  
                 setTranslated(data.data.translations[0].translatedText);
            };

            //func call
            doTranslation();
      } , [language, deBouncedText]);

      return <div className="ui header">{translated}</div>
};
