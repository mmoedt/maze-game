#!/bin/bash

echo "Setting up environment..."
source ./my-env.sh
nvm install  # just in case; the env script doesn't install missing versions

echo "Building the project..."
npm run build

echo "Launching the project in a chrome browser window..."
google-chrome --profile-directory="Profile Maze-Game" --new-window "${PWD}/dist/index.html"

