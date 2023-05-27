const { Optimizer } = require("@parcel/plugin");
const { default: SourceMap } = require("@parcel/source-map/dist/node.js");
const { blobToBuffer } = require("@parcel/utils");

module.exports = new Optimizer({
  async optimize({ contents, map, options }) {
    let correctMap;
    if (map != null) {
      correctMap = new SourceMap(options.projectRoot);
      correctMap.addSourceMap(map, 2); // Offset lines by 2
    }
    return {
      contents: `"use client";\n\n` + (await blobToBuffer(contents)).toString(),
      map: correctMap,
    };
  },
});
