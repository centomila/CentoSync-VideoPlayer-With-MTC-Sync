# MIDI Timecode Display

## Online version

A compiled version of this project can be found [here](https://centosync.centomila.com).

## Description

MIDI Timecode Display is a simple web application that shows the current MTC timecode from a selected MIDI port. It uses [express](https://expressjs.com/) as server and [webmidi](https://github.com/djipco/webmidi) to manage MIDI. It is written in vanilla JavaScript.

- [MIDI Timecode Display](#midi-timecode-display)
  - [Online version](#online-version)
  - [Description](#description)
  - [Features](#features)
  - [Why this project exists](#why-this-project-exists)
  - [Installation](#installation)
  - [Usage](#usage)

## Features

- Shows the current MTC timecode from a selected MIDI port
- Shows current timecode in hours, minutes, seconds and frames (HH:MM:SS:FF)
- Shows DAW style audio track time in hours, minutes, seconds (HH:MM:SSS) (MS are estimated from frames)
- Shows MTC frame rate in FPS
- Shows elapsed frames from the start of the MTC
- Easily hide the GUI when is not needed
- Load the video from a local file (muted by default)
- Multiple themes to find inspiration when composition

## Why this project exists

- I'm learning the ins and outs of webmidi.js.
- My DAW of choice doesn't support natively video and this is one step to code an alternative solution to the existing ones. Follow me on GitHub to see when it's ready 😉

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

- Go to http://localhost:3000 in your browser.
- Allow MIDI access in your browser.
- Select a MIDI port in the dropdown menu.
- Send MTC messages to the selected port.
