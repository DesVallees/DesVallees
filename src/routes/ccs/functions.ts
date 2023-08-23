export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function throttle(func: () => void, limit: number): () => void {
    let lastCallTime = 0;
    return function() {
        const now = Date.now();
        if (now - lastCallTime >= limit) {
            func();
            lastCallTime = now;
        }
    }
}