# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/a49b70c9-c1b4-4f72-959b-f769feecf08f

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a49b70c9-c1b4-4f72-959b-f769feecf08f) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a49b70c9-c1b4-4f72-959b-f769feecf08f) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

---

## Code Samples

The `doc/sample` directory contains a complete and realistic sample project for a Mitsubishi FX5U PLC, written in Structured Text (ST). These files are exported as HTML and serve as excellent reference material.

- **`function-block-libaray(fx5u).html`**: This file is a reusable **Function Block library**. It defines the low-level components for controlling specific hardware, such as different types of cylinders (`FbCylinder...`), a rotary table (`FbRotateTable`), feeders (`FbFeeder`), and motor axes (`FbAxis...`). It acts as the hardware abstraction layer for the main program.

- **`fx5u-sample.html`**: This is the **main program** that orchestrates the entire machine logic. It uses the function blocks from the library to control a complex, multi-station automated machine. The code is well-structured into an initialization area, a main scan loop (with auto and manual modes), error handling, and detailed logic for each station's sequence.
