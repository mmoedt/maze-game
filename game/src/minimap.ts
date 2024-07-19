
// NOTE: To-Do; This file is not used yet, and it's not part of required functionality

import { getSize, MapSize } from "./maze-map";


// To-do make a more abstract map type
export function createMinimap(map: string[][]): string[][] {
    const mapSize: MapSize = getSize();
    // First thought was to use map drawing characters, but I think one character per square works better
    // const miniMapSize = {
    //     x = mapSize.x * 2,
    //     y = mapSize.y * 2,
    // };
    const miniMapSize: MapSize = {
        x: mapSize.x,
        y: mapSize.y,
    };
    const dummyRoomChar = getRoomChar('');
    let miniMap = Array(miniMapSize.y).fill([]).map(() => Array(miniMapSize.x).fill(dummyRoomChar));

    // FIXME: Iterate over the map and fill in the needed characters for the mini-map, using getRoomChar..
    return miniMap; // dummy value for now
}

// get a simple string like 'esw' (open directions) and return a character that shows what the room looks like
function getRoomChar(room: string): string {
    let roomChar = '\u{1fb90}'; // Unknown, or no exits

        // case 'n': '\u{2a06}',
        // case 'ne': '\u{1fb7c}',
        // case 'nes': '\u{1fb70}',
        // case 'nesw': ' ',
        // case 'e': '[',

    return roomChar;
}