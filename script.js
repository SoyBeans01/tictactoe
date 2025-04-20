let xTurn = true;
const x_icon = "./images/x.png";
const o_icon = "./images/o.png";
const markedTiles = [];
let gameOver = false;

const updateSpanTag = () => {
    try {
        if (xTurn) {
            document.getElementById('o-span').innerHTML = 'X';
            document.getElementById('o-span').id = 'x-span';
        }
        else if (!xTurn) {
            document.getElementById('x-span').innerHTML = 'O';
            document.getElementById('x-span').id = 'o-span';
        }
    } catch (error) {
        null;
    }

}

const displayTurn = (xTurn) => {
    if (xTurn) {
        return (`Player <span id='x-span'>X</span>'s turn`);
    }
    else {
        return ("Player <span id='o-span'>O</span>'s turn");
    }
}

const markTile = (tile) => {
    if (gameOver) {
        return;
    }
    if (tile.childElementCount < 1) {
        const newImg = document.createElement('img');
        newImg.setAttribute('class', 'image');
        newImg.setAttribute('id', xTurn ? 'x-tile' : 'o-tile');
        newImg.setAttribute('src', xTurn ? x_icon : o_icon);
        tile.appendChild(newImg);
        xTurn = !xTurn;
        updateSpanTag();
        checkWinner(tile);
    }
}

const resetGame = () => {
    gameOver = false;
    let images = Array.from(document.getElementsByClassName('image'));
    for (let i = 0; i < images.length; i++) {
        images[i].remove();
    }
    xTurn = true;
    updateSpanTag();
}

const checkWinner = (clickedTile) => {
    const tiles = Array.from(document.getElementsByClassName('tile'));

    //checks vertically
    let xColSum = 0;
    let oColSum = 0;
    for (let col = 0; col < 3; col++) {
        xColSum = 0;
        oColSum = 0;
        for (let row = 0; row < 3; row++) {
            let rowStr = row.toString();
            let colStr = col.toString();

            //I'm pretty sure the colStr and rowStr are inverted here
            const colTile = document.getElementById(colStr + rowStr);
            const colImage = colTile.children[0];

            if (colTile.childElementCount > 0) {
                if (colImage.id == 'x-tile') {
                    xColSum += 1;
                }
                else if (colImage.id == 'o-tile') {
                    oColSum += 1;
                }
            }
            if (xColSum == 3) {
                alert('player X is the winner');
                gameOver = true;
                break;
            }
            if (oColSum == 3) {
                alert('player O is the winner');
                gameOver = true;
                break;
            }
        }
    }
    //checks horizontally
    let xRowSum = 0;
    let oRowSum = 0;
    for (let col = 0; col < 3; col++) {
        xRowSum = 0;
        oRowSum = 0;
        for (let row = 0; row < 3; row++) {
            let rowStr = row.toString();
            let colStr = col.toString();
            const rowTile = document.getElementById(rowStr + colStr);
            const rowImage = rowTile.children[0];
            if (rowTile.childElementCount > 0) {
                if (rowImage.id == 'x-tile') {
                    xRowSum += 1;
                }
                else if (rowImage.id == 'o-tile') {
                    oRowSum += 1;
                }
            }
            if (xRowSum == 3) {
                alert('player X is the winner');
                gameOver = true;
                break;
            }
            if (oRowSum == 3) {
                alert('player O is the winner');
                gameOver = true;
                break;
            }
        }
    }
    //checks diagonally
    let xDiagSum = 0;
    let oDiagSum = 0;
    //2 possible diagonals
    for (let i = 0; i < 3; i += 2) {
        xDiagSum = 0;
        oDiagSum = 0;
        for (let k = 0; k < 3; k++) {
            let kStr = k.toString();
            let iStr = Math.abs(i - k).toString();

            console.log('i: ' + iStr);
            console.log('k: ' + k);

            const diagTile = document.getElementById(kStr + iStr);
            const diagImage = diagTile.children[0];

            if (diagTile.childElementCount > 0) {
                if (diagImage.id == 'x-tile') {
                    xDiagSum += 1;
                }
                else if (diagImage.id == 'o-tile') {
                    oDiagSum += 1;
                }
            }
            console.log('x diagonals: ' + xDiagSum);
            console.log('o diagonals: ' + oDiagSum);
            if (xDiagSum == 3) {
                alert('player X is the winner');
                gameOver = true;
                break;
            }
            if (oDiagSum == 3) {
                alert('player O is the winner');
                gameOver = true;
                break;
            }
        }
    }
}