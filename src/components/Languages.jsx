import React from 'react';
import i18n from '../../src/i18n';
import FlagEnglish from "../../src/icons/flag-en.svg";
import FlagSpanish from "../../src/icons/flag-es.svg";

function Languages() {

  const languages = ['es', 'en']
  
  const changeLanguage = (lang) => {
    if (lang=== languages[0]) i18n.changeLanguage(languages[0])
    else i18n.changeLanguage(languages[1])
  }

  return (
    <div className="relative inline-flex">
      <button className='mx-2' onClick={()=>changeLanguage(languages[0])}><img src={FlagSpanish}/></button>
      <button className='mx-2'onClick={()=>changeLanguage(languages[1])}><img src={FlagEnglish}/></button>
    </div>
  );
}

export default Languages;
