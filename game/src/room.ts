
// This is meant for rendering the 3d output window,
//  so we only care about left, stright, and right from the player's perspective
export interface openDirs {
    left: boolean,
    straight: boolean,
    right: boolean,
}

export function getOpenDirs(room: string, orientation: string): openDirs {
    let left: boolean;
    let right: boolean;

    // For straight, if our orientation is in the list of open exits, it's open
    const straight = room.includes(orientation);

    switch (orientation) {
        case 'n':
            left = room.includes('w');
            right = room.includes('e');
            break;
        case 'e':
            left = room.includes('n');
            right = room.includes('s');
            break;
        case 's':
            left = room.includes('e');
            right = room.includes('w');
            break;
        case 'w':
            left = room.includes('w');
            right = room.includes('n');
            break;
        default:
            console.warn("ERROR: Unexpected case in getOpenDirs");
            left = false;
            right = false;
    }

    return { left, straight, right };
}