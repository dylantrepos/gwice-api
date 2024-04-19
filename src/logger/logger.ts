import chalk from "chalk";
import { Request } from "express";
import morgan from "morgan";

export const morganMiddleware = morgan(function (tokens, req, res) {
  return (
    [
      "---------------\n",
      chalk.hex("#fff").bold(`[${tokens.method(req, res)}]`),
      chalk.hex("#ffb142")(tokens.status(req, res)),
      chalk.hex("#381bd2")(tokens.url(req, res)),
      ,
    ].join(" ") +
    `\n ${chalk.hex("#fff")("Query:")} { ${Object.entries(
      (req as Request).query
    )
      .map(([key, value]) => `${chalk.hex("#34ace0").bold(key)}: ${value}`)
      .join(", ")} } `
  );
});
