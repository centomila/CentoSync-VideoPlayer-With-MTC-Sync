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
			this.mediaInfo = await mediaInfoFactory({
				format: this.format,
				locateFile: (path: string, prefix: string) => {
					if (path.endsWith('.wasm')) {
						// Use the base path from SvelteKit
						return `${import.meta.env.BASE_URL}${path}`;
					}
					return prefix + path;
				}
			});
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
			const r = new Uint8Array(await file.slice(offset, offset + chunkSize).arrayBuffer());
			return r;
		};
	}

	async analyzeFile(file: File): Promise<T extends 'object' ? Record<string, unknown> : string> {
		if (!this.mediaInfo) {
			await this.init();
			if (!this.mediaInfo) {
				throw new Error('MediaInfo not initialized');
			}
		}

		try {
			if (file.size === 0) {
				throw new Error(`File size is 0`);
			}

			const result = await this.mediaInfo.analyzeData(file.size, this.makeFileReader(file));
			if (result === null) {
				throw new Error(`MediaInfo returned null`);
			}
			console.log(result);
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
