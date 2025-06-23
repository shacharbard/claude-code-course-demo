#!/bin/bash

# Try different Chrome/Chromium commands
CHROME_CMD=""
if command -v google-chrome >/dev/null 2>&1; then
    CHROME_CMD="google-chrome"
elif command -v google-chrome-stable >/dev/null 2>&1; then
    CHROME_CMD="google-chrome-stable"
elif command -v chromium-browser >/dev/null 2>&1; then
    CHROME_CMD="chromium-browser"
elif command -v chromium >/dev/null 2>&1; then
    CHROME_CMD="chromium"
else
    echo "Error: No Chrome or Chromium browser found"
    echo "Please install Chrome or Chromium:"
    echo "  sudo apt update && sudo apt install chromium-browser"
    echo "  # or"
    echo "  wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -"
    echo "  echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | sudo tee /etc/apt/sources.list.d/google-chrome.list"
    echo "  sudo apt update && sudo apt install google-chrome-stable"
    exit 1
fi

$CHROME_CMD \
  --remote-debugging-port=9222 \
  --disable-web-security \
  --disable-features=VizDisplayCompositor \
  --user-data-dir=/tmp/chrome-dev-session \
  --new-window \
  "$@"