import { writable } from 'svelte/store';
import type Player from 'video.js/dist/types/player';

function createVideoPlayerStore() {
    const { subscribe, set, update } = writable<Player | null>(null);

    return {
        subscribe,
        setPlayer: (player: Player) => set(player),
        play: () => update(player => {
            player?.play();
            return player;
        }),
        pause: () => update(player => {
            player?.pause();
            return player;
        }),
        seek: (time: number) => update(player => {
            if (player) {
                player.currentTime(time);
            }
            return player;
        })
    };
}

export const videoPlayerStore = createVideoPlayerStore();