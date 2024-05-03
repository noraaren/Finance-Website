const app = require('express')();
const bodyParser = require('body-parser');
const PORT = 8080; 

// Dummy data for expenses and balances
let expenses = [1000, 2000, 4000];
let balances = {};

// Middleware
app.use(bodyParser.json());

// GET all expenses
app.get('/expenses', (req, res) => {
    res.status(200).send(expenses);
}); 

app.get('/balances', (req, res)=>{
    res.status(200).send(balances); 
});

// POST new expense
app.post('/expenses', (req, res)=> {
    
    const { description, amount } = req.body;
    const newExpense = { id: expenses.length + 1, description, amount };
    expenses.push(newExpense);
    res.status(200).json(newExpense);
});

// Put (update) new expense 
app.put('/expenses/: id', (req, res)=> {
    const { id } = req.params;
    const { description, amount } = req.body;

    // Find the expense by its ID
    const expense = expenses.find(exp => exp.id === parseInt(id));

    // If the expense is found, update it
    if (expense) {
        expense.description = description;
        expense.amount = amount;
        res.status(200).json(expense);
    } else {
        res.status(404).send('Expense not found');
    }
});


// Delete expense
app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].id == id) {
            expenses.splice(i, 1);
            break; // Break the loop after deleting the expense
        }
    }
    res.status(204).send();
});
  

app.listen(

    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
)

