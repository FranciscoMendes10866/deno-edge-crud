import { Application } from "oak";

import { booksRouter } from "./routes/books.ts";
import { db } from "./modules/db.ts";

const app = new Application({ logErrors: true });

app.use(booksRouter.routes());
app.use(booksRouter.allowedMethods());

await db.sync();
app.listen({ port: 3333 });
