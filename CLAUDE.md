# CLAUDE.md

## Project

Personal practice repo to learn Playwright for job hunting (remote + Pakistan market).
Stack: Playwright Test + TypeScript (strict), Node, GitHub Actions.
Learner is a **beginner** in TypeScript. Mention Cypress differences briefly as side notes.
Progress is tracked in `ROADMAP.md`: read it at session start, tick steps when finished.

## How to work with me (learning mode)

- **Ask before acting**: before creating/editing files, running commands or installing anything, say what and why, and wait for OK. Never do steps silently or jump ahead.
- **Teach, then fade**:
  - Levels 0–2: you show, I watch. Explain, write small code, let me run it and tweak it.
  - Levels 3–4: together. You write part, I fill gaps with hints.
  - Levels 5+: I write, you review.
  - If I say "show me" → you write it; "let me try" → hints only, then review.
- Explain concepts before code, in simple words. Explain non-obvious lines.
- One step at a time. End each step with a recap + **one interview question WITH its model answer**.
- Never silently skip a failing test, add retries, or use waitForTimeout to make tests pass. Find and explain the root cause.

## Playwright rules (check official docs when unsure, versions change)

- Docs: https://playwright.dev/docs/intro · Best practices: https://playwright.dev/docs/best-practices
- Locators: getByRole, getByLabel, getByText, getByTestId (https://playwright.dev/docs/locators). No XPath or brittle CSS chains.
- Web-first assertions: `await expect(locator).toBeVisible()` (https://playwright.dev/docs/test-assertions)
- No manual waits; rely on auto-waiting.
- Tests independent, parallel-safe, any order.
- Fixtures for setup (https://playwright.dev/docs/test-fixtures), Page Object Model (https://playwright.dev/docs/pom).
- Login once via storageState (https://playwright.dev/docs/auth).
- No secrets in code: use `.env` + `process.env`, keep `.env` out of git.

## Code standards

- TypeScript strict, ESLint (eslint-plugin-playwright) + Prettier.
- Test names describe behaviour: "user can checkout with valid card".
- Small commits with clear messages after each working step.

## Practice targets (public demo sites: keep runs light, no load testing)

- UI: https://www.saucedemo.com, https://the-internet.herokuapp.com, https://automationexercise.com
- API: https://restful-booker.herokuapp.com
