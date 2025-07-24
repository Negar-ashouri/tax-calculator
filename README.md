Tax Calculator App
This project is a frontend React application that connects to a backend API to calculate income tax based on user input. The UI is clean, responsive, and features solid error handling and testing.

Tech Stack
React (with TypeScript)
Vite for development/build
Jest + React Testing Library for testing
Docker (for backend API, not included in this repo)

Project Setup
1. Clone the repo

`$ git clone https://github.com/Negar-ashouri/tax-calculator.git`
`$ cd tax-calculator`

2. Install dependencies
`$ npm install`

3. Run the app
Make sure the backend API is running on http://localhost:5001.
`$ npm run dev`
Frontend will start on: http://localhost:5173

Run Tests
`$ npm run test`
or 
`$ npx jest`

Future Improvements
Show breakdown of tax by brackets
Support more years via backend config
Deploy on Vercel or Netlify
Add e2e tests with Playwright or Cypress

Author
built by Negar Ashouri 