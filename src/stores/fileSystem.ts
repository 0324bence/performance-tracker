import { FsBrowserSide } from "fs-browser-side";

const fs = new FsBrowserSide({ navigatorMode: true });
console.log("File system initiated");

export async function getFileSystemAccess() {
    await fs.getAccess(); // No user prompt needed
}

export default fs;
