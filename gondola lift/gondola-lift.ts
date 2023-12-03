export function gondolaLift(str: string): number {
    const matrix = new Matrix(str);
    const adjacentNumbers = matrix.getAdjacentNumbers();
    return adjacentNumbers.reduce((acc, n) => acc + n.number, 0);
}

export function gearRatio(str: string): number {
    const matrix = new Matrix(str);
    const gearRatios = matrix.getGearRatios();
    return gearRatios.reduce((acc, n) => acc + n, 0);
}

type Item = {
    type: "number" | "symbol" | "unknown";
    number?: number;
}

type Number = {
    index: number,
    length: number,
    number: number,
}

class Matrix {
    chars: Item[][] = [];
    numbers: Number[][];
    gears: {
        line: number;
        index: number;
    }[] = [];
    constructor(str: string) {
        const lines = str.split("\n");

        this.numbers = lines.map(l => {
            const numberStrings = l.split(/\D/g)
                .map(s => s.replace(/\D/g, ''))
                .filter(s => s != "");
            const numbers = [];
            for (const numberString of numberStrings) {
                const lastNumber = numbers[numbers.length - 1];
                const minIndex = (lastNumber?.index ?? 0) + (lastNumber?.length ?? 0);
                numbers.push({
                    index: l.indexOf(numberString, minIndex),
                    length: numberString.length,
                    number: parseInt(numberString, 10)
                } as Number);
            }
            return numbers;
        })

        this.chars = lines.map((l, lIndex) => l.split("").map((char, index) => {
            const number = parseInt(char, 10);
            if (isNaN(number)) {
                if (char == ".") {
                    return {
                        type: "unknown"
                    }
                } else {
                    if(char == "*") {
                        this.gears.push({
                            line: lIndex,
                            index
                        })
                    }
                    return {
                        type: "symbol",
                    }
                }
            } else {
                return {
                    type: "number",
                    number: number
                }
            }
        }));
    }

    getAdjacentNumbers() {
        const adjacentNumbers = []

        for (let i = 0; i < this.numbers.length; i++) {
            for (const number of this.numbers[i]) {
                if (this.isNumberAdjacent(i, number.index, number.length)) {
                    adjacentNumbers.push(number)
                }
            }
        }

        return adjacentNumbers;
    }

    isNumberAdjacent(lineIndex: number, indexStart: number, length: number = 1 ) {
        return this.getAdjacentItems(lineIndex, indexStart, length).some(item => item.type == "symbol");
    }

    getAdjacentItems(lineIndex: number, indexStart: number, length: number = 1) {
        const items = []
        for (let j = lineIndex - 1; j <= lineIndex + 1; j++) {
            if (!this.chars[j]) {
                continue;
            }
            for (let i = indexStart - 1; i <= indexStart + length; i++) {
                const item = this.chars[j][i]
                if (item) {
                    items.push(item)
                }
            }
        }
        return items;
    }

    getAdjacentNumbersFor(lineIndex: number, indexStart: number, length: number = 1) {
        const numbers: Number[] = []
        let lastNumber = undefined;
        for (let j = lineIndex - 1; j <= lineIndex + 1; j++) {
            if (!this.numbers[j]) {
                continue;
            }
            for (let i = indexStart - 1; i <= indexStart + length; i++) {
                const number = this.numbers[j].find(number => i >= number.index && i < (number.index + number.length))
                if (number && number != lastNumber) {
                    numbers.push(number)
                    lastNumber = number;
                }
            }
        }
        return numbers;
    }

    getGearRatios() {
        const gearRatios = []
        for (let i = 0; i < this.gears.length; i++) {
            const gear = this.gears[i];
            const adjacentNumbers = this.getAdjacentNumbersFor(gear.line, gear.index, 1);
            if(adjacentNumbers.length == 2) {
                gearRatios.push(adjacentNumbers[0].number * adjacentNumbers[1].number)
            }
        }
        return gearRatios;
    }
}
