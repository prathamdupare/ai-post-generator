# PostAI

PostAI is a web application where users can input a prompt to generate social media posts text using OpenAI's API

You can visit the project at [https://postai.fosspage.com/](https://postai.fosspage.com/).

The changes can be seen and edited in this Google Sheet - [here](https://docs.google.com/spreadsheets/d/1n2V5n1xwZj50twqzjHvziYrvCCPY-WaB61GMVEWvmks/edit?usp=sharing)

## Getting Started

Clone the repo - git clone https://github.com/prathamdupare/ai-post-generator.git

Clone the repository:

```bash
git clone https://github.com/prathamdupare/ai-post-generator.git
```

First, add a `.env.local` file. An example `.env.example` is provided in the project. Add appropriate values.

Replace the URL in `app/posts/page.tsx` from `https://postai.fosspage.com/api/getPosts` to `"http://localhost:3000/api/getPosts"` if running in a development environment.

To start the development server, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
