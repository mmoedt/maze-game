import { Coordinates, getRoom, getSize, startRoom } from "./maze-map";
import { getOpenDirs, OpenDirs } from "./room";

const startDirection = 'e';

let orientation = startDirection; // Start out facing east; we'll update to one of: n, e, s, w
let location: Coordinates = startRoom;

export function getOrientation(): string {
    return orientation;
}

export function getLocation(): Coordinates {
    return { ...location };
}

export function getStartingDirection(): string {
    return startDirection;
}

export function getStartingLocation(): Coordinates {
    return { ...startRoom };
}

function locationString(loc: Coordinates = location): string {
    return `x: ${loc.x}, y: ${loc.y}`;
}

export function tryGoStraight(): boolean {
    console.log('Trying to go straight..');

    const currentLocation = getLocation();
    const roomExits = getRoom(currentLocation);
    const orientation = getOrientation();
    const openDirs: OpenDirs = getOpenDirs(roomExits, orientation);
    const newLocation = { x: location.x, y: location.y }; // Create a new var so that changes are seen
    const mapSize = getSize();
    let didMove = false;

    // Return early if we can't go straight
    if (!openDirs?.straight) {
        console.log('Straight is not an open direction! Not moving or doing anything.');
        return false;
    }

    // FIXME: need to verify there's an open exit in our current direction
    //  (and maybe that we're not outside the grid; in case there's a problem with the map definition?)

    switch (orientation) {
        case 'n':
            newLocation.y--;
            didMove = true;
            break;
        case 'e':
            newLocation.x++;
            didMove = true;
            break;
        case 's':
            newLocation.y++;
            didMove = true;
            break;
        case 'w':
            newLocation.x--;
            didMove = true;
            break;
        default:
            console.warn('ERROR: Unsupported player orientation; cannot go straight');
            break;
    }

    // TODO: Put these checks in the switch above?
    if (newLocation.x <= 0) {
        console.log('Hit beginning of the map, X coord');
        newLocation.x = 0;
    }
    if (newLocation.y < 0) {
        console.log('Hit beginning of the map, X coord');
        newLocation.y = 0;
    }
    if (newLocation.x >= mapSize.x) {
        console.log('Hit end of the map, X coord');
        newLocation.x = mapSize.x - 1;
    }
    if (newLocation.y >= mapSize.y) {
        console.log('Hit end of the map, Y coord');
        newLocation.y = mapSize.y - 1;
    }

    console.log(`Updating location: old: [${locationString()}], new: [${locationString(newLocation)}]`);
    location = newLocation;

    return didMove;
}

export function turnLeft() {
    console.log('Turning left..');

    const old = orientation;
    orientation = (
        old === 'n' ? 'w' :
        old === 'w' ? 's' :
        old === 's' ? 'e' :
        old === 'e' ? 'n' :
        old
    );
}

export function turnRight() {
    console.log('Turning right..');

    const old = orientation;
    orientation = (
        old === 'n' ? 'e' :
        old === 'e' ? 's' :
        old === 's' ? 'w' :
        old === 'w' ? 'n' :
        old
    );

}

export function turnAround() {
    console.log('Turning aroumd..');

    const old = orientation;
    orientation = (
        old === 'n' ? 's' :
        old === 'e' ? 'w' :
        old === 's' ? 'n' :
        old === 'w' ? 'e' :
        old
    );
}