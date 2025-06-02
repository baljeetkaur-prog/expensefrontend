import { Link } from "react-router-dom";
import { useExpenses } from "./ExpenseContext";
import { ToastContainer } from "react-toastify";

function ExpenseSummary() {
    const { expenses } = useExpenses();
    const now = new Date();

    const currentMonth = now.getMonth(); 
    const currentYear = now.getFullYear();

    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const categorize = (month, year) => {
        return expenses
            .filter((e) => {
                const d = new Date(e.date);
                return d.getMonth() === month && d.getFullYear() === year;
            })
            .reduce((acc, e) => {
                const category = e.cat || "Unknown";
                acc[category] = (acc[category] || 0) + Number(e.amount);
                return acc;
            }, {});
    };

    const currentData = categorize(currentMonth, currentYear);
    const previousData = categorize(previousMonth, previousYear);

    const allCategories = Array.from(new Set([...Object.keys(currentData), ...Object.keys(previousData)]));

    const totalCurrent = Object.values(currentData).reduce((a, b) => a + b, 0);
    const totalPrevious = Object.values(previousData).reduce((a, b) => a + b, 0);
    const totalDifference = totalCurrent - totalPrevious;

    return (
        <div>
            <ToastContainer />
            <nav className="navbar">
        <a href="#" className="logo">Expense Tracker</a>
        <div className="navlinks">
        <Link to="/">Expense Tracker</Link>
        <Link to="/filterdata">Filter by Date/Category</Link>
        <Link to="/sort">Sort Expenses</Link>
        <Link to="/summary" className="active">Expense Summary</Link>
        </div>
      </nav>
            <div className="summarycontainer">
                <h2>Monthly Expense Summary</h2>
                <table className="summarytable">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Previous Month Expenses (₹)</th>
                            <th>Current Month Expenses (₹)</th>
                            <th>Difference (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allCategories.map((cat) => {
                            const prev = previousData[cat] || 0;
                            const curr = currentData[cat] || 0;
                            const diff = curr - prev;
                            return (
                                <tr key={cat}>
                                    <td>{cat}</td>
                                    <td>₹{prev}</td>
                                    <td>₹{curr}</td>
                                    <td style={{ color: diff > 0 ? "red" : diff < 0 ? "green" : "black" }}>
                                        {diff >= 0 ? "+" : ""}₹{diff}
                                    </td>
                                </tr>
                            );
                        })}
                        <tr style={{ fontWeight: "bold", backgroundColor: "#f0f0f0" }}>
                            <td>Total</td>
                            <td>₹{totalPrevious}</td>
                            <td>₹{totalCurrent}</td>
                            <td style={{ color: totalDifference > 0 ? "red" : totalDifference < 0 ? "green" : "black" }}>
                                {totalDifference >= 0 ? "+" : ""}₹{totalDifference}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ExpenseSummary;
