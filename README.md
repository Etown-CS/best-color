# best-color
A website that presents users with 2 colors in UI contexts and asks them to pick one. It collects this data with the user's browser, os, etc.

<img width="2360" height="1307" alt="image" src="https://github.com/user-attachments/assets/b4da6343-920b-46e9-8e3c-17c6130851f9" />


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
