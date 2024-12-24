document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const list = document.getElementById("list");
    const chartCanvas = document.getElementById("chart");
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  
    const renderExpenses = () => {
      list.innerHTML = "";
      expenses.forEach((expense, index) => {
        const item = document.createElement("li");
        item.textContent = `${expense.date} - ${expense.category} - $${expense.amount}`;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => {
          expenses.splice(index, 1);
          updateStorage();
          renderExpenses();
        };
        item.appendChild(deleteBtn);
        list.appendChild(item);
      });
    };
  
    const updateStorage = () => {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    };
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const expense = {
        date: document.getElementById("date").value,
        category: document.getElementById("category").value,
        amount: parseFloat(document.getElementById("amount").value),
        description: document.getElementById("description").value,
      };
      expenses.push(expense);
      updateStorage();
      renderExpenses();
    });
  
    renderExpenses();
  });
  