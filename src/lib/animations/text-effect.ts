import { gsapProvider } from "./gsap";
const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" 

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
    hidden?: boolean;
    callbackFn: (text: string) => any;
}) {
    const size = text.length;
    const initial = text
    let memoizedText: string[] = []
    if(!hidden){
        memoizedText = [...initial];
    }
    const firstPassDuration = duration / 2;

    let y = 1;
        const initialIntervalId = setInterval(() => {
            if(!hidden){
                if (y >= size) {
                    clearInterval(initialIntervalId);
                    return
                }
                const randomCharacter = alphabets[Math.floor(Math.random() * alphabets.length)];
                memoizedText[y] = hidden ? ' ' : randomCharacter;
                callbackFn(memoizedText.join(''));
            }
            y++;
        }, firstPassDuration);
    
    let i = hidden ? 0 : 1;
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
