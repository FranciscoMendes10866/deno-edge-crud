import { Router } from "oak";

import templateEngine from "../modules/templateEngine.ts";
import Book, { BookStatus } from "../models/Book.ts";

export const booksRouter = new Router();

/**
 * Views
 */

booksRouter.get("/", async (ctx) => {
  const books = await Book.all();

  const html = await templateEngine.render("home", { books });
  ctx.response.type = "text/html";
  ctx.response.body = html;
});

booksRouter.get("/book", async (ctx) => {
  const html = await templateEngine.render("create");
  ctx.response.type = "text/html";
  ctx.response.body = html;
});

booksRouter.get("/book/:id", async (ctx) => {
  const bookId = ctx.params.id;

  const book = await Book.where("id", bookId).first();

  const html = await templateEngine.render("details", { book });
  ctx.response.type = "text/html";
  ctx.response.body = html;
});

/**
 * Controllers
 */

booksRouter.post("/book/create", async (ctx) => {
  const body = ctx.request.body({ type: "form" });
  const value = await body.value;

  const data = Object.fromEntries(value);

  try {
    await Book.create(data);
    ctx.response.redirect("/");
  } catch (cause) {
    console.error(cause);
    ctx.response.redirect("/book");
  }
});

booksRouter.post("/book/:id", async (ctx) => {
  const bookId = ctx.params.id;
  const body = ctx.request.body({ type: "form" });
  const value = await body.value;

  const data = Object.fromEntries(value) as Partial<{
    title: string;
    description: string;
    status: BookStatus;
    _method: "put" | "delete";
  }>;

  switch (data._method) {
    case "put": {
      try {
        const { _method, ...rest } = data;
        await Book.where("id", bookId).update(rest);
        ctx.response.redirect("/");
        return;
      } catch (cause) {
        console.error(cause);
        ctx.response.redirect(`/book/${bookId}`);
      }
      return;
    }

    case "delete": {
      try {
        await Book.deleteById(bookId);
        ctx.response.redirect("/");
      } catch (cause) {
        console.error(cause);
        ctx.response.redirect(`/book/${bookId}`);
      }
      return;
    }

    default:
      ctx.response.redirect(`/book/${bookId}`);
      return;
  }
});
