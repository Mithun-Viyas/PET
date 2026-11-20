# PET – Premium Purple Edition

## Run
1. Extract the ZIP.
2. Open this folder in VS Code.
3. Open `index.html` in a browser, or use VS Code Live Server.

## Five independent team modules
- Person 1: `js/dashboard.js`
- Person 2: `js/income.js`
- Person 3: `js/expenses.js`
- Person 4: `js/budget.js`
- Person 5: `js/reports.js`

Shared integration files: `index.html`, `style.css`, `js/core.js`, `js/app.js`.

## GitHub workflow
Create one repository. Each member creates a feature branch, edits their own module, commits, pushes, and opens a Pull Request. Review and merge each PR into `main`.

## Note
This is a frontend prototype. Data is saved in browser LocalStorage on the same browser/device. A shared database/login system can be added in a later sprint.


## Budget progress fix
The Budget module now calculates expenses for the current calendar month, shows the percentage used and remaining amount, turns the bar red when the budget is exceeded, and recalculates after an expense is added or deleted. The bar is intentionally capped at 100% when over budget; the exact over-budget percentage and amount are displayed underneath.
