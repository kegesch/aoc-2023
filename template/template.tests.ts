import {template} from "./template";
const example = ``
const puzzle = ``
describe('testing index file', () => {
    test('template example 1', () => {
        const number = template(example);
        expect(number).toBe(142);
    });

    test('puzzle', () => {
        const number = template(puzzle);
        console.log(number)
    });
});