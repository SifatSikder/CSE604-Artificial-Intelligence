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

Array.prototype.have = function (newInitialState) {
    if (this === null || this === undefined)
        throw TypeError("Array.prototype.indexOf called on null or undefined")
    for (let i = 0; i < this.length; i++) {
        // console.log(newInitialState);
        // console.log(newInitialState === this[i]);
        var match = true;
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {

                match = match && (newInitialState[j][k] == this[i][j][k])
                if (!match) break
            }
            if (!match) break
        }
        if (match) return true
    }
    return false;
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

function writeToFile(content) {
    const fs = require('fs');
    fs.appendFileSync('./result.txt', content, err => {
        if (err) console.error(err);
    });
}

function getLinearSequence(initialState) {

    var length = initialState[0].length
    var linearSequence = []
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (initialState[i][j]) linearSequence.push(initialState[i][j])
        }
    }
    return linearSequence
}

function countInversionNumber(linearSequence) {

    let count = 0;
    for (let i = 0; i < linearSequence.length; i++) {
        for (let j = i + 1; j < linearSequence.length; j++) {
            if (linearSequence[i] > linearSequence[j]) count++
        }
    }
    return count;
}

function getParentState(finalState, solutionPath) {
    return [...solutionPath].find(([key, val]) => {
        var match = true
        for (let i = 0; i < finalState.length; i++) {
            for (let j = 0; j < finalState.length; j++) {
                if (key[i][j] != finalState[i][j]) match = false
            }
        }
        return match
    })[1]
}

function pathFinder(solutionPath, initialState, finalState) {
    var reversePaths = []
    reversePaths.push(finalState);
    var state = finalState
    for (let i = 0; ; i++) {
        state = getParentState(state, solutionPath)
        reversePaths.push(state);
        if (state == initialState) break;
    }
    var paths = []
    for (let i = reversePaths.length - 1; i >= 0; i--) {
        paths.push(reversePaths[i])
    }
    return paths
}

function printPaths(states) {



    for (let i = 0; i < states.length; i++) {
        if (i == 0) {
            writeToFile("Initial:");
            writeToFile('\n\n')
        }
        else if (i == states.length - 1) {
            writeToFile(`Final step number: ${i}`);
            writeToFile('\n\n')

        }
        else {
            writeToFile(`Intermediate step number: ${i}`);
            writeToFile('\n\n')
        }
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < states[i][j].length; k++) {

                if (states[i][j][k] == 0) {
                    states[i][j][k] = 'x'
                }
            }
            writeToFile(JSON.stringify(states[i][j]));
            writeToFile('\n')
        }
        writeToFile('\n')
    }
}


function game(initialState, finalState) {

    for (let i = 0; i < 400000; i++) {

        var blankPosition = initialState.twoDIndexOf(0)
        var swaps = findingPossibleSwaps(initialState);

        for (let index = 0; index < swaps.length; index++) {
            var newInitialState = (swapper(initialState, blankPosition, swaps[index]));


            var currentCost = misplaceCount(newInitialState, finalState);

            if (currentCost == 0) {
                let a = states.shift()
                // console.log(`state number ${i + 1}`);
                // console.log(a);
                // console.log(`state number ${i + 2}`);
                // console.log(newInitialState);
                resultSteps.push(a)
                resultSteps.push(newInitialState)
                solutionPath.set(newInitialState, initialState)
                return true
            }
            if (!resultSteps.have(newInitialState) && !states.have(newInitialState)) {

                solutionPath.set(newInitialState, initialState)
                states.push(newInitialState)
            }
        }



        const b = states.shift()
        // console.log(`state number ${i + 1}`);
        // console.log(b);
        resultSteps.push(b)
        // duplicates(resultSteps)
        initialState = states[0]
    }

    return false



}



// const initialState =
//     [
//         [1, 2, 3],
//         [4, 5, 6],
//         [0, 7, 8]
//     ]
const initialState =
    [
        [5, 2, 8],
        [0, 1, 7],
        [4, 3, 6]
    ]
// var initialState =
//     [
//         [8, 1, 2],
//         [0, 4, 3],
//         [7, 6, 5]
//     ]
const finalState =
    [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0]
    ]



const states = []
const resultSteps = []
const solutionPath = new Map();
const linearSequence = getLinearSequence(initialState)
const totalInversionNumber = countInversionNumber(linearSequence)


if (totalInversionNumber % 2 == 1) {
    console.log(`As the number of inversion is ${totalInversionNumber}(odd) so can not reach in goal state`);
}
else {
    states.push(initialState)
    game(initialState, finalState)
    printPaths(pathFinder(solutionPath, initialState, finalState))
}














