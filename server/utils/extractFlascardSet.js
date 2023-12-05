import { getCurrentDate } from '../utils/getCurrentDate.js';

const extractFlashcardSet = (feedback) => {

    const newFlashcardSet = feedback.flatMap(message => { //.flatMap flattens the nested arrays 
        const lines = message.split('\n');
        const linesStartingWithNumber = lines.filter(line => /^[0-5]?[0-9]|20$/.test(line));
      
        return linesStartingWithNumber.map((item, index) => {

          const [, spanishWord, englishTranslation] = item.split(/[-.]/);
          if (englishTranslation !== '') {
            return {
              id: `${index}-${getCurrentDate()}`,
              spanishWord: spanishWord.trim(),
              englishTranslation: englishTranslation.trim(),
            };
          }
          return null;
        }).filter(obj => obj !== null);
    });

    return newFlashcardSet
}


export { extractFlashcardSet }