import express from "express";
import session from "cookie-session";
import "dotenv/config";
import home from "./routes/home.js";
import produtos from "./routes/produtos.js";
import login from "./routes/login.js";
import produto from "./routes/produto.js";
import editar from "./routes/editar.js";
import contato from "./routes/contato.js";
import cors from "cors";

const port = process.env.port;
const secret = process.env.SECRET;
const app = express();

app.use(
  session({
    secret: secret,
    name: "sessionID",
    cookie: {
      httpOnly: true,
    },
  })
);

app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(cors());
app.use("/", home);
app.use("/produtos", produtos);
app.use("/login", login);
app.use("/produto/:id", (req, res, next) => {
  req.id = req.params.id;
  produto(req, res, next);
});
app.use("/editar/:id", (req, res, next) => {
  req.id = req.params.id;
  editar(req, res, next);
});
app.use("/contato", (req, res, next) => {
  contato(req, res, next);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default app;
