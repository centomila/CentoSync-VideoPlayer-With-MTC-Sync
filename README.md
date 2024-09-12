# MIDI Timecode Display

MIDI Timecode Display is a simple web application that shows the current MTC timecode from a selected MIDI port. It uses [express](https://expressjs.com/) as server and [webmidi](https://github.com/djipco/webmidi) to manage MIDI. It is written in vanilla JavaScript.

- [MIDI Timecode Display](#midi-timecode-display)
  - [Features](#features)
  - [Why this project exists](#why-this-project-exists)
  - [Installation](#installation)
  - [Usage](#usage)
  - [TODO](#todo)


## Features
* Shows the current MTC timecode from a selected MIDI port
* Uses performance.now, requestAnimationFrame and binary arrays to maximize performance
* Shows current timecode in hours, minutes, seconds and frames (HH:MM:SS:FF)
* Shows DAW style audio track time in hours, minutes, seconds (HH:MM:SSS)
* Shows MTC frame rate in FPS
* Shows elapsed frames from the start of the MTC

## Why this project exists
* I'm learning the ins and outs of webmidi.js.
* My DAW of choice doesn't support natively video and this is one step to code a solution. Follow me on GitHub to see when it's ready 😉

## Installation

You can install MTC Timecode using npm:

```bash
npm install
```

## Usage

```bash
npm start
```

After you have started the server:

* Go to http://localhost:3000 in your browser.
* Allow MIDI access in your browser.
* Select a MIDI port in the dropdown menu.
* Send MTC messages to the selected port.

## TODO
* [ ] Remember the last selected MIDI port
