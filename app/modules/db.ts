import { Database, SQLite3Connector } from "denodb";

import Book from "../models/Book.ts";

const connector = new SQLite3Connector({
  filepath: "dev.sqlite",
});

export const db = new Database(connector);

db.link([Book]);
