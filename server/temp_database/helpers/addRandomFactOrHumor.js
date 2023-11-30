import { getRandomFactsAboutSpain, giveSomeHumor } from '../prompts.js';

const addRandomFactOrHumor = (learn_instruction) => {
    const x = Math.floor(Math.random() * 2);
    if (x < 0.5) {
        learn_instruction["content"] = learn_instruction["content"] + getRandomFactsAboutSpain;
    } else {
        learn_instruction["content"] = learn_instruction["content"] + giveSomeHumor;
    }
}

export default addRandomFactOrHumor