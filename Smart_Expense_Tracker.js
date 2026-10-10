let budget = 20000;

const expenses = [
    { id: 1, title: "Lunch", amount: 500, category: "Food", date: "2026-10-09" },
    { id: 2, title: "Bus fare", amount: 200, category: "Transport", date: "2026-10-09" },
    { id: 3, title: "Shirt", amount: 1000, category: "Shopping", date: "2026-10-09" },
    { id: 4, title: "Notebook", amount: 350, category: "Education", date: "2026-10-09" },
    { id: 5, title: "Movie", amount: 700, category: "Entertainment", date: "2026-10-09" }
];

console.log("Monthly Budget:", budget);
console.log("Initial Expenses:", expenses);

function add_expense(title, amount, category, expenseDate) {
    if (
        typeof title !== "string" ||
        typeof category !== "string" ||
        typeof expenseDate !== "string"
    ) {
        console.log("Invalid input. Please enter text for title, category and date.");
        return;
    }

    title = title.trim();
    category = category.trim();
    expenseDate = expenseDate.trim();

    if (title === "") {
        console.log("Title cannot be empty.");
    }
    else if (!Number.isFinite(amount) || amount <= 0) {
        console.log("Enter a valid amount greater than 0.");
    }
    else if (category === "") {
        console.log("Category cannot be empty.");
    }
    else if (expenseDate === "") {
        console.log("Date cannot be empty.");
    }
    else {
        let newId = 1;

        if (expenses.length > 0) {
            newId = Math.max(...expenses.map(expense => expense.id)) + 1;
        }

        expenses.push({
            id: newId,
            title: title,
            amount: amount,
            category: category,
            date: expenseDate
        });

        console.log("Expense added successfully!");
    }
}

function view_expenses() {
    if (expenses.length === 0) {
        console.log("No expenses available.");
        return;
    }

    expenses.forEach(expense => {
        console.log(
            "ID:", expense.id,
            "| Title:", expense.title,
            "| Amount:", expense.amount,
            "| Category:", expense.category,
            "| Date:", expense.date
        );
    });
}

function cal_total() {
    let sum = expenses.reduce((prev, curr) => {
        return prev + curr.amount;
    }, 0);

    console.log("Total Spending:", sum);
    return sum;
}

function cal_remaining() {
    let total = expenses.reduce((prev, curr) => {
        return prev + curr.amount;
    }, 0);

    let remain = budget - total;

    console.log("Remaining Budget:", remain);
    return remain;
}

function cal_category_total(category) {
    let category_wise = expenses.filter(expense => {
        return expense.category.toLowerCase() === category.trim().toLowerCase();
    });

    let sum = category_wise.reduce((prev, curr) => {
        return prev + curr.amount;
    }, 0);

    console.log("Total spending for", category + ":", sum);
    return sum;
}

function search_expense(Name) {
    let result = expenses.find(expense => {
        return expense.title.toLowerCase() === Name.trim().toLowerCase();
    });

    if (result) {
        console.log("Expense Found:", result);
    }
    else {
        console.log("Expense not found!");
    }
}

function filter_category(category) {
    let result = expenses.filter(expense => {
        return expense.category.toLowerCase() === category.trim().toLowerCase();
    });

    if (result.length > 0) {
        console.log("Expenses in category:", category);
        result.forEach(expense => console.log(expense));
    }
    else {
        console.log("No expenses found in this category!");
    }

    return result;
}

function budget_warning() {
    let total = expenses.reduce((prev, curr) => {
        return prev + curr.amount;
    }, 0);

    let percentage = (total / budget) * 100;

    console.log("Budget Used:", percentage.toFixed(2) + "%");

    if (total > budget) {
        console.log("WARNING: You have exceeded your monthly budget!");
    }
    else if (total >= budget * 0.8) {
        console.log("WARNING: You have used 80% or more of your budget!");
    }
    else {
        console.log("Your spending is within the safe budget limit.");
    }
}

function start_tracker() {
    let running = true;

    while (running) {
        let choice = prompt(
            "SMART EXPENSE TRACKER\n\n" +
            "1. Add Expense\n" +
            "2. View All Expenses\n" +
            "3. Calculate Total Spending\n" +
            "4. Check Remaining Budget\n" +
            "5. Calculate Category Spending\n" +
            "6. Search Expense\n" +
            "7. Filter by Category\n" +
            "8. Check Budget Warnings\n" +
            "9. Exit\n\n" +
            "Enter your choice:"
        );

        if (choice === null || choice === "9") {
            running = false;
            console.log("Thank you for using Smart Expense Tracker!");
        }
        else if (choice === "1") {
            let title = prompt("Enter expense title:");
            if (title === null) continue;

            let amountInput = prompt("Enter expense amount:");
            if (amountInput === null || amountInput.trim() === "") continue;

            let amount = Number(amountInput);
            let category = prompt("Enter expense category:");
            if (category === null) continue;

            let expenseDate = prompt("Enter date (YYYY-MM-DD):");
            if (expenseDate === null) continue;

            add_expense(title, amount, category, expenseDate);
        }
        else if (choice === "2") {
            view_expenses();
        }
        else if (choice === "3") {
            cal_total();
        }
        else if (choice === "4") {
            cal_remaining();
        }
        else if (choice === "5") {
            let category = prompt("Enter category:");
            if (category !== null) {
                cal_category_total(category);
            }
        }
        else if (choice === "6") {
            let title = prompt("Enter expense title to search:");
            if (title !== null) {
                search_expense(title);
            }
        }
        else if (choice === "7") {
            let category = prompt("Enter category to filter:");
            if (category !== null) {
                filter_category(category);
            }
        }
        else if (choice === "8") {
            budget_warning();
        }
        else {
            console.log("Invalid choice. Please select 1 to 9.");
        }
    }
}

start_tracker();