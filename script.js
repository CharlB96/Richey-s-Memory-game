document.addEventListener("DOMContentLoaded", function () {

    const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];
    let gameArroa = [];
    let flippedCards = [];
    let matchedPairs = 0;

    // fills empty array with values from colors array + an extra copy at the end.
    gameArray = colors.concat(colors);

    // Shuffles the array randomly.
    gameArray.sort(() => 0.5 - Math.random());

    // We loop through gameArray and create a div for each card, setting its color and adding an event listener for clicks.
    const gameBoard = document.getElementById('gameBoard');
    for (let i = 0; i < gameArray.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = gameArray[i];
        card.addEventListener('click', handleCardCLicks);
        gameBoard.appendChild(card);
    }

    function handleCardCLicks(event) {
        const clickedCard = event.target;

        // Ignore click if the card is already flipped or matched
        if (clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) {
            return;
        }

        // Show the card
        const cardColor = clickedCard.dataset.color;
        clickedCard.style.backgroundColor = cardColor;
        clickedCard.classList.add('flipped');

        // Add card to flippedCards array
        flippedCards.push(clickedCard);

        // Check for match
        if (flippedCards.length === 2) {
            const [firstCard, secondCard] = flippedCards;
            if (firstCard.dataset.color === secondCard.dataset.color) {
                // Cards match
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');
                matchedPairs++;

                // Reset flippedCards array
                flippedCards = [];

                // Check for game completion
                if (matchedPairs === colors.length) {
                    alert('You won!');
                }
            } else {
                // cards do not match, flip them back afetr short delay
                setTimeout(() => {
                    firstCard.style.backgroundColor = 'grey';
                    secondCard.style.backgroundColor = 'grey';
                    firstCard.classList.remove('flipped');
                    secondCard.classList.remove('flipped');

                    // Reset flippedCards array
                    flippedCards = []

                }, 1000);
            }
        }
    }
})