import fs from "fs";
import path from "path";

export async function getPortfolioData() {
    // Configured to look in 'public/data' as requested for the external build
    const filePath = path.join(process.cwd(), "public", "data", "portfolio-data.json");
    const jsonData = await fs.promises.readFile(filePath, "utf-8");
    return JSON.parse(jsonData);
}
