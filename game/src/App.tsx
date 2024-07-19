import React, { useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { drawRoomsView, drawTestLines } from './roomView';

const WIDTH = 600;
const HEIGHT = 370;

function App() {
    const canvas = useRef<HTMLCanvasElement>(null);
    let ctx: CanvasRenderingContext2D | null = null;

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

        ctx = element.getContext('2d');
    }, []);

    useEffect(() => {
        // drawTestLines(ctx);
        drawRoomsView(ctx);
    }, [ctx]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Greetings, fellow travelers.  Please prepare for the Maze Game!!
        </p>
        <canvas ref={canvas}></canvas>
      </header>
    </div>
  );
}

export default App;
