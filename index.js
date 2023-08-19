/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/
// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
    for (const game of games) {
        // create a new div element, which will become the game card
        const gameCard = document.createElement("div");

        // add the class game-card to the list
        gameCard.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}" />
            <h2>${game.name}</h2>
            <p>${game.description}</p>
            <p>Pledged: $${game.pledged}</p>
            <p>Goal: $${game.goal}</p>
            <p>Backers: ${game.backers}</p>
        `;

        // append the game card to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// Call the function with the game data from the imported GAMES_JSON
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/
// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<p>${totalContributions.toLocaleString()}</p>`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// use reduce() to calculate the total amount raised
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `<p>$${totalRaised.toLocaleString()}</p>`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// set inner HTML using template literal
gamesCard.innerHTML = `<p>${GAMES_JSON.length}</p>`;



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // use the function we previously created to add funded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/
// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const unfundedGamesText = unfundedGamesCount === 1
    ? `There is 1 game that still needs funding.`
    : `There are ${unfundedGamesCount} games that still need funding.`;

// create a new DOM element containing the template string and append it to the description container
const descriptionText = `
    <p>Welcome to our crowdfunding platform! We bring you a curated selection of games seeking support from backers like you. Explore and contribute to your favorite projects. ${unfundedGamesText}</p>
`;

const descriptionElement = document.createElement("div");
descriptionElement.innerHTML = descriptionText;
descriptionContainer.appendChild(descriptionElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.slice(); // Create a copy of the array before sorting

// Sort the games array in descending order based on pledged amount
sortedGames.sort((game1, game2) => game2.pledged - game1.pledged);

// Take the top 2 games using the slice() method
const topTwoGames = sortedGames.slice(0, 2);

// Create a new element to hold the name of the top pledge game and append it to the correct element
const firstGameElement = document.createElement("p");
firstGameElement.textContent = `First Game: ${topTwoGames[0].name}`;
firstGameContainer.appendChild(firstGameElement);

// Create a new element for the second game and append it to the correct element
const secondGameElement = document.createElement("p");
secondGameElement.textContent = `Second Game: ${topTwoGames[1].name}`;
secondGameContainer.appendChild(secondGameElement);
