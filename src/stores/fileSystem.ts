import { FsBrowserSide } from "fs-browser-side";

const fs = new FsBrowserSide({ navigatorMode: true });
await fs.getAccess(); // No user prompt needed
console.log("File system initiated");

export default fs;
