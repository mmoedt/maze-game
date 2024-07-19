
// NOTE: To-Do; This file is not used yet, and it's not part of required functionality


// To-do make a more abstract map type
function createMinimap(map: string[][]): string[][] {
    const mapSize: MapSize = getSize();
    // First thought was to use map drawing characters, but I think one character per square works better
    // const miniMapSize = {
    //     x = mapSize.x * 2,
    //     y = mapSize.y * 2,
    // };
    // let miniMap = Array(miniMapSize.y).fill().map(() => Array(miniMapSize.x).fill(' '));


}

// get a simple string like 'esw' (open directions) and return a character that shows what the room looks like
function getRoomChar(room: string): string {
    let roomChar = '\u{1fb90}'; // Unknown, or no exits

    case room:
        'n': '\u{2a06}',
        'ne': '\u{1fb78c}',
        'nes': '\u{1fb70}',
        'nesw': ' ',
        'e': '[',
        // 'es': '',
        // 'esw': ' ',
        // 's': ' ',
        // 'sw': ' ',
        // 'w': ']',
        // '': '\u{1fb90}',
        // 'n': ' ',
        // 'n': ' ',
        // 'n': ' ',
        // 'n': ' ',
        // 'n': ' ',
        // 'n': ' ',
        // 'n': ' ',
        // 'n': ' ',
        // ''

    return roomChar;
}