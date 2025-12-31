class BudgetCalculator {
    constructor() {
        this.calculateBtn = document.getElementById('calculateBtn');
        this.resultsSection = document.getElementById('results');

        if (this.calculateBtn) {
            this.init();
        }
    }

    init() {
        this.calculateBtn.addEventListener('click', () => this.calculate());
        const inputs = document.querySelectorAll('input[type="number"]');
        inputs.forEach(input => input.addEventListener('input', () => this.calculate()));
    }

    calculate() {
        // Budget
        const totalBudget = parseFloat(document.getElementById('totalBudget').value) || 0;

        // Expenses
        const ticketPrice = parseFloat(document.getElementById('ticketPrice').value) || 0;
        const attendees = parseInt(document.getElementById('attendees').value) || 0;
        const ticketCost = ticketPrice * attendees;

        const travelCost = parseFloat(document.getElementById('travelCost').value) || 0;
        const accommodationCost = parseFloat(document.getElementById('accommodationCost').value) || 0;
        const foodCost = parseFloat(document.getElementById('foodCost').value) || 0;
        const miscCost = parseFloat(document.getElementById('miscCost').value) || 0;

        const totalExpenses = ticketCost + travelCost + accommodationCost + foodCost + miscCost;
        const remainingBalance = totalBudget - totalExpenses;

        this.displayResults(totalBudget, totalExpenses, remainingBalance);
    }

    displayResults(budget, expenses, balance) {
        document.getElementById('displayTotalBudget').textContent = `$${budget.toFixed(2)}`;
        document.getElementById('displayTotalExpenses').textContent = `$${expenses.toFixed(2)}`;

        const balanceElement = document.getElementById('displayNetBalance');
        balanceElement.textContent = `$${balance.toFixed(2)}`;

        if (balance >= 0) {
            balanceElement.style.color = '#10b981'; // Green (Safe)
        } else {
            balanceElement.style.color = '#ef4444'; // Red (Over budget)
        }

        this.resultsSection.style.display = 'block';

        // Simple animation to scroll to results
        this.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new BudgetCalculator();
});
