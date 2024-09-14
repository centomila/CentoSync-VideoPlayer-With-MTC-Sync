import {WebMidi, Input} from "webmidi";

window.addEventListener("DOMContentLoaded", () => {
  WebMidi.enable({
    callback: (err: Error | null) => {
      if (err) {
        console.error("WebMIDI could not be enabled:", err);
        return;
      }

      console.log("WebMIDI enabled");

      const inputs = WebMidi.inputs;
      inputs.forEach((input: Input) => {
        console.log(`Input device: ${input.name}`);
      });

      const output = WebMidi.outputs[0];
      if (output) {
        output.sendActiveSensing();
      }
    }
  });
});
