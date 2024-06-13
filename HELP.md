# Project Help

## Introduction

This is a Playwright project that automates web testing. The project includes the use of the Faker.js library for generating fake data during tests.

## Installation

### Prerequisites

- Ensure you have Node.js installed on your machine. You can download and install Node.js from [nodejs.org](https://nodejs.org/).

### Installing Node.js & Playwright

1. Go to the [Node.js download page](https://nodejs.org/).
2. Download the installer for your operating system.
3. Run the installer and follow the on-screen instructions.
4. Verify the installation by opening a terminal and running:
   -- node -v
   -- npm -v

5. Install Playwright
   -- npm init playwright@latest

## How to run the tests

1. Run group of tests by tag. Example -> npx cross-env playwright test --grep="@tag" --config=./playwright.config.ts
2. Run all tests by project. Example -> npx cross-env playwright test --config=./playwright.config.ts --project=AxilionChrome
3. Run tests on more workers -> npx cross-env WORKERS=<number> playwright test --config=./playwright.config.ts --project=AxilionChrome
4. Run tests on different environments (currently only TEST env is supported) -> npx cross-env ENV=<Env name> playwright test --config=./playwright.config.ts --project=AxilionChrome
5. For headed mode use --headed
