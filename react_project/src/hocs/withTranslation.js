import React from 'react';
import ukr from '../intl/ukr';
import eng from '../intl/eng';

const withTranslation = (words) => (WrappedComponent) => {
  const lang = localStorage.getItem('selectedLanguage');

  let selectedLang;
  switch (lang) {
    case 'ukr':
      selectedLang = ukr;
      break;
    case 'eng':
      selectedLang = eng;
      break;
    default:
      selectedLang = eng;
  }

  const selectedWords = {};

  words.forEach((word) => {
    if (word in selectedLang) {
      selectedWords[word] = selectedLang[word];
    };
  });

  const NewComponent = (props) => {
    return <WrappedComponent {...props} {...selectedWords} />
  }

  return NewComponent;
}

export default withTranslation;