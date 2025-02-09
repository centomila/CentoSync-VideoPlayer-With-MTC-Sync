# CentoSync

CentoSync is a web application that synchronizes video playback with Digital Audio Workstations (DAWs) using MIDI Time Code (MTC) or MIDI Clock with Song Position Pointer (SPP).

CentoSync has been tested with:

- Bitwig Studio 5.2
  - MTC
  - SPP
- Reason Studio 12
  - SPP
- FL Studio 2024
  - MTC with CentoSync's Alternative Start/Stop checkbox enabled
- WaveForm Tracktion
  - MTC with CentoSync's Alternative Start/Stop checkbox enabled
- Ableton Live 10 Suite
  - MTC with LiveMTC Max Plugin
  - SPP
- Ableton Live 12 Lite
  - SPP
- NI Maschine 2
  - SPP

Other DAWs, and new/previous versions of the listed DAWs should works fine as well.

MTC is the default and recommended mode.

## The Web App

The compiled web app is available for everyone to use for free. No cookies, no ads! 🥳

👉👉👉[https://centosync.centomila.com](https://centosync.centomila.com).👈👈👈

Check the interactive help documentation directly in the app.

Have fun!

## Features

- Synchronizes video player seek time with DAWs
- Supports both MIDI Timecode (MTC) and Song Position Pointer (SPP)
- User-friendly interface
- Video offset
- Embedded manual
- Picture in Picture (Use browser control)
- Dark mode and multiple themes
- Save settings to local storage
- Detailed video info

## Limitations

- CentoSync doesn't work on mobile devices. Only desktop browsers are supported.
- In SPP Mode, synchronization is limited to the first 1024 bars (approximately 30 minutes at 120 BPM). This is due to a limitation in the MIDI protocol.

## Technologies Used

- [Svelte](https://svelte.dev/)
- [SvelteKit](https://kit.svelte.dev/)
- [Vite](https://vite.dev/)
- [Skeleton](https://www.skeleton.dev/)
- [WebMidi.js](https://webmidijs.org/)
- [Video.js](https://videojs.com/)
- [MediaInfo](https://mediainfo.js.org/)

## Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open [http://localhost:5173](http://localhost:5173) in your browser
3. Allow MIDI access when prompted
4. Select a MIDI port from the dropdown menu
5. Send MTC messages to the selected port

For detailed instructions, please refer to the Help menu within the application.

## Contributing

Testers and contributions are welcome! Please see the [Contributing Guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the [MIT License](LICENSE.md).

## Support

For questions or issues, please [open an issue](https://github.com/centomila/CentoSync-VideoPlayer-With-MTC-Sync/issues) on GitHub.

### Support My Work

If you find CentoSync useful, consider supporting me on [Patreon](https://patreon.com/Centomila)! If it's not within your budget, no worries at all—your support in any form is already more than enough.
