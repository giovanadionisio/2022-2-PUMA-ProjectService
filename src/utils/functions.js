module.exports = ({
  checkInt: (id) => {
    return typeof(id) === 'number' && isFinite(id) && Math.round(id) === id
  },
  simplifiedAllocation(keywords) {
    let subjectKeywords = new Map();
    keywords.forEach((keywordObject) => {
      if (!subjectKeywords.has(keywordObject.subjectid)) {
        subjectKeywords.set(keywordObject.subjectid, [keywordObject]);
      } else {
        subjectKeywords.get(keywordObject.subjectid).push(keywordObject);
      }
    });
    /* eslint-disable max-len */
    subjectKeywords = new Map([...subjectKeywords.entries()].sort((a, b) => b[1].length - a[1].length));
    const subjectKeywordsArray = Array.from(subjectKeywords);
    if (subjectKeywordsArray.length === 1 || (subjectKeywordsArray[0][1].length > subjectKeywordsArray[1][1].length)) {
      /* eslint-disable prefer-destructuring */
      return { subjectid: subjectKeywordsArray[0][0] };
    } else {
      throw new Error('Infelizmente houve um empate. Reavalie as palavras-chave e tente novamente')
    }
  },
})
