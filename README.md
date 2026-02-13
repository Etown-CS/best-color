# best-color

A website that presents users with 2 colors in UI contexts and asks them to pick one. It collects this data with the user's browser, os, etc.

<img width="2654" height="1540" alt="image" src="https://github.com/user-attachments/assets/db812f42-b8fd-4615-affc-acf540caf4b4" />

You can find a preview build running on Vercel at [best-color.vercel.app](https://best-color.vercel.app)

# setup

To run the app locally, ensure you have docker installed and a docker daemon running. The commands below use Bun, but NPM, PNPM, and Yarn all work.

```bash
# install dependencies
bun i
# Start the database
bun run db:start
# Push the schema to the database
bun run db:push
# Start a dev server
bun run dev --open
```
