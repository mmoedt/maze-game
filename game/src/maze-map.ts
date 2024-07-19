
// Define the map structure in a mostly human readable format:
//  2-d array; array of rows, first row is most north, first subentry is most west.
//  the letters indicate which directions are open for traversal
//  (e.g. 'nesw' all ways open, '' for a room you're stuck in, 'ew' for east and west open)
//  (note: this may allow one-way 'doors')
export const map: string[][] = [
    ['e', 'ew', 'esw', 'sw'], // first entry is the start
    ['', 'es', 'nw', 'n'],
    ['e', 'nsw', '', ''],
    ['', 'ne', 'w', ''],  // third entry is the end, so we don't actually need to have exits..
];

export interface Coordinates {
    x: number,
    y: number,
}

export interface MapSize {
    x: number,
    y: number,
}

// Start at top-left, most north and west
export const startRoom: Coordinates = {
    y: 0,
    x: 0,
}

export const endRoom: Coordinates = {
    y: 3,
    x: 2,
}

export function getSize(): MapSize {
    const y = map.length;
    const x = map[0].length; // Assuming it's been properly defined as a consistent rectangle
    return { x, y };
}

export function getRoom(location: Coordinates): string {
    const row: string[] = map[location.y];
    const room = row[location.x];
    return room;
}

export function getNextRoom(location: Coordinates, orientation: string): string {
    let nextRoom = '';

    let thisRoom = getRoom(location);
    if (!thisRoom.includes(orientation)) {
        // Sorry, no exit straightforward, so no next room
        return ''; // default to all walls closed off
    }

    let row = [];

    switch (orientation) {
        case 'n':
            row = map[location.y - 1];
            nextRoom = row[location.x];
            break;
        case 'e':
            row = map[location.y];
            nextRoom = row[location.x + 1];
            break;
        case 's':
            row = map[location.y + 1];
            nextRoom = row[location.x];
            break;
        case 'w':
            row = map[location.y];
            nextRoom = row[location.x - 1];
            break;
        default:
            console.warn('ERROR in getNextRoom');
    }

    return nextRoom;
}