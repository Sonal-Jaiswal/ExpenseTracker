document.getElementById("expenseForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let expenseData = {
        title: document.getElementById("title").value,
        amount: document.getElementById("amount").value,
        category: document.getElementById("category").value,
    };

    fetch('/api/expenses/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
        },
        body: JSON.stringify(expenseData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Expense Added:", data);
        fetchExpenses();
    });
});

function fetchExpenses() {
    fetch('/api/expenses/', {
        headers: { 'Authorization': 'Bearer YOUR_ACCESS_TOKEN' }
    })
    .then(response => response.json())
    .then(data => {
        let list = document.getElementById("expenseList");
        list.innerHTML = "";
        data.forEach(expense => {
            let li = document.createElement("li");
            li.innerText = `${expense.title} - ${expense.amount} (${expense.category})`;
            list.appendChild(li);
        });
    });
}

fetchExpenses();
