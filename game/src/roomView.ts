import { endRoom, getNextRoomExits, getNextRoomLocation, getRoom } from "./maze-map";
import { getLocation, getOrientation } from "./player";
import { getOpenDirs, OpenDirs } from "./room";

// FIXME: Initialize these values, or otherwise detect them
const totalWidth = 600;
const totalHeight = 370;

// These names help for readability; but they could be improved
const X = totalWidth - 1;
const Y = totalHeight - 1;

let ctx: CanvasRenderingContext2D | null = null; // This is just to avoid passing / specifying this variable all the time

function drawLine(x1: number, y1: number, x2: number, y2: number, strokeStyle = 'black', lineWidth = 5) {
    if (ctx == null) {
        console.warn("ERROR: Missing drawing context!");
        return;
    }
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
}


function drawWall(x1: number, y1: number, x2: number, y2: number, fillStyle = 'white') {
    if (ctx == null) {
        console.warn("ERROR: Missing drawing context!");
        return;
    }
    console.log(`Drawing wall using: ${{x1, y1, x2, y2}}`);
    const width = x2 - x1; // Assume for now we're going top-left to bottom-right
    const height = y2 - y1;

    ctx.fillStyle = fillStyle;
    ctx.fillRect(x1, y1, width, height);
}

export function drawTestLines(newCtx: CanvasRenderingContext2D | null) {
    ctx = newCtx;
    drawLine(20, 20, 20, 100);
}

function clearView(): void {
    if (ctx == null) {
        console.warn("ERROR: Missing drawing context!");
        return;
    }
    ctx.clearRect(0, 0, X, Y);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, X, Y);
}

function drawBorder() {
    // Start with a border around the entire canvas:
    drawLine(0, 0, X, 0); // top
    drawLine(0, 0, 0, Y); // left
    drawLine(0, Y, X, Y); // bottom
    drawLine(X, Y, X, 0); // right
}

const testValues = {
    wallInfront: false,
    nextLeftClosed: false,
    nextRightClosed: false,
};

export function drawRoomsView(newCtx: CanvasRenderingContext2D | null) {
    ctx = newCtx;

    clearView();
    drawBorder();

    const currentLocation = getLocation();
    const exits = getRoom(currentLocation);
    const orientation = getOrientation();

    const openDirs: OpenDirs = getOpenDirs(exits, orientation);
    console.log(`Current state: '${JSON.stringify({exits, orientation, currentLocation, openDirs})}'`);

    // Current room, floor - for now always filled
    if (currentLocation.x === endRoom.x && currentLocation.y === endRoom.y) {
        // Draw the end room differently
        drawLine(100, 300, 0, Y, 'green');
        drawLine(100, 300, 510, 300, 'green');
        drawLine(510, 300, 600, Y, 'green');
    } else {
        drawLine(100, 300, 0, Y);
        drawLine(100, 300, 510, 300);
        drawLine(510, 300, 600, Y);
    }

    // Current room, left wall
    if (!openDirs.left) {
        drawLine(0, 0, 100, 75);
        drawLine(100, 75, 100, 300);
    } else {
        // We could simply not draw it, draw a different shape, but let's do gray in the same location for now
        drawLine(0, 0, 100, 75, 'silver');
        drawLine(100, 75, 100, 300, 'silver');
    }

    // Current room, right wall
    if (!openDirs.right) {
        drawLine(510, 300, 510, 75);
        drawLine(510, 75, X, 0);
    } else {
        // We could simply not draw it, draw a different shape, but let's do gray in the same location for now
        drawLine(510, 300, 510, 75, 'silver');
        drawLine(510, 75, X, 0, 'silver');
    }

    // Next room?  If there is an exit in that direction - then yes; but first, if not, draw a wall
    // const roomInfront: boolean = exits.includes(orientation);
    const roomInfront: boolean = openDirs.straight;

    if (!roomInfront || testValues.wallInfront) {
        if (currentLocation.x === endRoom.x && currentLocation.y === endRoom.y) {
            drawLine(100, 75, 510, 75, 'green');
            drawWall(100, 75, 510, 300, 'green');
        } else {
            drawLine(100, 75, 510, 75, 'red');
            drawWall(100, 75, 510, 300, 'gray');
        }
        // And then end rendering - there are no more rooms to worry about
        return;
    }

    const nextRoomExits = getNextRoomExits(currentLocation, orientation);
    const nextRoomLocation = getNextRoomLocation(currentLocation, orientation);

    const nextOpenDirs = getOpenDirs(nextRoomExits, orientation);

    // Next room, floor
    // To-do: What if the room in front is the exit?  Make the floor green!
    if (nextRoomLocation.x === endRoom.x && nextRoomLocation.y === endRoom.y) {
        drawLine(100, 300, 180, 250, 'green');
        drawLine(180, 250, 420, 250, 'green');
        drawLine(420, 250, 510, 300, 'green');
    } else {
        drawLine(100, 300, 180, 250);
        drawLine(180, 250, 420, 250);
        drawLine(420, 250, 510, 300);
    }

    //Next room, left wall
    if (!nextOpenDirs.left || testValues.nextLeftClosed) {
        // Draw closed wall style
        drawLine(100, 75, 180, 120);
        drawLine(180, 120, 180, 250);
    } else {
        // Open wall style
        drawLine(100, 120, 180, 120, 'gray');
        drawLine(180, 120, 180, 250);
    }

    // To-do: Next room, right wall
    if (!nextOpenDirs.right || testValues.nextRightClosed) {
        // Draw closed wall style
        drawLine(510, 75, 420, 120);
        drawLine(420, 120, 420, 250);
    } else {
        // Open wall style
        drawLine(510, 120, 420, 120, 'gray');
        drawLine(420, 120, 420, 250);
    }

    if (!nextOpenDirs.straight) {
        if (nextRoomLocation.x === endRoom.x && nextRoomLocation.y === endRoom.y) {
            // Red line indicates there's a wall
            drawLine(180, 120, 420, 120, 'green');
            drawWall(180, 120, 420, 250, 'green');
        } else {
            // Red line indicates there's a wall that's not the exit
            drawLine(180, 120, 420, 120, 'red');
            drawWall(180, 120, 420, 250, 'gray');
        }
        // To-do: fill a rectangle on the wall instead of a simple line..
    }

    // Third room?
    // For now, just blank means there is a third room to go to
}

