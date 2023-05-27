#!/usr/bin/env node

const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const packageString = readFileSync(join(__dirname, "package.json"), "utf8");
const packageJSON = JSON.parse(packageString);

[packageJSON.main, packageJSON.module].forEach((distPath) => {
  const path = join(__dirname, distPath);
  const bundleText = readFileSync(path, "utf8");
  writeFileSync(path, `"use client";\n\n${bundleText}`);
});
