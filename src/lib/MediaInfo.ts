import mediaInfoFactory from 'mediainfo.js';
import type { MediaInfo, ReadChunkFunc } from 'mediainfo.js';

export class MediaInfoHandler {
    private mediaInfo: MediaInfo<'text'> | undefined;

    async init(): Promise<void> {
        try {
            this.mediaInfo = await mediaInfoFactory({ format: 'text' });
        } catch (error: unknown) {
            console.error('Error initializing MediaInfo:', error);
        }
    }

    close(): void {
        if (this.mediaInfo) {
            this.mediaInfo.close();
        }
    }

    makeFileReader(file: File): ReadChunkFunc {
        return async (chunkSize: number, offset: number) => {
            return new Uint8Array(await file.slice(offset, offset + chunkSize).arrayBuffer());
        };
    }

    async analyzeFile(file: File): Promise<string> {
        if (!this.mediaInfo) {
            throw new Error('MediaInfo not initialized');
        }

        try {
            return await this.mediaInfo.analyzeData(file.size, this.makeFileReader(file));
        } catch (error: unknown) {
            console.error('Error analyzing file:', error);
            return '';
        }
    }
}

export const createMediaInfoHandler = (): MediaInfoHandler => {
    return new MediaInfoHandler();
};