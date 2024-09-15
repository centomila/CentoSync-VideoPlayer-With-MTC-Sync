import { mtcData } from '../lib/stores';  // Import the store

const FRAME_RATES = new Uint8Array([24, 25, 29.97, 30]);
const MTC_QUARTER_FRAME_MASK = 0xf;
const MTC_FULL_FRAME_MASK = 0xf0;

let lastFrameTime = performance.now();
let quarterFrameCount = 0;

export function onMtcMessage(midiData: any) {
    const data = midiData.data[1];
    const msgType = data >> 4;
    const value = data & MTC_QUARTER_FRAME_MASK;

    const frameRate = FRAME_RATES[value >> 1];

    mtcData.update(currentData => {
        let newData = { ...currentData };

        switch (msgType) {
            case 0:
                newData.frames = (newData.frames & MTC_FULL_FRAME_MASK) | value;
                break;
            case 1:
                newData.frames = (newData.frames & MTC_QUARTER_FRAME_MASK) | (value << 4);
                break;
            case 2:
                newData.seconds = (newData.seconds & MTC_FULL_FRAME_MASK) | value;
                break;
            case 3:
                newData.seconds = (newData.seconds & MTC_QUARTER_FRAME_MASK) | (value << 4);
                break;
            case 4:
                newData.minutes = (newData.minutes & MTC_FULL_FRAME_MASK) | value;
                break;
            case 5:
                newData.minutes = (newData.minutes & MTC_QUARTER_FRAME_MASK) | (value << 4);
                break;
            case 6:
                newData.hours = (newData.hours & MTC_FULL_FRAME_MASK) | value;
                break;
            case 7:
                newData.hours = (newData.hours & MTC_QUARTER_FRAME_MASK) | ((value & 0x1) << 4);
                newData.frameRate = frameRate;
                break;
        }

        return newData;
    });

    const currentTime = performance.now();
    const frameTime = currentTime - lastFrameTime;
    const expectedFrameTime = (1 / frameRate) * 2; // Two frames worth of time

    lastFrameTime = currentTime;
    quarterFrameCount = 0;
    requestAnimationFrame(updateTimecodeDisplay);

    if (frameTime < expectedFrameTime) {
        // Wait until the next frame
        setTimeout(() => {
            requestAnimationFrame(updateTimecodeDisplay);
        }, expectedFrameTime - frameTime);
    }
}

function padZero(num: number, length = 3) {
    return num.toString().padStart(length, '0');
}

function updateTimecodeDisplay() {
    mtcData.subscribe(data => {
        const hours = padZero(data.hours);
        const minutes = padZero(data.minutes);
        const seconds = padZero(data.seconds);
        const frames = padZero(data.frames, 1);

        console.log(`${hours}:${minutes}:${seconds}  ;  ${frames}`);
    })();
}