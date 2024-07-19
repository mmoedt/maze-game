#!/bin/bash

APP_URL="http://localhost:3000/index.html"

echo "Setting up environment..."
source ./my-env.sh
nvm install  # just in case; the env script doesn't install missing versions

(
    cd game
    [ -e env.sh ] && source ./env.sh
    echo "Building the project..."
    npm run build
) &

echo "Launching a chrome browser window in the background (5s delay)..."
(
    sleep 5
    google-chrome --profile-directory="Profile MazeGame" --new-window "${APP_URL}"
) > /dev/null 2>&1 &

echo "Starting up node server to host the app..."
(
    cd game
    # Running via npm will set up paths and such for us
    npm run serve
)

