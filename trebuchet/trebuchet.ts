export function trebuchet(str: string): number {
    const lines = str.split('\n');
    //const values = lines.map(l => l.split('').filter(str => parseInt(str, 10)));
    const values = lines.map(getValues)
    const calibration = values.map(numbers => parseInt(`${numbers[0]}${numbers[numbers.length -1]}`))
    return calibration.reduce((acc, curr) => acc + curr, 0);
}

const digits = {
    "zero": 0,
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
}

function getValues(line: string) {
    const words = Object.keys(digits);
    const numbers = Object.values(digits);
    const foundDigits = {}

    for (const wordDigit of words) {
        const foundIndices = findIndices(line, wordDigit);
        for (const foundIndex of foundIndices) {
            foundDigits[foundIndex] = digits[wordDigit];
        }
    }
    for (const numberDigit of numbers) {
        const foundIndices = findIndices(line, `${numberDigit}`);
        for (const foundIndex of foundIndices) {
            foundDigits[foundIndex] = numberDigit;
        }
    }
    const values: number[] =  Object.keys(foundDigits).map(key => parseInt(key, 10)).sort((a, b) => {
        return a - b;
    }).map(index => foundDigits[index])

    return values;
}

function findIndices(line: string, searchString: string, searchStart: number = 0): number[] {
    let indices = []
    const lineContainsWordDigit = line.indexOf(searchString, searchStart);
    if(lineContainsWordDigit >= 0) {
        indices.push(lineContainsWordDigit);
        indices = indices.concat(findIndices(line, searchString, lineContainsWordDigit + 1))
    }
    return indices;
}

