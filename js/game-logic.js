let playerOneMoveOneType,
playerOneMoveTwoType,
playerOneMoveThreeType,
playerTwoMoveOneType,
playerTwoMoveTwoType,
playerTwoMoveThreeType,

playerOneMoveOneValue,
playerOneMoveTwoValue,
playerOneMoveThreeValue,
playerTwoMoveOneValue,
playerTwoMoveTwoValue,
playerTwoMoveThreeValue,
playerOneWin,
playerTwoWin;


const setPlayerMoves = (player, moveOneType, moveOneValue, 
    moveTwoType, moveTwoValue, moveThreeType, moveThreeValue) => {
    
    // Checking for invalid moves and terminating asap
    if (!isValidMove(moveOneType) || !isValidMove(moveTwoType) || !isValidMove(moveThreeType)) {
        return
    }

    if (!isValidMoveValue(moveOneValue) || !isValidMoveValue(moveTwoValue) || !isValidMoveValue(moveThreeValue)) {
        return
    }
    
    // Checking if the sum of all values are over 99
    if ((moveThreeValue + moveTwoValue + moveOneValue) > 99) {
        return
    }
    switch (player) {
        case 'Player One':
            // if move is valid, assign variable to earlier empty variables
            // if move1 && move2 && move3 moves and values are valid

            // Refactor this into a helper function please
            if (isValidMove(moveOneType) || isValidMove(moveTwoType) || isValidMove(moveThreeType) &&
            (!isValidMoveValue(moveOneValue) || !isValidMoveValue(moveTwoValue) || !isValidMoveValue(moveThreeValue)) &&
            isValidTotalStrength(moveOneValue, moveTwoValue, moveThreeValue)) {
                playerOneMoveOneType = moveOneType
                playerOneMoveOneValue = moveOneValue
                playerOneMoveTwoType = moveTwoType
                playerOneMoveTwoValue = moveTwoValue
                playerOneMoveThreeType = moveThreeType
                playerOneMoveThreeValue = moveThreeValue
            }
            break;
        
        case 'Player Two':
            if (isValidMove(moveOneType) || isValidMove(moveTwoType) || isValidMove(moveThreeType) &&
            (!isValidMoveValue(moveOneValue) || !isValidMoveValue(moveTwoValue) || !isValidMoveValue(moveThreeValue)) &&
            isValidTotalStrength(moveOneValue, moveTwoValue, moveThreeValue)) {
                playerTwoMoveOneType = moveOneType
                playerTwoMoveOneValue = moveOneValue
                playerTwoMoveTwoType = moveTwoType
                playerTwoMoveTwoValue = moveTwoValue
                playerTwoMoveThreeType = moveThreeType
                playerTwoMoveThreeValue = moveThreeValue
            }
            break;

        default:
            break;
    }
}

const getRoundWinner = (roundNumber) => {
    switch (roundNumber) {
        case 1:
            return getWinner(playerOneMoveOneType, playerTwoMoveOneType, playerOneMoveOneValue, playerTwoMoveOneValue)
            
        case 2:
            return getWinner(playerOneMoveTwoType, playerTwoMoveTwoType, playerOneMoveTwoValue, playerTwoMoveTwoValue)
            
        case 3:
            return getWinner(playerOneMoveThreeType, playerTwoMoveThreeType, playerOneMoveThreeValue, playerTwoMoveThreeValue)
            
        default:
            return null;
    }
}

const getGameWinner = () => {
    playerOneWin = 0
    playerTwoWin = 0

    if (!playerOneMoveOneType ||
        !playerOneMoveTwoType ||
        !playerOneMoveThreeType ||
        !playerTwoMoveOneType ||
        !playerTwoMoveTwoType ||
        !playerTwoMoveThreeType ||
        !playerOneMoveOneValue ||
        !playerOneMoveTwoValue ||
        !playerOneMoveThreeValue ||
        !playerTwoMoveOneValue ||
        !playerTwoMoveTwoValue ||
        !playerTwoMoveThreeValue) {
        return null
    }

    // getting round winners for each round and setting it to a variable
    const roundOneWinner = getRoundWinner(1)
    const roundTwoWinner = getRoundWinner(2)
    const roundThreeWinner = getRoundWinner(3)

    // Compute scores of each round
    if ((roundOneWinner === "Player One")) {
        playerOneWin = playerOneWin + 1
    } else if (roundOneWinner === "Tie") {
        playerTwoWin = playerTwoWin + 1
        playerOneWin = playerOneWin + 1
    } else {
        playerTwoWin = playerTwoWin + 1
    }   

    if ((roundTwoWinner === "Player One")) {
        playerOneWin = playerOneWin + 1
    } else if (roundTwoWinner === "Tie") {
        playerTwoWin = playerTwoWin + 1
        playerOneWin = playerOneWin + 1
    } else {
        playerTwoWin = playerTwoWin + 1
    }

    if ((roundThreeWinner === "Player One")) {
        playerOneWin = playerOneWin + 1
    } else if (roundThreeWinner === "Tie") {
        playerTwoWin = playerTwoWin + 1
        playerOneWin = playerOneWin + 1
    } else {
        playerTwoWin = playerTwoWin + 1
    }

    // Determine winner
    if (playerOneWin > playerTwoWin) {
        return "Player One"
    } else if (playerTwoWin > playerOneWin) {
        return "Player Two"
    } else {
        return "Tie"
    }
}

const setComputerMoves = () => {
    const moves = ['rock', 'paper', 'scissors']

    const moveOneType = moves[Math.floor(Math.random() * 3)];
    const moveTwoType = moves[Math.floor(Math.random() * 3)];
    const moveThreeType = moves[Math.floor(Math.random() * 3)];

    const moveOneValue = Math.floor(Math.random() * 96) + 1;
    const moveTwoValue = Math.floor(Math.random() * (96 - moveOneValue)) + 1;
    const moveThreeValue = 99 - moveTwoValue - moveOneValue;

    setPlayerMoves('Player Two', moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue)
}

// Helper functions

const isValidMove = (userInput) => {
    if (userInput === 'rock') {
        return true;
      } else if (userInput === 'paper') {
        return true;
      } else if (userInput === 'scissors') {
        return true;
      } 
}

const isValidMoveValue = (value) => {
    if (typeof value === 'number') {
        if ((value > 0) && (value < 100)) {
            return value
        }
    }
}

const isValidTotalStrength = (value1, value2, value3) => {
    if ((moveThreeValue + moveTwoValue + moveOneValue) <= 99) {
        return true
    }
}

const getWinner = (type1, type2, value1, value2) => {
    
    if (!type1 || !type2 || !value1 || !value2) {
       return null 
    }
    
    if (type1 === type2) {
        if (value1 > value2) {
            return "Player One"
        } else if ((value1 < value2)) {
            return "Player Two"
        } else {
            return "Tie"
        }
    }

    if (type1 === 'rock') {
        if (type2 === 'paper') {
            return "Player Two"
        } else {
            return "Player One"
        }
    }

    if (type1 === 'paper') {
        if (type2 === 'scissors') {
            return "Player Two"
        } else {
            return "Player One"
        }
    }

    if (type1 === 'scissors') {
        if (type2 === 'rock') {
            return "Player Two"
        } else {
            return "Player One"
        }
    }
}