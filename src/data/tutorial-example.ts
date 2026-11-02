export const FIRST_WEBSITE_FILES = {
  "index.html": `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>My first website</title>
    <link rel="icon" href="data:," />
    <link rel="stylesheet" href="/styles.css" />
    <script src="/script.js" defer></script>
  </head>
  <body>
    <main>
      <p class="eyebrow">Built by me</p>
      <h1>My first website is taking shape.</h1>
      <p>I am learning to build, save, and publish my own work.</p>
      <button id="hello-button" type="button">Say hello</button>
      <p id="message" role="status"></p>
    </main>
  </body>
</html>`,
  "styles.css": `* { box-sizing: border-box; }
body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem;
  background: #071a2d;
  color: #f7fbff;
  font-family: system-ui, sans-serif;
}
main { width: min(100%, 48rem); }
.eyebrow { color: #9bdfff; font-weight: 600; }
h1 { font-size: clamp(2.4rem, 7vw, 5rem); line-height: 1.05; }
p { max-width: 55ch; font-size: 1.1rem; line-height: 1.7; }
button {
  min-height: 48px;
  padding: 0.8rem 1.2rem;
  border: 0;
  border-radius: 8px;
  background: #9bdfff;
  color: #071a2d;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}
button:focus-visible { outline: 3px solid white; outline-offset: 4px; }
#message { min-height: 2rem; }`,
  "script.js": `const button = document.querySelector("#hello-button");
const message = document.querySelector("#message");

button.addEventListener("click", () => {
  message.textContent = "Hello! You made this page work.";
});`,
  "package.json": `{
  "name": "first-website",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "engines": { "node": "24.x" },
  "scripts": {
    "start": "node server.mjs"
  }
}`,
  "server.mjs": `import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

const files = new Map([
  ["/", ["index.html", "text/html; charset=utf-8"]],
  ["/index.html", ["index.html", "text/html; charset=utf-8"]],
  ["/styles.css", ["styles.css", "text/css; charset=utf-8"]],
  ["/script.js", ["script.js", "text/javascript; charset=utf-8"]],
]);
const port = Number(process.env.PORT || 3000);

createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end("Method not allowed");
    return;
  }
  const path = (request.url || "/").split("?")[0];
  const file = files.get(path);
  if (!file) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  try {
    const content = await readFile(new URL(file[0], import.meta.url));
    response.writeHead(200, { "Content-Type": file[1] });
    response.end(request.method === "HEAD" ? undefined : content);
  } catch (error) {
    console.error("Unable to read a website file:", error.message);
    response.writeHead(500);
    response.end("Unable to load this page");
  }
}).listen(port, "0.0.0.0", () => {
  console.log("Website listening on port " + port);
});`,
  ".gitignore": `node_modules/
.env
.env.*
!.env.example
.DS_Store
npm-debug.log*`,
} as const;
