import express from "express";
import appRoute from "./routes/route.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use("/api", appRoute);

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
