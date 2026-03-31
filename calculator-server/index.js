const express = require("express");
const app = express();

const calculate = (a, b, operation) => {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);
    
    const ops = {
        sum: () => num1 + num2,
        multiply: () => num1 * num2,
        divide: () => num1 / num2,
        subtract: () => num1 - num2
    };
    
    return { ans: ops[operation]() };
};

app.get("/sum", (req, res) => res.json(calculate(req.query.a, req.query.b, "sum")));
app.get("/multiply", (req, res) => res.json(calculate(req.query.a, req.query.b, "multiply")));
app.get("/divide", (req, res) => res.json(calculate(req.query.a, req.query.b, "divide")));
app.get("/subtract", (req, res) => res.json(calculate(req.query.a, req.query.b, "subtract")));

app.listen(3000, () => console.log("Server running on port 3000"));
