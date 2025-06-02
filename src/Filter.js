import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Filter() {
    const [category, setcategory] = useState([]);
    const [fromdate, setfromdate] = useState("");
    const [todate, settodate] = useState("");
    const [filterdata, setfilterdata] = useState([]);
    const [load, setload] = useState(false);
    const fetchfilterdata = async () => {
        try {
            const apiresp = await axios.get(`https://expensebackend-cp68.onrender.com/api/fetchallexpenses`);
            if (apiresp.status >= 200 && apiresp.status < 300) {
                let data = apiresp.data.data;
                if (category) {
                    data = data.filter(item => item.cat === category);
                }
                if (fromdate) {
                    data = data.filter(item => new Date(item.date) >= new Date(fromdate));
                }
                if (todate) {
                    data = data.filter(item => new Date(item.date) <= new Date(todate));
                }
                setfilterdata(data);
            }
        }
        catch (e) {
            toast.error("Error fetching filtered data: " + e.message);
        }
    }
    useEffect(() => {
        if (!load) {
            fetchfilterdata();
        }
        setload(false);
    }, [category, fromdate, todate])
    const clearfields = () => {
        setload(true);
        setcategory("");
        setfromdate("");
        settodate("");
        setfilterdata([]);
    }
    return (
        <div>
            <ToastContainer />
            <nav className="navbar">
        <a href="#" className="logo">Expense Tracker</a>
        <div className="navlinks">
        <Link to="/">Expense Tracker</Link>
        <Link to="/filterdata" className="active">Filter by Date/Category</Link>
        <Link to="/sort">Sort Expenses</Link>
        <Link to="/summary">Expense Summary</Link>
        </div>
      </nav>
            <div className="filcontainer">
            <div className="filform">
            <div className="formgroup">
            <div>
            <h2 className="filheading">Filter Expenses</h2>
                <label>Category: </label><br /><br />
                <select value={category} onChange={(e) => setcategory(e.target.value)}>
  <option value="">--Select Category--</option>
  <option value="Housing">Housing</option>
  <option value="Food and Groceries">Food and Groceries</option>
  <option value="Utilities">Utilities</option>
  <option value="Transportation">Transportation</option>
  <option value="Health and Medical">Health and Medical</option>
  <option value="Clothing and Personal Care">Clothing and Personal Care</option>
  <option value="Education and Learning">Education and Learning</option>
  <option value="Subscriptions">Subscriptions</option>
  <option value="Travel and Entertainment">Travel and Entertainment</option>
  <option value="Fitness and Well-being">Fitness and Well-being</option>
  <option value="Pets(if any)">Pets(if any)</option>
  <option value="Financial Expenses">Financial Expenses</option>
  <option value="Occasional or Annual">Occasional or Annual</option>
</select><br/><br/>
                </div>
                <div className="formgroup">
                <label>From Date: </label><br />
                <input type="date" value={fromdate} onChange={(e) => setfromdate(e.target.value)} /><br /><br /></div>
                <div className="formgroup">
                <label>To Date: </label><br />
                <input type="date" value={todate} onChange={(e) => settodate(e.target.value)} /><br /><br /></div>
                <button onClick={clearfields}>Clear Filters</button>
                </div>
            </div>
            <div className="filresult">
                <h3 className="filexphead">Filtered Expenses</h3>
                {filterdata.length > 0 && (
                    <p className="filsummary">
                        Showing expenses
                        {category && ` in category "${category}"`}
                        {fromdate && ` from ${fromdate}`}
                        {todate && ` to ${todate}`}
                    </p>
                )}
                {filterdata.length > 0 && (
                    <h4 className="totalspend">Total Spent: ₹{filterdata.reduce((acc, item) => acc + Number(item.amount), 0)}</h4>
                )}
                {filterdata.length === 0 ? (
                    <p className="nofilresult">❌No expenses found based on the selected filter.</p>
                ) : (
                    <ul className="filexplist">
                        {filterdata.map(item => (
                            <li key={item._id} className="filexpitem">
                                <strong>{item.expense}</strong> - ₹{item.amount} - {item.cat} - {item.date}
                            </li>

                        ))}
                    </ul>
                )}
            </div>
            </div>

        </div>
    )
}
export default Filter; 
