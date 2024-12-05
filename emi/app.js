const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Use EJS as the view engine
app.set('view engine', 'ejs');


// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Default route to display the loan selection form
app.get('/', (req, res) => {
    res.send(`
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; background-image: linear-gradient(to right, lightblue, darkblue)">
            <h1> Instance Personal Loan </h1>
            <h2> Select Loan Type </h2>
            <form action="/selectLoanType" method="POST">
                <select name="loan" id="loan">
                    <option value="home">Home Loan</option>
                    <option value="edu">Education Loan</option>
                    <option value="car">Car Loan</option>
                </select><br><br>
                <button type="submit">Select Loan</button>
            </form>
        </div>
    `);
});

// POST route to handle loan selection
app.post('/selectLoanType', (req, res) => {
    const loanType = req.body.loan;

    // Render corresponding page based on the loan type
    if (loanType === 'home') {
        res.render('home');  // Assuming home.ejs exists in the views folder
    } else if (loanType === 'car') {
        res.render('car');   // Assuming car.ejs exists in the views folder
    } else if (loanType === 'edu') {
        res.render('edu');   // Assuming edu.ejs exists in the views folder
    } else {
        res.send('Invalid loan type');
    }
});

// Define routes for the loan pages (optional)
app.get('/home', (req, res) => {
    res.render('home');  // Renders home.ejs
});

app.get('/car', (req, res) => {
    res.render('car');   // Renders car.ejs
});

app.get('/edu', (req, res) => {
    res.render('edu');   // Renders edu.ejs
});

app.post('/calculateEMI', (req, res) => {
    const { loanType, salary, loanAmount, duration } = req.body;

    // Define interest rates for each loan type
    let interestRate = 0;
    if (loanType === 'home') {
        interestRate = 7; // Home loan interest rate
    } else if (loanType === 'car') {
        interestRate = 9; // Car loan interest rate
    } else if (loanType === 'edu') {
        interestRate = 8; // Education loan interest rate
    }

    // Convert salary and duration to numbers
    const salaryNum = parseFloat(salary);
    const loanAmountNum = parseFloat(loanAmount);
    const durationInMonths = parseInt(duration) * 12;

    // Calculate monthly interest rate
    const monthlyInterestRate = (interestRate / 100) / 12;

    // EMI calculation formula
    const emi = (loanAmountNum * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, durationInMonths)) / (Math.pow(1 + monthlyInterestRate, durationInMonths) - 1);

    
    // Send the result back to the user
    res.render('result', {
        loanType,
        loanAmount: loanAmountNum,
        emi: emi.toFixed(2),
        salary: salaryNum
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
