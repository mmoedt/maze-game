import React, { useEffect, useRef, useState } from 'react';
// import logo from './logo.svg'; // From create-react-app
import './App.css';
import { drawRoomsView } from './roomView';
import { getLocation, getOrientation, getStartingDirection, getStartingLocation, tryGoStraight, turnAround, turnLeft, turnRight } from './player';

const WIDTH = 600;
const HEIGHT = 370;

function App() {
    const canvas = useRef<HTMLCanvasElement>(null);
    // let ctx: CanvasRenderingContext2D | null = null;
    const [location, setLocation] = useState(getStartingLocation());
    const [orientation, setOrientation] = useState(getStartingDirection());
    const [moveCount, setMoveCount] = useState(0);
    const [lastAction, setLastAction] = useState(''); // helpful text for user orientation

    useEffect(() => {
        let element = canvas.current;

        // Quick check to make sure element is defined..
        if (!element) {
            console.warn("ERROR: element is not defined, as was expected!");
            return;
        }

        // FIXME: This should use a percentage of the total window size
        element.width = WIDTH;
        element.height = HEIGHT;

        // ctx = element.getContext('2d');

        // Configure element for receiving keypresses
        element.focus();

    }, []);

    useEffect(() => {
        const element = canvas.current;
        // Quick check to make sure element is defined..
        if (!element) {
            console.warn("ERROR: element is not defined, as was expected!");
            return;
        }
        const ctx: CanvasRenderingContext2D | null = element.getContext('2d');

        // drawTestLines(ctx);
        console.log(`Drawing the current room..`)
        drawRoomsView(ctx);
    }, [location, orientation, moveCount]);

    const processKeys: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
        const keyPressed = e?.key;
        console.log(`Got keyboard event with ${{keyPressed,}}`, e);

        // These are updated the switch below; here are the defaults
        let updateState = true;
        let keyHandled = true;

        switch (keyPressed) {
            case 'ArrowUp':
            case 'w':
            case 'W': // shift or with caps lock is fine
                tryGoStraight();
                setLastAction('Proceeded straight');
                break;

            case 'ArrowRight':
            case 'D':
            case 'd':
                turnRight();
                setLastAction('Turned right');
                break;

            case 'ArrowDown':
            case 's':
            case 'S':
                turnAround();
                setLastAction('Turned around');
                break;

            case 'ArrowLeft':
            case 'a':
            case 'A':
                turnLeft();
                setLastAction('Turned left');
                break;

            default:
                console.log('Unhandled key..');
                updateState = false;
                keyHandled = false;
                break;
        }

        if (updateState) {
            const newLocation = getLocation();
            // Update the react state in case we've moved or turned
            setOrientation(getOrientation());
            setLocation({ ...newLocation });
            setMoveCount(moveCount + 1);
        }

        if (keyHandled) {
            e.preventDefault(); // We don't need to propogate this keypress if we've handled it
        }
    };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Greetings, fellow travelers.  Please prepare for the Maze Game!!<br></br>
          Page load time: ${(new Date()).toISOString()}
          <p>
          Please focus (click) on the room view, and use the arrow keys or WASD to make your way through!
          </p>
        </p>
        <p>
            Location: x: {location.x}, y: {location.y}, heading: {orientation}<br></br>
            {lastAction ? `Your last action: ${lastAction}` : ''}
        </p>
        <p>
            Move count score (lower is better): {moveCount}<br></br>
        </p>
        <div tabIndex={1} id="gameContainer" onKeyDown={processKeys}>
            <canvas ref={canvas}></canvas>
            {/* <div {...ArrowKeysReact.events} tabIndex="1"></div> */}
        </div>
      </header>
    </div>
  );
}

export default App;
