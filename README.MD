## First steps installation 

- [x] Nodejs
- [x] NPM
- [x] playwright
- [x] Extension Playwright Test for VSCode

### First command: 
Cria uma estrutura esqueleto para automação com js

npm init playwright 

## for Updating Playwright 

npm install -D @playwright/test@latest

Check Playwright version: npx playwright --version

# TESTS
   
## Inside that directory, you can run several commands for tests:
Runs the end-to-end tests.

    npx playwright test

## Run a especfic test with a especfic title

npx playwright test tests/tests-examples/example.spec.js -g "has title"

## Starts the interactive UI mode.

    npx playwright test --ui

## Runs the test only on Chrome:

    npx playwright test --project chorme

## Run the test with the browser open
    npx playwright test                         

## Run the test with debuggin 
    npx playwright test --debug

## Run the test report

    npx playwright show-report



