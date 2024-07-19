import { Coordinates, startRoom } from "./maze-map";

export let playerDirection = 'e'; // Start out facing east; we'll update to one of: n, e, s, w
export let playerLocation: Coordinates = startRoom;

export function getOrientation(): string {
    return playerDirection;
}

export function getLocation(): Coordinates {
    return playerLocation;
}

export function tryGoStraight() {
    // FIXME: need to verify there's an open exit in our current direction
    //  (and maybe that we're not outside the grid; in case there's a problem with the map definition?)

    switch (playerDirection) {
        case 'n':
            playerLocation.y--;
            break;
        case 'e':
            playerLocation.x++;
            break;
        case 's':
            playerLocation.y++;
            break;
        case 'w':
            playerLocation.x--;
            break;
        default:
            console.warn('ERROR: Unsupported player orientation; cannot go straight');
            break;
    }
    if (playerLocation.x < 0) {
        playerLocation.x = 0;
    }
    if (playerLocation.y < 0) {
        playerLocation.y = 0;
    }
}

export function turnLeft() {
    const old = playerDirection;
    playerDirection = (
        old === 'n' ? 'w' :
        old === 'e' ? 'n' :
        old === 's' ? 'w' :
        old === 'w' ? 's' :
        old
    );
}

export function turnRight() {
    const old = playerDirection;
    playerDirection = (
        old === 'n' ? 'e' :
        old === 'e' ? 's' :
        old === 's' ? 'e' :
        old === 'w' ? 'n' :
        old
    );

}

export function turnAround() {
    const old = playerDirection;
    playerDirection = (
        old === 'n' ? 's' :
        old === 'e' ? 'w' :
        old === 's' ? 'n' :
        old === 'w' ? 'e' :
        old
    );
}