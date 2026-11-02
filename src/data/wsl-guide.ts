import type { BlogPost } from "@/data/blog";

export const WSL_DEMO_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My WSL Project</title>
    <link rel="icon" href="data:,">
  </head>
  <body>
    <h1>Coding in Linux with VS Code</h1>
    <p>This project is running inside Ubuntu on WSL.</p>
  </body>
</html>`;

export const WSL_GUIDE: BlogPost = {
  slug: "install-wsl-vscode-linux",
  title: "How to Install WSL and Code in a Linux Environment With VS Code",
  category: "Learn to code",
  excerpt: "Keep Windows as your desktop while using Ubuntu for development. Install WSL 2, connect VS Code, and run your first Linux-based website preview.",
  publishedAt: "2026-10-30",
  image: "/blog/wsl-vscode.svg",
  imageAlt: "Windows desktop, an Ubuntu WSL 2 workspace, and VS Code connected to Linux development tools",
  intro: "You can keep Windows as your desktop while using Linux for development. Windows Subsystem for Linux, or WSL, lets you install a Linux distribution alongside your Windows applications. This guide uses Windows 11, WSL 2, and Ubuntu, with the VS Code interface on Windows and your project files and development tools inside Linux.",
  tutorial: {
    label: "Windows setup guide · WSL 2 + Ubuntu",
    level: "Beginner · Windows 11",
    checkedAt: "2026-10-30",
    outcomes: ["Install Ubuntu with WSL 2 and confirm which version is running.", "Open a Linux project in a WSL-connected VS Code window.", "Run a local website inside Ubuntu and preview it in your Windows browser."],
    prerequisites: ["A Windows 11 PC with administrator access for installation and hardware virtualization available.", "Permission to install WSL and development tools on the computer; managed workplace devices may need administrator help.", "A new practice folder. If you already use WSL, check your existing distributions instead of reinstalling them."],
  },
  sections: [
    {
      id: "why-use-wsl",
      title: "Why use WSL for coding?",
      paragraphs: ["WSL 2 runs a Linux kernel inside a lightweight, managed virtual machine. Combined with VS Code, it gives you a familiar editor with Linux terminals, tools, and project files. For projects that run on Linux servers, this can reduce differences between your development and deployment environments.", "It is not a guarantee that local and production environments are identical. Runtime versions, configuration, services, and hosting settings still matter. The advantage is being able to work with the same kinds of tools and filesystem behavior earlier in the process."],
      table: {
        caption: "Benefits of developing with VS Code in WSL",
        headers: ["Benefit", "What it means in practice"],
        rows: [
          { label: "Linux tools", detail: "Run Bash scripts and Linux command-line utilities directly." },
          { label: "Similar development environment", detail: "Catch Linux-specific path, permission, and dependency problems earlier." },
          { label: "Case-sensitive filenames", detail: "Discover mistakes such as importing Header.tsx as header.tsx when working in the Linux filesystem." },
          { label: "Separate tool installations", detail: "Install Linux development tools separately from their Windows counterparts." },
          { label: "Windows convenience", detail: "Continue using Windows applications while your development tools run in Linux." },
        ],
      },
      resources: [{ label: "Microsoft: how WSL 2 works", href: "https://learn.microsoft.com/en-us/windows/wsl/compare-versions" }, { label: "Microsoft: filesystems and case sensitivity", href: "https://learn.microsoft.com/en-us/windows/wsl/filesystems" }],
    },
    {
      id: "which-terminal",
      title: "Know which terminal each command belongs in.",
      paragraphs: ["Use Windows PowerShell for the wsl commands that install, update, and list distributions. Use the Ubuntu terminal for apt, Linux project folders, and the Python web server. Windows Terminal can contain either shell, so check the selected tab rather than assuming every terminal is Ubuntu.", "VS Code itself stays installed on Windows. The WSL extension connects that editor to a server inside Ubuntu. In a connected window, your integrated terminal and workspace tools run against the Linux project. Each command block below names the environment where you should run it."],
      image: { src: "/blog/wsl-workspace.svg", alt: "A Windows desktop runs VS Code and a browser; the WSL connection reaches Ubuntu, where the terminal, development tools, and project files live", caption: "The editor window and browser stay on Windows. The project folder, terminal, and relevant development tools live inside Ubuntu on WSL 2.", width: 1600, height: 750 },
    },
    {
      id: "install-wsl-ubuntu",
      title: "1. Install WSL and Ubuntu.",
      paragraphs: ["Open PowerShell as administrator and run the installation command below. Restart the computer when prompted, then open Ubuntu from the Start menu and complete its initial setup. If you already have an Ubuntu distribution installed, check it before running installation again.", "Create a Linux username and password when Ubuntu asks. These belong to Ubuntu and are separate from your Windows account. When entering the password, nothing appears on screen; that is normal. Keep the account details somewhere you can recover them."],
      codeBlocks: [{ label: "Windows PowerShell · Run as administrator", language: "powershell", code: "wsl --install -d Ubuntu" }],
      image: { src: "/blog/wsl-install.png", alt: "Official Microsoft screenshot of PowerShell running a WSL installation command", caption: "Official Microsoft installation example. This guide explicitly selects Ubuntu with the -d Ubuntu option; use the command above rather than copying example output from the screenshot.", width: 1335, height: 229, source: { label: "Microsoft WSL environment setup", href: "https://learn.microsoft.com/en-us/windows/wsl/setup/environment" } },
      checkpoint: "Ubuntu opens from the Start menu, and its first-run Linux account setup is complete.",
      resources: [{ label: "Microsoft WSL installation instructions", href: "https://learn.microsoft.com/en-us/windows/wsl/install" }],
    },
    {
      id: "verify-wsl-two",
      title: "2. Update WSL and confirm the distribution version.",
      paragraphs: ["Back in Windows PowerShell, update WSL and list the installed distributions. New installations default to WSL 2. Find Ubuntu in the list and check the VERSION column; it should show 2. The name can vary if you installed a differently named Ubuntu edition.", "The VERSION column describes whether that distribution uses WSL 1 or WSL 2. It is separate from Ubuntu's own release number. If an existing distribution shows 1, use Microsoft's documented conversion instructions and retain a backup of important work before converting it."],
      codeBlocks: [{ label: "Windows PowerShell · Update and inspect WSL", language: "powershell", code: "wsl --update\nwsl --list --verbose" }],
      checkpoint: "Your Ubuntu distribution appears in the list with 2 in the VERSION column. If it does not, resolve that before continuing with this WSL 2 guide.",
      resources: [{ label: "WSL command reference", href: "https://learn.microsoft.com/en-us/windows/wsl/basic-commands" }, { label: "Microsoft: check or convert a WSL version", href: "https://learn.microsoft.com/en-us/windows/wsl/install#upgrade-version-from-wsl-1-to-wsl-2" }],
    },
    {
      id: "update-ubuntu",
      title: "3. Update Ubuntu and install basic tools.",
      paragraphs: ["Open the Ubuntu terminal and run these commands there, one at a time. sudo asks for your Linux password when it needs administrator privileges. Review the proposed changes and confirm when prompted.", "The first command refreshes the package list. The second installs available package upgrades. The third installs Git and Python for the example later in this guide. WSL updates and Ubuntu package updates are separate tasks: use wsl --update for WSL, and Ubuntu's package manager for Ubuntu packages."],
      codeBlocks: [{ label: "Ubuntu terminal · Update packages and install tools", language: "bash", code: "sudo apt update\nsudo apt upgrade\nsudo apt install git python3" }, { label: "Ubuntu terminal · Check the installed tools", language: "bash", code: "git --version\npython3 --version" }],
      checkpoint: "Git and Python print version numbers from the Ubuntu terminal, rather than command-not-found errors.",
      resources: [{ label: "Microsoft: set up the Linux environment", href: "https://learn.microsoft.com/en-us/windows/wsl/setup/environment" }],
    },
    {
      id: "install-vscode-wsl",
      title: "4. Install VS Code on Windows and its WSL extension.",
      paragraphs: ["Install Visual Studio Code on Windows, then install the WSL extension published by Microsoft. Its extension identifier is ms-vscode-remote.remote-wsl. For this workflow, install the desktop editor on the Windows side, rather than installing a second Linux desktop copy inside Ubuntu.", "During VS Code installation, enable Add to PATH if offered. This lets you open the editor with the code command from a terminal. Reopen your Ubuntu terminal after installing the editor if that command is not found.", "The extension installs VS Code Server inside Ubuntu when it connects. Language tools and other workspace extensions may need to be installed in the WSL environment too. Follow an extension's Install in WSL option when appropriate; some interface extensions, such as themes, run on the Windows side."],
      checkpoint: "VS Code is installed on Windows, and Microsoft's WSL extension is enabled.",
      resources: [{ label: "Download Visual Studio Code", href: "https://code.visualstudio.com/download" }, { label: "Microsoft's WSL extension", href: "https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl" }, { label: "VS Code's WSL documentation", href: "https://code.visualstudio.com/docs/remote/wsl" }],
    },
    {
      id: "create-linux-project",
      title: "5. Create your project inside Linux.",
      paragraphs: ["In the Ubuntu terminal, create a practice folder under your Linux home directory, enter it, and open it in VS Code. The dot in code . means the current folder. On the first connection, VS Code may download its WSL server components before the window is ready.", "The tilde character in ~/projects refers to your Linux home directory. Your actual project path will resemble /home/yourname/projects/wsl-demo, where yourname is the Linux username you created. It is a path example, not a username to copy into your commands.", "For Linux development, Microsoft recommends storing projects in the Linux filesystem. A path under /mnt/c/ crosses into the Windows filesystem and can add overhead, particularly for projects that read or write many small files. Windows and Linux filesystem defaults also differ around capitalization, so use consistent filenames and imports."],
      codeBlocks: [{ label: "Ubuntu terminal · Create and open the project", language: "bash", code: "mkdir -p ~/projects/wsl-demo\ncd ~/projects/wsl-demo\ncode ." }, { label: "Example path · your Linux username will differ", language: "text", code: "/home/yourname/projects/wsl-demo" }],
      checkpoint: "VS Code opens the wsl-demo folder from your Linux home directory, rather than a project under /mnt/c/.",
      resources: [{ label: "Microsoft: file storage and performance", href: "https://learn.microsoft.com/en-us/windows/wsl/filesystems" }],
    },
    {
      id: "confirm-linux-connection",
      title: "6. Confirm that VS Code is connected to Ubuntu.",
      paragraphs: ["Look for the WSL connection indicator in VS Code's lower-left corner. It should identify the connected distribution. Then choose Terminal > New Terminal in that window and run the commands below.", "uname -s should print Linux. pwd should show your project under /home/yourname/projects/wsl-demo. A WSL-connected window uses its Linux environment for the integrated terminal and workspace operations. The indicator, command output, and project path together make a better check than the appearance of the editor alone."],
      codeBlocks: [{ label: "VS Code integrated terminal · Ubuntu", language: "bash", code: "uname -s\npwd" }, { label: "Expected output from uname -s", language: "text", code: "Linux" }],
      image: { src: "/blog/wsl-statusbar.png", alt: "Official VS Code screenshot of the lower-left WSL connection indicator showing Ubuntu", caption: "Official VS Code example of the WSL status indicator. Your distribution name can differ; the key is confirming that this window is connected to WSL.", width: 278, height: 150, source: { label: "Working in a WSL window", href: "https://code.visualstudio.com/docs/remote/wsl" } },
      checkpoint: "The status indicator identifies WSL, uname -s prints Linux, and pwd shows your Linux project folder.",
    },
    {
      id: "write-your-page",
      title: "7. Write a small page in VS Code.",
      paragraphs: ["In the Explorer panel for wsl-demo, create a file named index.html and paste the complete example below. Save the file. Its title appears in the browser tab, while the h1 and paragraph appear on the page.", "Keep the filename exactly index.html. Linux filesystem capitalization matters: Index.html is a different name. The viewport line makes this simple page behave sensibly when you narrow the browser or view it on a smaller screen."],
      codeBlocks: [{ label: "index.html · Save inside wsl-demo", language: "html", code: WSL_DEMO_HTML }],
    },
    {
      id: "preview-from-windows",
      title: "8. Run the server in Ubuntu and preview it in Windows.",
      paragraphs: ["In VS Code's Ubuntu terminal, confirm you are still in the wsl-demo folder, then start the local Python server. The command serves files from the current directory. Keep this terminal running while you preview the page.", "Open your Windows browser and visit http://localhost:8000. With the normal WSL localhost integration, Windows applications can reach a development server running inside the Linux distribution. localhost refers to your own computer; it is not a public website address.", "You should see Coding in Linux with VS Code and the paragraph beneath it. Change the paragraph in VS Code, save, and reload the browser to confirm that your edit reaches the page. When finished, return to the terminal running the server and press Ctrl+C to stop it. Python's built-in server is for this local practice exercise, not production hosting."],
      codeBlocks: [{ label: "VS Code Ubuntu terminal · Start the local preview", language: "bash", code: "pwd\npython3 -m http.server 8000 --bind 127.0.0.1" }, { label: "Open this address in your Windows browser", language: "text", code: "http://localhost:8000" }],
      image: { src: "/blog/wsl-demo-preview.jpg", alt: "The simple HTML example displaying Coding in Linux with VS Code and the project paragraph", caption: "The example page served locally with Python. Edit the paragraph, save index.html, and refresh the browser to see your own change.", width: 1100, height: 300 },
      checkpoint: "The page opens in the browser, a saved text change appears after reloading, and Ctrl+C stops the local server when you are done.",
      resources: [{ label: "Microsoft: access Linux apps from Windows using localhost", href: "https://learn.microsoft.com/en-us/windows/wsl/networking" }, { label: "Python's local HTTP server", href: "https://docs.python.org/3/library/http.server.html" }],
    },
    {
      id: "daily-wsl-workflow",
      title: "Keep your everyday workflow in one environment.",
      paragraphs: ["For this project, reopen Ubuntu, enter your Linux project folder, and run code . when you want to work again. Install and check the Linux versions of the development tools your project needs. A Windows installation of a tool does not mean you have configured its Linux counterpart.", "You can enter explorer.exe . in the Ubuntu terminal to open the current Linux folder in Windows File Explorer through WSL's supported integration. Keep the working copy in the Linux filesystem rather than duplicating it in two places and wondering which copy you edited.", "If you use Git, configure its author identity in the Linux environment as needed and review changes there. Our VS Code, Codex, and GitHub guide walks through that next. You do not need to configure a database, containers, or a deployment service to finish this WSL exercise."],
      codeBlocks: [{ label: "Ubuntu terminal · Open this folder in Windows File Explorer", language: "bash", code: "explorer.exe ." }],
      resources: [{ label: "Microsoft: access Linux files from Windows", href: "https://learn.microsoft.com/en-us/windows/wsl/filesystems" }, { label: "Next: start coding with VS Code, Codex, and GitHub", href: "/blog/set-up-vscode-codex-github/" }],
    },
    {
      id: "wsl-troubleshooting",
      title: "If something does not work, check the environment first.",
      paragraphs: ["Keep the exact error message and note whether it came from Windows PowerShell, the Ubuntu terminal, or a WSL-connected VS Code window. That distinction often explains why a command is unavailable or a project is running in the wrong place."],
      points: ["WSL installation fails: confirm Windows updates, administrator access, and the virtualization requirements in Microsoft's installation and troubleshooting instructions. A managed device may require your administrator's help.", "Apt or sudo is not recognized: you are probably using PowerShell or another Windows shell. Open Ubuntu before running those commands.", "code . is not found: confirm the Windows VS Code installation is on PATH, reopen the Ubuntu terminal, or use VS Code's WSL: Connect to WSL command and open the Linux folder from there.", "The editor has no WSL indicator: reconnect or reopen the folder in WSL before treating the integrated terminal as Linux.", "The project path begins with /mnt/c/: that is a mounted Windows location. For this exercise, use the folder under ~/projects that you created in Ubuntu.", "The browser shows a directory listing: make sure the server started in wsl-demo and the saved file is named index.html with the correct capitalization.", "The browser cannot connect: check that the server terminal is still running, the port in the URL matches the command, and port 8000 is not already in use. If networking policies or a VPN interfere, use Microsoft's WSL networking guidance.", "An update or conversion is needed: keep a backup of important project data and follow the official steps. Do not use wsl --unregister as a repair shortcut; it removes the distribution and its associated data."],
      resources: [{ label: "Microsoft WSL troubleshooting", href: "https://learn.microsoft.com/en-us/windows/wsl/troubleshooting" }, { label: "WSL command reference and distribution management", href: "https://learn.microsoft.com/en-us/windows/wsl/basic-commands" }],
    },
  ],
  sources: [
    { label: "Microsoft: WSL installation", href: "https://learn.microsoft.com/en-us/windows/wsl/install" },
    { label: "Microsoft: WSL 1 and WSL 2", href: "https://learn.microsoft.com/en-us/windows/wsl/compare-versions" },
    { label: "Microsoft: Linux account and environment setup", href: "https://learn.microsoft.com/en-us/windows/wsl/setup/environment" },
    { label: "Microsoft: WSL command reference", href: "https://learn.microsoft.com/en-us/windows/wsl/basic-commands" },
    { label: "Microsoft: file storage, performance, and case sensitivity", href: "https://learn.microsoft.com/en-us/windows/wsl/filesystems" },
    { label: "VS Code: developing in WSL", href: "https://code.visualstudio.com/docs/remote/wsl" },
    { label: "Microsoft: WSL networking and localhost", href: "https://learn.microsoft.com/en-us/windows/wsl/networking" },
    { label: "Python: HTTP server documentation", href: "https://docs.python.org/3/library/http.server.html" },
  ],
  links: [{ label: "Continue with VS Code, Codex, and GitHub", href: "/blog/set-up-vscode-codex-github/" }, { label: "Then deploy a website with Railway", href: "/blog/deploy-a-website-with-railway/" }],
  relatedSlugs: ["set-up-vscode-codex-github", "deploy-a-website-with-railway"],
};
