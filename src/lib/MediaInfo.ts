import mediaInfoFactory from 'mediainfo.js';
import type { MediaInfo } from 'mediainfo.js';

export type MediaInfoFormat = 'object' | 'JSON' | 'XML' | 'HTML' | 'text';

export class MediaInfoHandler<T extends MediaInfoFormat = 'text'> {
	private mediaInfo: MediaInfo<T> | undefined;
	private format: T;

	constructor(format: T = 'text' as T) {
		this.format = format;
	}

	async init(): Promise<void> {
		try {
			this.mediaInfo = await mediaInfoFactory({ format: this.format });
		} catch (error: unknown) {
			console.error('Error initializing MediaInfo:', error);
		}
	}

	close(): void {
		if (this.mediaInfo) {
			this.mediaInfo.close();
		}
	}

	private makeFileReader(file: File) {
		return async (chunkSize: number, offset: number) => {
			return new Uint8Array(await file.slice(offset, offset + chunkSize).arrayBuffer());
		};
	}

	async analyzeFile(file: File): Promise<T extends 'object' ? Record<string, unknown> : string> {
		if (!this.mediaInfo) {
			throw new Error('MediaInfo not initialized');
		}

		try {
			const result = await this.mediaInfo.analyzeData(file.size, this.makeFileReader(file));
			return result as T extends 'object' ? Record<string, unknown> : string;
		} catch (error: unknown) {
			console.error('Error analyzing file:', error);
			return '' as T extends 'object' ? Record<string, unknown> : string;
		}
	}
}

export function createMediaInfoHandler<T extends MediaInfoFormat = 'text'>(
	format: T = 'text' as T
): MediaInfoHandler<T> {
	return new MediaInfoHandler<T>(format);
}
