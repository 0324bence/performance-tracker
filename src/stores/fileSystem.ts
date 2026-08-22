import { FsBrowserSide } from "fs-browser-side";

const fs = new FsBrowserSide({ navigatorMode: true });
console.log("File system initiated");

export async function getFileSystemAccess() {
    await fs.getAccess(); // No user prompt needed
}

export async function createCategory(categoryName: string) {
    const categories = await getCategories();
    if (categories.includes(categoryName)) {
        await createCategory(`${categoryName} (${categories.filter(c => c.startsWith(categoryName)).length})`);
        return;
    }
    const categoryPath = `/${categoryName}`;
    await fs.mkdir(categoryPath);
    await fs.writeFileText(`${categoryPath}/tasks.json`, JSON.stringify([]));
}

export async function getCategories() {
    const categories = (await fs.readdir("/")).map(entry => entry.name);
    return categories;
}

export async function resetStorage() {
    for (const entry of await fs.readdir("/")) {
        await fs.rm(`/${entry.name}`, { recursive: true });
    }
}

export async function printFileSystemStructure() {
    console.log(await fs.readdir("/"));
    for await (const entry of fs.readdirRecursive("/")) {
        console.log(entry.type, entry.path);
    }
}

export default {
    getFileSystemAccess,
    createCategory,
    getCategories,
    resetStorage,
    printFileSystemStructure,
    fs
};
