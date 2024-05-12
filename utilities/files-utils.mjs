import fs from 'fs'
import path from 'path'
import { writeFile } from 'fs/promises'

const writeFileSync = (folder, file, data) => {
    try {
        const filePath = path.join(__appdir, folder, file)
        fs.writeFileSync(filePath, data)
    } catch (error) {
        throw new Error(error.message)
    }
}

const writeFileAsync = async (folder, file, data) => {
    console.log(folder, file, data)
    try {
        const filePath = path.join(__appdir, folder, file)
        await writeFile(filePath, data)
    } catch (error) {
        // throw new Error(error.message)
    }
}

export { writeFileSync, writeFileAsync }
