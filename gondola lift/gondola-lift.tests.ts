import {gondolaLift} from "./gondola-lift";
const example = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

const puzzle = ``
describe('testing index file', () => {
    test('gondolaLift example 1', () => {
        const number = gondolaLift(example);
        expect(number).toBe(4361);
    });

    test('puzzle', () => {
        const number = gondolaLift(puzzle);
        console.log(number)
    });
});