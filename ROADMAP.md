# Playwright Learning Roadmap

Self-paced. No deadlines. Tick a step when it's done.

> **Fast-track (2026-10-19):** the full framework was built in one go so there's a working
> portfolio project (see README). The steps below are now for _understanding_ that code:
> each step explains the matching file(s) instead of building from scratch. Resume at 1.2.

Mode: 🟢 I watch (Claude shows) · 🟡 together · 🔵 I write, Claude reviews

## Level 0 — Setup 🟢

- [x] 0.1 What Playwright is, vs Cypress, what we'll build
- [x] 0.2 git init, CLAUDE.md, ROADMAP.md
- [x] 0.3 (Optional) Node LTS explained (nvm + Node 24, .nvmrc)

## Level 1 — TypeScript basics for tests 🟢

- [x] 1.1 Variables, types, functions, arrow functions
- [ ] 1.2 Objects, arrays, interfaces
- [ ] 1.3 Promises and async/await (most important!)
- [ ] 1.4 Modules: import / export

## Level 2 — First Playwright tests 🟢

- [ ] 2.1 `npm init playwright@latest` + every generated file explained
- [ ] 2.2 `playwright.config.ts` option by option
- [ ] 2.3 First test: open saucedemo, check title
- [ ] 2.4 Locators: getByRole, getByLabel, getByText, getByTestId
- [ ] 2.5 Assertions + auto-waiting
- [ ] 2.6 Running tests: headed, UI mode, one browser, one test
- [ ] 2.7 ESLint (eslint-plugin-playwright) + Prettier
- [ ] 2.8 Cypress vs Playwright cheat-sheet

## Level 3 — Login & inventory tests + debugging 🟡

- [ ] 3.1 10 scenarios: Claude writes 3, together 3, I write 4 with hints
- [ ] 3.2 Codegen (`npx playwright codegen`)
- [ ] 3.3 Trace viewer, UI mode, `--debug` on a deliberately broken test

## Level 4 — Framework design 🟡

- [ ] 4.1 Folder structure plan + trade-offs
- [ ] 4.2 Page Object Model: LoginPage, InventoryPage
- [ ] 4.3 Custom fixtures injecting page objects
- [ ] 4.4 Login once with storageState (setup project)
- [ ] 4.5 `.env` + projects (browsers / environments)
- [ ] 4.6 Data-driven tests with typed test data
- [ ] 4.7 Full E2E suite (sorting, cart, checkout, logout) + @smoke / @regression
- [ ] 4.8 README for hiring managers

## Level 5 — API testing & mocking 🔵

- [ ] 5.1 Request context on restful-booker: auth token
- [ ] 5.2 CRUD + status/schema checks + negative cases
- [ ] 5.3 API client fixture + Postman vs Playwright
- [ ] 5.4 page.route mocking: empty state, 500 error, block images (vs cy.intercept)
- [ ] 5.5 API + UI combined: create via API, verify in UI, clean up

## Level 6 — CI & quality 🔵

- [ ] 6.1 Push to GitHub
- [ ] 6.2 GitHub Actions: smoke on PR, regression on main
- [ ] 6.3 Sharding + merged reports + artifacts on failure + secrets
- [ ] 6.4 Pre-commit hook + lint in CI
- [ ] 6.5 (Optional) Allure reporter

## Level 7 — AI tools, accessibility, visual 🔵

- [ ] 7.1 Playwright MCP + test agents (Planner / Generator / Healer) explained
- [ ] 7.2 Agents on automationexercise → review what they got wrong
- [ ] 7.3 5 tricky scenarios on the-internet (iframes, dynamic loading, upload, alerts, windows)
- [ ] 7.4 Accessibility with @axe-core/playwright
- [ ] 7.5 Visual snapshots + OS differences in CI

## Level 8 — (Optional) Selenium-Java + migration project 🔵

- [ ] 8.1 Selenium 4 + TestNG + Maven: saucedemo login + checkout
- [ ] 8.2 Side-by-side comparison with Playwright
- [ ] 8.3 Migrate to Playwright + migration report (Upwork/Fiverr portfolio)

---

## Reusable prompts (use anytime)

- **Review:** "Review all tests in tests/ against https://playwright.dev/docs/best-practices and CLAUDE.md. Rank issues by severity. Don't change code yet; explain first."
- **Flaky test:** "This test is flaky: [test name]. Run it with --repeat-each=20, find the root cause using traces, and explain it. Don't fix it with retries or waits."
- **Mock interview:** "Interview me on what we built in this level: ask 5 questions one at a time, grade my answers, and show the model answer after each."
