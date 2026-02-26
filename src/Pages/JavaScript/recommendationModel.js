import docArray from "../HomePage/js/index.js";

const vectorSet = [];
const vectors = [];

//1
const formVectorSet = () => {
  docArray.forEach((doc) => {
    const words = doc.split(" ");
    words.forEach((word) => {
      if (!vectorSet.includes(word)) {
        vectorSet.push(word);
      }
    });
  });
};

//2
const formVectorsForAllDocuments = () => {
  docArray.forEach((doc) => {
    const docWords = doc.split(" ");
    const vector = vectorSet.map(word => docWords.includes(word) ? 1 : 0);
    vectors.push(vector);
  });
};


const cosineSimArray =[];

//3-->cosine similarity;
const getCosineSimilarity = () => {
  for (let i = 0; i < vectors.length; i++) {
    for (let j = i + 1; j < vectors.length; j++) {
      let dotProduct = 0;
      let magA = 0;
      let magB = 0;

      for (let k = 0; k < vectors[i].length; k++) {
        dotProduct += vectors[i][k] * vectors[j][k];
        magA += vectors[i][k] ** 2;
        magB += vectors[j][k] ** 2;
      }

      const denominator = Math.sqrt(magA) * Math.sqrt(magB);
      const similarity = denominator === 0 ? 0 : dotProduct / denominator;

      cosineSimArray.push({
        pair: `Doc${i} vs Doc${j}`,
        score: similarity
      });
    }
  }
};


export { getCosineSimilarity, formVectorsForAllDocuments, formVectorSet,cosineSimArray };
