export function scratchcards(str: string): number {
    return str.split("\n")
        .map(handleCardLine)
        .map((winningCardCount) => {
           return winningCardCount > 0 ? Math.pow(2, winningCardCount - 1) : 0
    }).reduce((acc, curr) => acc + curr, 0);
}

export function scratchcardSnowball(str: string): number {
    const winingCardsWithIndex = str.split("\n")
        .map((line, index) => handleCardLine(line));
    return winingCardsWithIndex.map((_, index) => snowball(index, winingCardsWithIndex)).reduce((acc, curr) => acc + curr, 0);
}

export function snowball(index: number, winingCardsWithIndex: number[]): number {
    const count = winingCardsWithIndex[index];
    const copies = [];
    for (let i = index; i < index + count; i++) {
        copies.push(i+1)
    }

    return copies.map(c => snowball(c, winingCardsWithIndex)).reduce((acc, curr) => acc + curr, 1);
}

//Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
function handleCardLine(line: string): number {
    const [_, allNumberString] = line.split(":");
    const [winningNumberString, numberString] = allNumberString.trim().split("|");
    const winningNumbers = parseNumbers(winningNumberString);
    const numbers = parseNumbers(numberString);

    return numbers.filter(n => winningNumbers.includes(n)).length;
}

function parseNumbers(numberString: string): number[] {
    return numberString.trim().split(" ").filter(str => str != "").map((str) => parseInt(str.trim(), 10));
}

