export const combineSeedsToArray = currentSeed => currentSeed.split(' ').map(str => parseInt(str));

export const splitSeeds = ([a, b]) => `${a} ${b}`;
