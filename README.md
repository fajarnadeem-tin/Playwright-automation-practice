# Playwright Test Automation Framework

![Playwright Tests](https://github.com/fajarnadeem-tin/Playwright-automation-practice/actions/workflows/playwright.yml/badge.svg)

End-to-end **UI and API** test automation built with **Playwright + TypeScript**, against
[saucedemo.com](https://www.saucedemo.com) (e-commerce UI) and
[restful-booker](https://restful-booker.herokuapp.com) (REST API).

## At a glance

| What          | How                                                                        |
| ------------- | -------------------------------------------------------------------------- |
| UI tests      | Login, inventory sorting, cart, checkout (happy path + validation), logout |
| API tests     | Auth token, create / read / update / delete bookings, negative cases       |
| Browsers      | Chromium, Firefox, WebKit (Safari)                                         |
| Design        | Page Object Model + custom fixtures + typed test data                      |
| Fast login    | Logs in **once** in a setup project, reused via `storageState`             |
| Data-driven   | Negative login and checkout cases generated from typed data arrays         |
| Tags          | `@smoke` (critical paths, runs on every PR) and `@regression`              |
| Quality gates | TypeScript strict, ESLint + `eslint-plugin-playwright`, Prettier           |
| CI            | GitHub Actions: smoke on PR, full suite on `main`, HTML report artifact    |

## Project structure

```
├── api/                 BookingApi: API client (the "page object" for the API)
├── fixtures/test.ts     Custom `test` that injects page objects + API client
├── pages/               Page objects: LoginPage, InventoryPage, CartPage, CheckoutPage
├── test-data/           Typed test data (interfaces + data arrays)
├── tests/
│   ├── auth.setup.ts    Logs in once, saves session for all UI tests
│   ├── ui/              Browser tests
│   └── api/             API tests (no browser)
├── utils/               env helper (fails fast on missing variables), paths
├── playwright.config.ts Projects: setup → chromium / firefox / webkit, plus api
└── .github/workflows/   CI pipeline
```

## Run it

```bash
nvm use                 # Node 24 LTS (from .nvmrc)
npm ci                  # install exact dependency versions
npx playwright install  # download browsers
cp .env.example .env    # demo credentials (public, shown on the sites)

npm test                # everything
npm run test:smoke      # only @smoke
npm run test:api        # only API tests
npm run test:headed     # watch the browser
npm run test:debug      # Playwright UI mode (time-travel debugging)
npm run report          # open the last HTML report
npm run lint            # ESLint + Playwright rules
```

## Design decisions

- **Page Object Model + fixtures.** Selectors live in one place per page. Tests ask for what
  they need (`async ({ inventoryPage }) => …`) instead of creating objects, so tests read like
  user stories.
- **User-facing locators.** `getByRole` / `getByPlaceholder` first, `getByTestId` (`data-test`)
  where there is no accessible name. No XPath or long CSS chains.
- **No sleeps, no retries.** Web-first assertions (`await expect(...).toHaveText()`) wait
  automatically. Retries are off so flaky tests get fixed instead of hidden.
- **Login once.** A setup project logs in and saves the cookies; every UI test starts logged in,
  which is faster and keeps each test focused on one behaviour.
- **Independent tests.** Each test creates its own state (each API test creates its own
  booking), so the suite runs fully parallel and in any order.
- **Secrets out of code.** Credentials come from `.env` locally and GitHub Secrets in CI.

## Notes

- Firefox runs in CI (Linux). Locally on macOS 27 the current Playwright Firefox build fails to
  launch, so it is skipped unless `RUN_FIREFOX=1` is set.
- restful-booker quirks are asserted as-is and commented (e.g. delete returns `201`, bad login
  returns `200` with a reason).
