import ts from "typescript";

const transpile = (expression: string) =>
  ts.transpile(expression, {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
  });

export default transpile;
