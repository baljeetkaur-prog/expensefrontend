import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"

function Sort() {
    const [sorder, setsorder] = useState("");
    const [sfield, setsfield] = useState("");
    const [sortedexp, setsortedexp] = useState([]);
    const sortexpenses = async () => {
        try {
            const apiresp = await axios.get(`https://expensebackend-cp68.onrender.com/api/sortexpenses?field=${sfield}&order=${sorder}`)
            if (apiresp.status >= 200 && apiresp.status < 300) {
                setsortedexp(apiresp.data.data);
            }
            else {
                toast.error("Error in sorting expenses")
            }
        }
        catch (e) {
            toast.error("Error " + e.message);
        }

    }
    return (
        <div>
            <ToastContainer />
            <nav className="navbar">
        <a href="#" className="logo">Expense Tracker</a>
        <div className="navlinks">
        <Link to="/">Expense Tracker</Link>
        <Link to="/filterdata">Filter by Date/Category</Link>
        <Link to="/sort" className="active">Sort Expenses</Link>
        <Link to="/summary">Expense Summary</Link>
        </div>
      </nav>
            <div className="sortexp">
                <h3>Sort Your Expenses</h3>
                <select onChange={(e) => setsfield(e.target.value)} value={sfield}>
                    <option value="">--Select Sort Field--</option>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                    <option value="cat">Category</option>
                    <option value="expense">Name</option>
                </select>
                <select onChange={(e) => setsorder(e.target.value)} value={sorder}>
                    <option value="">--Select Sort Order--</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                <button onClick={sortexpenses}>Sort Expense</button><br/><br/>
            </div>
            <ul>
                {sortedexp.length === 0 ? (
                    <li>No Sorted Expenses Found</li>
                ) : (
                    sortedexp.map((item) => (
                        <li key={item._id}>
                            <strong>{item.expense}</strong> - ₹{item.amount} - {item.cat} - {item.date}
                        </li>
                    ))
                )}
            </ul>
        </div>

    )
}
export default Sort
