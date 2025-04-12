const fs = require("fs").promises;
const path = require("path");

async function addRepo(filePath){
    const repoPath = path.resolve(process.cwd(), ".gits");
    const stagingPath = path.join(repoPath, "staging");

    try {
        await fs.mkdir(stagingPath, { recursive: true });
        const fileName = path.basename(filePath);
        await fs.copyFile(filePath, path.join(stagingPath, fileName));
        console.log(`file ${fileName} added to the staging area`);
    } catch (error) {
        console.error("error adding the repo", error);
    }
}

module.exports = {addRepo};