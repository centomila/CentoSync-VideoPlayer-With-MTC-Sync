import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/public/index.html");
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
