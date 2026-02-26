import { 
    getCosineSimilarity, 
    formVectorsForAllDocuments, 
    formVectorSet, 
    cosineSimArray 
} from "../../JavaScript/recommendationModel.js";

const docArray = []; 

// taaki js html pehle load ho ans also dom
document.addEventListener('DOMContentLoaded', () => {
    const addDocBtn = document.getElementById("addDocBtn");
    const docInput = document.getElementById("docInput");
    const clearBtn = document.getElementById("clearBtn");
    const computeBtn = document.getElementById("computeBtn");
    const storedDocUL = document.getElementById("docList");
    const resultUL = document.getElementById("resultList");

    addDocBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentVal = docInput.value.trim();
        if (currentVal === "") {
            alert("Enter Document First ☠️");
            return;
        }
        docArray.push(currentVal);
        const newDoc = document.createElement('li');
        newDoc.innerHTML = `<h2 class="primary">${currentVal}</h2>`;
        storedDocUL.appendChild(newDoc);
        docInput.value = "";
    });

    clearBtn.addEventListener('click', () => {
        if (docArray.length > 0) {
            docArray.pop();
            storedDocUL.removeChild(storedDocUL.lastElementChild);
        } else {
            alert("Nothing left to delete! 🦖");
        }
    });

    computeBtn.addEventListener('click', () => {
        if (docArray.length < 2) {
            alert("Add at least two documents! 📄");
            return;
        }
        resultUL.innerHTML = ""; 
        formVectorSet(docArray);
        formVectorsForAllDocuments(docArray);
        getCosineSimilarity();

        cosineSimArray.forEach(objs => {
            const newResult = document.createElement('li');
            newResult.innerHTML = `<h2 class="primary">${objs.pair} Similarity = ${objs.score}</h2>`;
            resultUL.appendChild(newResult);
        });
    });
});

export default docArray;
