
const BASE_URL = "http://localhost:3000/";
let pageNumber = 1;

document.addEventListener('DOMContentLoaded', () => {
    showMonstersList();
})

//*******************FETCH**************************
function getMonsters(page) {
    const url = `${BASE_URL}monsters/?_limit=50&_page=${page}`;
    return fetch(url)
        .then(res => res.json())
}

function createMonster(monsterObj) {
    const url = `${BASE_URL}monsters/`;
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: monsterObj.name.value, 
            age: monsterObj.age.value, 
            description: monsterObj.description.value
        })
    })
    .then(res => res.json)
    .then(res => {
        showMonstersList();
    })
}

function createMonsterDiv(monsterObj) {
    const div = document.createElement("div"),
        h3 = document.createElement("h3"),
        h4 = document.createElement("h4");
        p = document.createElement("p");
    
    h3.textContent = monsterObj.name;
    h4.textContent = monsterObj.age;
    p.textContent = monsterObj.description;
    
    div.appendChild(h3);
    div.appendChild(h4);
    div.appendChild(p);
    
    return div;
}

function showMonsters(monstersArray) {
    const monsterContainer = document.getElementById("monster-container");
    monstersArray.forEach(monsterObj => {
        const monsterDiv = createMonsterDiv(monsterObj);
        monsterContainer.appendChild(monsterDiv);
    });
}

function showMonstersList() {
    getMonsters(pageNumber).then(showMonsters);
}

//Validate Form data
const myForm = document.getElementById("monster-form");
myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    createMonster(e.target);
});

//Next Button
const nextBtn = document.getElementById("forward");
nextBtn.addEventListener("click", function (e) {
    e.preventDefault();
    clearContainer()
    pageNumber += 1;
    showMonstersList();
})

//Previous Button
const prevBtn = document.getElementById("back");
prevBtn.addEventListener("click", function (e) {
    e.preventDefault();
    pageNumber -= 1;
    if (pageNumber > 0) {
        clearContainer()
        showMonstersList();
    } else {
        pageNumber = 1;
    }
})

function clearContainer() {
    const listMonster = document.getElementById("monster-container");
    const listEmpty = listMonster.innerHTML.trim();
    if (listEmpty != "") {
        listMonster.innerHTML = "";
    }
}

