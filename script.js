//Grabing the DOM elements
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const dubleBtn = document.getElementById("duble");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");
//Array of people
let data = [];

getRandomUser();
getRandomUser();
getRandomUser();
//Fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
}

//Duble money
function dubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

//Sort users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

//Add new obj to data array
function addData(obj) {
  //Push into array
  data.push(obj);

  updateDOM();
}

//Update DOM
function updateDOM(providedData = data) {
  //Cleart main div
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";
  //Looping
  providedData.forEach(item => {
    //Creating new element on documnet
    const element = document.createElement("div");
    //Adding the class on element
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//Format number sa money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&.");
}

//Event listeners
addUserBtn.addEventListener("click", getRandomUser);

dubleBtn.addEventListener("click", dubleMoney);

sortBtn.addEventListener("click", sortByRichest);
