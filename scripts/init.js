#! /usr/bin/env node

//@ts-check
const { spawnSync } = require("child_process");
const { createInterface } = require("node:readline/promises");
const { stdin, stdout } = require("process");

const fs = require("fs");
const path = require("path");

const rootPath = path.join(__dirname, "../");

const toRootPath = process.env.PWD ?? "";

const files = [
  ".vscode",
  "src",
  ".eslintrc.cjs",
  ".prettierrc.cjs",
  "tsconfig.json",
  "tsup.config.ts",
  "vitest.config.ts",
];

async function run() {
  const rl = createInterface({ input: stdin, output: stdout });
  const packageName =
    (await rl.question("package name: (ts-node-starter)")) || "ts-node-starter";

  try {
    const toFolderPath = path.join(toRootPath, packageName);
    if (fs.existsSync(toFolderPath)) {
      throw new Error("folder already exists");
    }
    fs.mkdirSync(toFolderPath);
    console.log(colorGreen("folder created"));
    generatePackageJson(packageName, toFolderPath);
    console.log(colorGreen("package.json generated"));
    generateFiles(packageName);
    console.log(colorGreen("files generated"));
    process.exit(0);
  } catch (e) {
    console.error(colorRed(e.message));
    process.exit(1);
  }
}

function generatePackageJson(name, toFolderPath) {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(rootPath, "template/package.json"), {
      encoding: "utf-8",
    }),
  );
  packageJson.name = name;
  fs.writeFileSync(
    path.join(toFolderPath, "package.json"),
    JSON.stringify(packageJson, null, 2),
  );
}

function generateFiles(toFolderPath) {
  files.forEach((fileOrFolder) => {
    fs.cpSync(
      path.join(rootPath, fileOrFolder),
      path.join(toFolderPath, fileOrFolder),
      { recursive: true, errorOnExist: true },
    );
  });
}

function colorRed(string) {
  return `\x1b[31m ${string}\x1b[0m`;
}

function colorGreen(string) {
  return `\x1b[32m ${string}\x1b[0m`;
}

run();
