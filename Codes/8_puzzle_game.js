Array.prototype.twoDIndexOf = function (element) {
    if (this === null || this === undefined)
        throw TypeError("Array.prototype.indexOf called on null or undefined")
    for (let i = 0; i < this.length; i++) {
        const curr = this[i]
        if (curr.includes(element))
            return [i, curr.indexOf(element)];
    }
    return -1;
}

function misplaceCount(initialState, finalState) {
    var count = 0;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (initialState[i][j] != finalState[i][j]) {
                count++;
            }
        }
    }
    return count;
}

function equal(array1, array2) {

    if (array1.length == array2.length && array1.every(function (element, index) {
        return element === array2[index];
    })
    ) {
        return true;
    }
    return false;
}

function compare(...arrays) {

    var result;
    for (let index = 1; index < arrays.length; index++) {
        result ||= (equal(arrays[0], arrays[index]));
    }
    return (result);
}

function findingPossibleSwaps(initialState) {
    blankPosition = initialState.twoDIndexOf(0)
    a = blankPosition[0]
    b = blankPosition[1]
    swaps = []
    if (compare(blankPosition, [0, 0], [0, 2], [2, 0], [2, 2])) {

        swaps.push([a, 1])
        swaps.push([1, b])
    }
    else if (compare(blankPosition, [0, 1], [1, 0], [1, 2], [2, 1])) {
        swaps.push([a, b - 1])
        swaps.push([a, b + 1])
        swaps.push([a - 1, b])
        swaps.push([a + 1, b])

        swaps = swaps.filter(array => array[0] != -1 && array[0] != 3 && array[1] != -1 && array[1] != 3)
    }
    else {
        swaps.push([a, b - 1])
        swaps.push([a, b + 1])
        swaps.push([a - 1, b])
        swaps.push([a + 1, b])

    }
    return swaps;

}

function swapper(initialArray, swapIndex1, swapIndex2) {
    var array = JSON.parse(JSON.stringify(initialArray));
    var temp = array[swapIndex1[0]][swapIndex1[1]];
    array[swapIndex1[0]][swapIndex1[1]] = array[swapIndex2[0]][swapIndex2[1]];
    array[swapIndex2[0]][swapIndex2[1]] = temp;
    return array;
}

function game(initialState, finalState) {

    var currentInitialState = initialState;
    var currentCost = misplaceCount(initialState, finalState);

    var blankPosition = initialState.twoDIndexOf(0)
    var swaps = findingPossibleSwaps(initialState);


    for (let index = 0; index < swaps.length; index++) {
        var newInitialState = (swapper(initialState, blankPosition, swaps[index]));
        var newCost = misplaceCount(newInitialState, finalState);
        if (newCost < currentCost) {
            currentCost = newCost;
            currentInitialState = newInitialState;
        }
    }

    if (currentCost) {
        states.push(currentInitialState)
        game(currentInitialState, finalState)
    } else {
        states.push(finalState)
    }
}


function printResults(states) {
    console.log("Initial:");
    for (let i = 0; i < states.length; i++) {
        if (i == states.length - 1) console.log("Final:");
        else console.log("Intermediate steps:");
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < states[i][j].length; k++) {

                if (states[i][j][k] == 0) {
                    states[i][j][k] = 'x'
                }
            }
            console.log(states[i][j]);
        }
        console.log();
    }
}

var initialState =
    [
        [1, 2, 3],
        [5, 6, 0],
        [7, 8, 4]
    ]
var finalState =
    [
        [1, 2, 3],
        [5, 8, 6],
        [0, 7, 4]
    ]

const states = []
states.push(initialState)
game(initialState, finalState)
printResults(states);

