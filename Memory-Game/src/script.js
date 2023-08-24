document.addEventListener("DOMContentLoaded", () =>{

    //Cards
    const cardArray = [

        { name: "fires", img: "src/images/fries.png" },
        { name: "cheeseburger", img: "src/images/cheeseburger.png" },
        { name: "ice-cream", img: "src/images/ice-cream.png" },
        { name: "pizza", img: "src/images/pizza.png" },
        { name: "milkshake", img: "src/images/milkshake.png" },
        { name: "hotdog", img: "src/images/hotdog.png" },
        { name: "fires", img: "src/images/fries.png" },
        { name: "cheeseburger", img: "src/images/cheeseburger.png" },
        { name: "ice-cream", img: "src/images/ice-cream.png" },
        { name: "pizza", img: "src/images/pizza.png" },
        { name: "milkshake", img: "src/images/milkshake.png" },
        { name: "hotdog", img: "src/images/hotdog.png" }
    ];

    const grid = document.querySelector(".grid");
    const resultDisplay = document.querySelector("#result");
    let cardsChosen = [];
    let cardsChosenIds = [];
    let cardsWon = [];
    const maxChances = 14;
    let chancesLeft = maxChances;
    let gameOver = false;
    let clickCount = 0;
    const chancesDisplay = document.querySelector("#chances");
    
    shuffleArray(cardArray);
    
    function shuffleArray(array) {

        for (let i = array.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    

    function createBoard() {
        let i = 0;
    
        while (i < cardArray.length) {

            const card = document.createElement("img");
            card.src = "src/images/blank.png";
            card.setAttribute("data-id", i);
            card.addEventListener("click", flipCard);
            grid.appendChild(card);
            i++;
        }
    }
    
    createBoard();

    function flipCard() {

        let cardId = this.getAttribute("data-id");
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenIds.push(cardId);
        this.setAttribute("src", cardArray[cardId].img);

        if(gameOver){

            return;
        }
        else if(clickCount % 2 === 0 && chancesLeft > 0) {

            chancesLeft--;
            chancesDisplay.textContent = chancesLeft;
        }
        else if(chancesLeft <= 0){

            alert("Game Over! You have used up all of you chances LMAOO");
            return;
        }


        if (cardsChosen.length === 2) {
            
            setTimeout(function () {
                checkForMatch();
            }, 500);
        }

        chancesDisplay.textContent = chancesLeft;
    }
    

    function checkForMatch() {

        const cards = document.querySelectorAll("img");
        const optionOneId = cardsChosenIds[0];
        const optionTwoId = cardsChosenIds[1];
    
        switch (true) {

            case optionOneId === optionTwoId:
                alert("You have clicked the same image!");
                cards[optionOneId].setAttribute("src", "src/images/blank.png");
                cards[optionTwoId].setAttribute("src", "src/images/blank.png");
                break;
                
            case cardsChosen[0] === cardsChosen[1]:

                alert("You have found a match");
                cards[optionOneId].setAttribute("src", "src/images/white.png");
                cards[optionTwoId].setAttribute("src", "src/images/white.png");
                cards[optionOneId].removeEventListener("click", flipCard);
                cards[optionTwoId].removeEventListener("click", flipCard);
                cardsWon.push(cardsChosen);
                break;
                
            default:

                cards[optionOneId].setAttribute("src", "src/images/blank.png");
                cards[optionTwoId].setAttribute("src", "src/images/blank.png");
                alert("Try again");
                break;
        }
    
        cardsChosen = [];
        cardsChosenIds = [];
        resultDisplay.textContent = cardsWon.length;
    
        if (cardsWon.length === cardArray.length / 2) {

            resultDisplay.textContent = "Congratulations! You won";
        }
    }
    
});