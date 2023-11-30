import fs from 'fs';

const readDataFromFile = async (fileName) => {
    try {
        const data = await fs.promises.readFile(fileName, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
}

export default readDataFromFile