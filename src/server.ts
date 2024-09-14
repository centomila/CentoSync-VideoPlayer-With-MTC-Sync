import express, { Request, Response } from "express";
import { WebMidi } from "webmidi";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/public/index.html");
});

WebMidi
  .enable()
  .then(() => {
    console.log("WebMIDI enabled");

    const inputs = WebMidi.inputs;
    inputs.forEach((input) => {
      console.log(`Input device: ${input.name}`);
    });

    const output = WebMidi.outputs[0];
    if (output) {
      output.sendActiveSensing();
    }
  })
  .catch((err: Error) => {
    console.error("WebMIDI could not be enabled:", err);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
