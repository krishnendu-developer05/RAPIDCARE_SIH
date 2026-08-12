# RapidCare AI Guidelines

These rules define our tech stack, naming conventions, and best practices to ensure all AI-generated code aligns with the team's "vibe coding" standards. As an AI agent working in this repo, follow these guidelines implicitly.

## Tech Stack & Architecture
- **Frontend Framework**: React using Vite (in the `/frontend` directory).
- **Styling**: Vanilla CSS. **Do not use Tailwind CSS**. Use semantic class names and maintain CSS variable tokens in `frontend/src/index.css`.
- **Assets**: Image assets and icons should be stored in `frontend/public/assets`.

## Naming Conventions
- **React Components**: PascalCase (e.g., `HospitalCard.jsx`).
- **CSS Files**: PascalCase matching the component name (e.g., `HospitalCard.css`).
- **Functions/Variables**: camelCase.
- **CSS Classes**: kebab-case (e.g., `.hospital-card-container`).

## Design & UI Vibe
- **Design System**: Use the established RapidCare color palette defined in `index.css` (e.g., `--primary-purple`, `--bg-color`).
- **Layout**: Emphasize a mobile-first UI inside the desktop wrapper (constrained to `max-width: 430px` in `index.css`).
- **Precision**: Adhere closely to the Figma designs provided by the team. Use static layouts unless animations are explicitly requested.

## Code Quality & Patterns
- Keep components modular, reusable, and focused on a single responsibility.
- Place all React components within `frontend/src/components/`.
- Avoid placeholder assets when possible. If an asset is missing, proactively use or request a script to pull it from the design source.
- **Automation Tools**: Any scripts or tools created to automate tasks (that are not necessary for the core functionality of the app) MUST be placed in a dedicated `/scripts` folder at the root of the repository.

## Planning & Micro-PRDs (Living Specs)
- **Always write a plan**: Before generating significant amounts of code for a new feature, AI agents MUST write a lightweight Product Requirements Document (PRD) or a structured markdown outline (e.g., an implementation plan).
- **Agree on approach**: The plan must detail the database schemas, component architecture, and state management approach to ensure the team agrees on the approach in text before execution.
- **Use as ground truth**: These specs serve as a map and the functional specification for the AI. Wait for explicit user approval on this plan before writing the code.

## Branching & Pull Requests
- **Isolate Features**: Treat every AI-generated feature session as an experimental branch. Never push massive AI-generated code chunks directly to `main`.
- **Review the Why, Not Just the What**: Because AI code can look deceptively clean while containing hidden logic flaws, use Pull Requests as collaborative review checkpoints to audit edge cases, security boundaries, and error handling before merging.
- **Auto-Summarize PRs**: Leverage AI tools to auto-summarize PR descriptions so the team understands what an AI-generated branch actually does.

## Prompting & Knowledge Sharing
- **Maintain a Prompt Library**: Utilize a shared internal document or team channel to collect and share high-performing prompt templates (e.g., forcing AI to write unit tests, or listing assumptions before coding).
- **Standardize Interactions**: Standardize how the team asks AI to refactor, debug, or scaffold components to keep the overall codebase consistent.

## Automated Guardrails and Linting
- **Strict CI/CD Pipelines**: Set up automated linters, type-checkers (e.g., TypeScript), and test suites that run on every pull request.
- **Block on Failure**: If an AI-generated block of code breaks type safety or fails integration tests, the PR should automatically block merging. Let automated tools handle the syntax and type validation so humans can focus on reviewing system architecture and user experience.

## Environment & Secrets Management
- **Use Encrypted Dotenv Files**: Use `dotenvx` to encrypt environment variables directly within the `.env` file. The encrypted `.env` file MUST be committed to Git.
- **Separate Decryption Keys**: The decryption key is generated in `.env.keys`. This file MUST NEVER be committed to Git and should be shared securely among authorized team members.
- **Run via CLI**: Utilize the CLI wrapper (`npx dotenvx run -- <command>`) to launch local development servers or AI agents, injecting keys directly into the runtime environment without exposing plain text files on disk.

## Cross-Agent Memory & Handoff Tools
- **Persistent Ledger**: We maintain a persistent cross-agent memory file at the root of the project: `AI_MEMORY.md`. 
- **Required Reading**: Before starting any task, the AI MUST read `AI_MEMORY.md` to establish context, understand architectural decisions, and see where the last agent left off.
- **Required Writing**: Before finishing any major task, the AI MUST update `AI_MEMORY.md` with a summary of changes made, architectural decisions, unresolved bugs, and clear instructions for the next agent picking up the task.
