import { gsapProvider } from "./gsap";
const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" 

function memoize<T extends (...args: any[]) => any>(fn: T): T {
    const cache = new Map<string, ReturnType<T>>();
    return ((...args: Parameters<T>): ReturnType<T> => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key) as ReturnType<T>;
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    }) as T;
}

export async function textGlitch({
    text,
    duration = 25,
    glitch = 3,
    hidden = false,
    callbackFn
}: {
    text: string;
    duration?: number;
    glitch: number;
    hidden: boolean;
    callbackFn: (text: string) => any;
}) {
    const size = text.length;
    const initial = text
    let memoizedText = [...initial];

    const firstPassDuration = duration / 2;

    let y = 1;
    const initialIntervalId = setInterval(() => {
        if (y >= size) {
            clearInterval(initialIntervalId);
            return
        }

        const randomCharacter = alphabets[Math.floor(Math.random() * alphabets.length)];
        memoizedText[y] = hidden ? ' ' : randomCharacter;
        callbackFn(memoizedText.join(''));
        y++;
    }, firstPassDuration);

    let i = 1;
    let j = 0;

    const intervalId = setInterval(() => {
        if (i >= size) {
            clearInterval(intervalId);
            return;
        }

        if (y > i) {
            const randomCharacter = alphabets[Math.floor(Math.random() * alphabets.length)];
            memoizedText[i] = (j === glitch - 1) ? initial[i] : randomCharacter;
            callbackFn(memoizedText.join(''));

            j++;
            if (j >= glitch) {
                j = 0;
                i++;
            }
        }
    }, duration);
}

export const createTextGlitchMemoized = memoize(textGlitch);