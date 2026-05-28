#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import process from 'process';

const DEFAULT_INPUT_DIR = path.join(process.cwd(), 'apps', 'web', 'public', 'images');
const DEFAULT_FORMATS = ['webp'];
const DEFAULT_QUALITY = 80;

function parseArgs(argv) {
  const options = {
    input: DEFAULT_INPUT_DIR,
    formats: DEFAULT_FORMATS,
    quality: DEFAULT_QUALITY,
    overwrite: false,
    dryRun: false,
    verbose: false,
  };

  for (const arg of argv) {
    if (arg === '--help' || arg === '-h') {
      options.help = true;
      continue;
    }

    if (arg === '--dry-run') {
      options.dryRun = true;
      continue;
    }

    if (arg === '--overwrite') {
      options.overwrite = true;
      continue;
    }

    if (arg === '--verbose') {
      options.verbose = true;
      continue;
    }

    if (arg.startsWith('--input=')) {
      options.input = path.resolve(arg.split('=', 2)[1]);
      continue;
    }

    if (arg.startsWith('--formats=')) {
      options.formats = arg
        .split('=', 2)[1]
        .split(',')
        .map((format) => format.trim().toLowerCase())
        .filter(Boolean);
      continue;
    }

    if (arg.startsWith('--quality=')) {
      const quality = Number(arg.split('=', 2)[1]);
      if (!Number.isNaN(quality) && quality >= 1 && quality <= 100) {
        options.quality = quality;
      }
      continue;
    }

    console.warn(`Unknown option: ${arg}`);
  }

  return options;
}

function printHelp() {
  console.log(`convert-images.mjs

Recursively converts PNG/JPEG images under a source folder into modern raster formats.

Usage:
  node convert-images.mjs [options]

Options:
  --input=<dir>       Source image folder (default: apps/web/public/images)
  --formats=<list>    Comma-separated output formats, e.g. webp,avif (default: webp)
  --quality=<number>  Output quality for lossy formats (1-100, default: 80)
  --overwrite         Replace existing converted files when present
  --dry-run           Show what would be converted without writing files
  --verbose           Log each conversion step
  --help, -h          Show this help message
`);
}

async function walkDir(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await walkDir(fullPath)));
    } else if (entry.isFile()) {
      results.push(fullPath);
    }
  }

  return results;
}

function formatToSharpOptions(format, quality) {
  switch (format) {
    case 'webp':
      return { quality };
    case 'avif':
      return { quality };
    case 'jpeg':
    case 'jpg':
      return { quality };
    default:
      return { quality };
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    printHelp();
    process.exit(0);
  }

  const inputDir = options.input;
  const formats = options.formats.length > 0 ? options.formats : DEFAULT_FORMATS;

  const supportedInputExtensions = new Set(['.png', '.jpg', '.jpeg']);

  let sharp;
  try {
    sharp = await import('sharp');
  } catch (error) {
    console.error('`sharp` is required to run this script.');
    console.error('Install it with `pnpm add -D sharp` or `npm install -D sharp` and try again.');
    process.exit(1);
  }

  let files;
  try {
    files = await walkDir(inputDir);
  } catch (error) {
    console.error(`Failed to read input directory: ${inputDir}`);
    console.error(error.message);
    process.exit(1);
  }

  const imageFiles = files.filter((file) =>
    supportedInputExtensions.has(path.extname(file).toLowerCase()),
  );

  if (imageFiles.length === 0) {
    console.log(`No PNG/JPEG files found in ${inputDir}.`);
    process.exit(0);
  }

  console.log(`Converting ${imageFiles.length} image(s) from ${inputDir}`);
  if (options.dryRun) {
    console.log('Dry run mode enabled. No files will be written.');
  }

  for (const file of imageFiles) {
    const ext = path.extname(file).toLowerCase();
    const name = path.basename(file, ext);
    const dir = path.dirname(file);

    for (const format of formats) {
      const outputExt = format === 'jpg' ? 'jpeg' : format;
      const outputPath = path.join(dir, `${name}.${outputExt}`);

      if (!options.overwrite) {
        try {
          await fs.access(outputPath);
          if (options.verbose || options.dryRun) {
            console.log(`Skipping existing file: ${outputPath}`);
          }
          continue;
        } catch {
          // output does not exist, continue
        }
      }

      const convertPath = async () => {
        const transformer = sharp.default ? sharp.default(file) : sharp(file);
        const opts = formatToSharpOptions(format, options.quality);

        if (format === 'webp') {
          return transformer.webp(opts).toFile(outputPath);
        }

        if (format === 'avif') {
          return transformer.avif(opts).toFile(outputPath);
        }

        if (format === 'jpeg' || format === 'jpg') {
          return transformer.jpeg(opts).toFile(outputPath);
        }

        throw new Error(`Unsupported output format: ${format}`);
      };

      if (options.dryRun) {
        console.log(`[dry-run] ${file} -> ${outputPath}`);
      } else {
        if (options.verbose) {
          console.log(`Converting ${file} -> ${outputPath}`);
        }
        try {
          await convertPath();
        } catch (error) {
          console.error(`Failed to convert ${file} to ${outputPath}: ${error.message}`);
        }
      }
    }
  }

  console.log('Done.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
