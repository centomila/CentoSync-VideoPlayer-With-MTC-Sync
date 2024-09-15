
const FRAME_RATES = new Uint8Array([24, 25, 29.97, 30]);
const MTC_QUARTER_FRAME_MASK = 0xf;
const MTC_FULL_FRAME_MASK = 0xf0;

let mtcData = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    frames: 0,
    frameRate: 30,
};


let lastFrameTime = performance.now();
let quarterFrameCount = 0;

export function onMtcMessage(midiData: any) {
    const data = midiData.data[1];
    const msgType = data >> 4;
    const value = data & MTC_QUARTER_FRAME_MASK;

    const frameRate = FRAME_RATES[value >> 1];

    switch (msgType) {
        case 0:
            mtcData.frames = (mtcData.frames & MTC_FULL_FRAME_MASK) | value;
            break;
        case 1:
            mtcData.frames = (mtcData.frames & MTC_QUARTER_FRAME_MASK) | (value << 4);
            break;
        case 2:
            mtcData.seconds = (mtcData.seconds & MTC_FULL_FRAME_MASK) | value;
            break;
        case 3:
            mtcData.seconds =
                (mtcData.seconds & MTC_QUARTER_FRAME_MASK) | (value << 4);
            break;
        case 4:
            mtcData.minutes = (mtcData.minutes & MTC_FULL_FRAME_MASK) | value;
            break;
        case 5:
            mtcData.minutes =
                (mtcData.minutes & MTC_QUARTER_FRAME_MASK) | (value << 4);
            break;
        case 6:
            mtcData.hours = (mtcData.hours & MTC_FULL_FRAME_MASK) | value;
            break;
        case 7:
            mtcData.hours =
                (mtcData.hours & MTC_QUARTER_FRAME_MASK) | ((value & 0x1) << 4);
            mtcData.frameRate = frameRate;
            break;
    }

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
    const hours = padZero(mtcData.hours);
    const minutes = padZero(mtcData.minutes);
    const seconds = padZero(mtcData.seconds);
    const frames = padZero(mtcData.frames, 1);
    // const fps = padZero(getFps(), 2);
    // const totalFrames = getTotalFrames();
    // const audioTrackTime = getAudioTrackTime();
    // const audioTrackTimeDisplay = `${audioTrackTime[0]}:${audioTrackTime[1]}:${audioTrackTime[2]}.${padZero(
    //     audioTrackTime[3],
    //     3
    // )}`;

    console.log(`${hours}:${minutes}:${seconds}  ;  ${frames}`);
    // console.log(`FPS: ${fps}`);
    // console.log(`Total frames: ${totalFrames}`);
    // console.log(`Audio track time: ${audioTrackTimeDisplay}`);
}