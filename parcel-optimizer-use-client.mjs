import { Optimizer } from "@parcel/plugin";
import sourceMapModule from "@parcel/source-map";
import utilsModule from "@parcel/utils";

const SourceMap = sourceMapModule.default;
const blobToBuffer = utilsModule.blobToBuffer;

export default new Optimizer({
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
