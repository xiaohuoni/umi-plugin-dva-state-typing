import { IApi } from "umi";
import { winPath } from "@umijs/utils";
import { extname } from "path";

export default (api: IApi) => {
  api.onGenerateFiles(() => {
    const models = api.appData.pluginDva.models;

    // types.ts
    api.writeTmpFile({
      path: "types.d.ts",
      tpl: `
${
  models && models.length > 0
    ? models
        .map((model: { file: string; namespace: string }) => {
          const { file, namespace } = model;
          // prettier-ignore
          // export type { IndexModelState } from '/Users/xiaohuoni/next-alita-app/src/models/index';
          return `export type { ${namespace.replace(/( |^)[a-z]/g, (L) => L.toUpperCase())}ModelState } from '${winPath(file.replace(extname(file), ''))}';`;
        })
        .join("\r\n")
    : ""
}
      `,
      context: {},
    });
  });
};
