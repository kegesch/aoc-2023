export function conundrum(str: string, possible: Set): number {
    const games = str
        .split('\n')
        .map(parse);
    const possibleGames = games.filter(g => gameIsPossible(g, possible));

    const possibleGameIdSum = possibleGames.reduce((acc, curr) => acc + curr.game, 0);

    return possibleGameIdSum;
}

export function minimumConundrumPower(str: string): number {
    const games = str
        .split('\n')
        .map(parse);
    const minimalPowers = games.map(g => {
        const minimal = minimalSet(g.sets);
        const power = colors.map(c => minimal[c] ?? 1).reduce((acc, curr) => acc * curr, 1);

        return power;
    })

    const powerSum = minimalPowers.reduce((acc, curr) => acc + curr, 0);

    return powerSum;
}

function minimalSet(sets: Set[]): Set {
    const minimalSet = {}
    for (let set of sets) {
        for (let color of colors) {
            if(set[color] && (!minimalSet[color] || minimalSet[color] < set[color])) {
                minimalSet[color] = set[color]
            }
        }
    }

    return minimalSet;
}

function gameIsPossible(game: Game, possible: Set): boolean {
    return game.sets.every(set => {
        return (set.green == undefined || set.green <= possible.green) &&
            (set.red == undefined || set.red <= possible.red) &&
                (set.blue == undefined || set.blue <= possible.blue);
    })
}

const colors = [
    "green",
    "blue",
    "red"
]

type Color = typeof colors[number];

type Set = {
    [key: Color]: number,
}

type Game= {
    game: number,
    sets: Set[]
}

function parse(line: string) : Game {
    const [game, ...setsString] = line.split(':');
    const [_, gameIndexStr] = game.split('Game ');
    const gameIndex = parseInt(gameIndexStr, 10);

    const sets = setsString[0].split(';')
        .map(setStr => setStr
            .split(',')
            .map(parseColor)
            .reduce((set: Set, color: { [key: Color]: number}) => {
                return {...set, ...color};
            }, {})) as Set[];


    return {
        game: gameIndex,
        sets
    }
}

function parseColor(str: string): { [key: Color]: number} {
    const [count, color] = str.trim().split(" ");
    if(colors.includes(color)) {
        const colorObj = {};
        colorObj[color] = parseInt(count, 10)
        return colorObj;
    } else {
        throw Error(`Color ${color} is not valid`);
    }
}