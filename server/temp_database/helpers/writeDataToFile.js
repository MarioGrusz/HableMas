import fs from 'fs';

const writeDataToFile = async (fileName, data) => {
    try {
        await fs.promises.writeFile(fileName, data, 'utf-8');
        //console.log('Successfully wrote messages to', fileName);
    } catch (error) {
        console.error('Error writing to file:', error);
    }
}

export default writeDataToFile