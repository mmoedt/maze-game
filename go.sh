#!/bin/bash

APP_URL="http://localhost:3000/index.html"

echo "Setting up environment..."
source ./my-env.sh
nvm install  # just in case; the env script doesn't install missing versions

(
    cd game
    [ -e env.sh ] && source ./env.sh
    echo "Building the project..."
    npm run clean
    npm run build
) &

echo "Launching a chrome browser window in the background (15s delay)..." &&
(
    sleep 15
    if [ -e "build/index.html" ]; then
        google-chrome --profile-directory="Profile MazeGame" --new-window "${APP_URL}"
    else
        echo "Build failure; not opening the browser.."
    fi
) &

echo "Starting up node server to host the app..." &&
(
    cd game
    if [ -e "build/index.html" ]; then
        # Running via npm will set up paths and such for us
        npm run serve
    else
        echo "Build failure; not starting local server.."
    fi
) &&

echo "done!"

