const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();

const IMAGE_DIR = path.join(projectRoot, "apps/web/public/images");

const SOURCE_EXTENSIONS = new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".css",
  ".scss",
  ".sass",
  ".json",
  ".md",
  ".mdx",
]);

const IGNORE_DIRS = new Set([
  "node_modules",
  ".git",
  ".next",
  "dist",
  "build",
  "coverage",
  "out",
]);

const usedImages = new Set();

function walk(dir) {
  let results = [];

  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);

    let stat;

    try {
      stat = fs.statSync(fullPath);
    } catch {
      continue;
    }

    if (stat.isDirectory()) {
      if (IGNORE_DIRS.has(file)) continue;

      results = results.concat(walk(fullPath));
    } else {
      results.push(fullPath);
    }
  }

  return results;
}

function normalize(p) {
  return p.replace(/\\/g, "/");
}

console.log("Scanning project files...");

const allFiles = walk(projectRoot);

console.log(`Found ${allFiles.length} files`);

for (const file of allFiles) {
  const ext = path.extname(file).toLowerCase();

  if (!SOURCE_EXTENSIONS.has(ext)) continue;

  let content = "";

  try {
    content = fs.readFileSync(file, "utf8");
  } catch {
    continue;
  }

  const regex =
    /\/images\/[^"'`\s)]+?\.(png|jpg|jpeg|svg|webp|gif|avif)/gi;

  const matches = content.match(regex);

  if (!matches) continue;

  for (const match of matches) {
    usedImages.add(normalize(match));
  }
}

console.log("Scanning image directory...");

const imageFiles = walk(IMAGE_DIR);

const allImages = imageFiles.map((file) => {
  const relative = normalize(file.replace(IMAGE_DIR, ""));
  return "/images" + relative;
});

const unused = allImages.filter(
  (img) => !usedImages.has(img)
);

console.log("\n=== POSSIBLY UNUSED IMAGES ===\n");

unused.sort().forEach((img) => {
  console.log(img);
});

console.log("\n=== SUMMARY ===");
console.log(`Used Images: ${usedImages.size}`);
console.log(`Total Images: ${allImages.length}`);
console.log(`Possibly Unused: ${unused.length}`);