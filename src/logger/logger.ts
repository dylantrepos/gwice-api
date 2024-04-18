// export const loggerFormat = logger(function (tokens, req, res) {
//   return `
// [${chalk
//     .hex("#34ace0")
//     .bold(
//       tokens.method(req, res)
//     )}] ${chalk.hex("#ff5252").bold(tokens.url(req, res))}
//     STATUS ${chalk.hex("#ffb142")(tokens.status(req, res))}
//     QUERY ${chalk.hex("#fffa65")(JSON.stringify((req as Request).query))}
//     INFO ${chalk.hex("#2ed573")(tokens["response-time"](req, res) + " ms")}
//     FROM ${
//       (chalk.hex("#fffa65")("from " + tokens.referrer(req, res)),
//       chalk.hex("#1e90ff")(tokens["user-agent"](req, res)))
//     }
//       `;
// });
