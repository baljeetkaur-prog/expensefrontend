import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
function Mainexp(){
    const [expense, setexpense] = useState("");
    const [amount, setamount] = useState("");
    const [cat, setcat] = useState("");
    const [date, setdate] = useState("");
    const [allexpenses, setallexpenses] = useState([]);
    const [editmode, seteditmode] = useState(false);
    const [editid, seteditid] = useState(null);
    const [total, settotal] = useState(0);
    
    useEffect(() => {
      fetchallexpenses();
    }, []);
    const handleSubmit = async (e) => {
      e.preventDefault();
      const apidata = { expense, amount, cat, date };
      try {
        if (editmode) {
          const apiresp = await axios.put(`http://localhost:9000/api/updateexpense/${editid}`, apidata);
          if (apiresp.status >= 200 && apiresp.status < 300) {
            if (apiresp.data.success === true) {
              toast.success("Expense updated successfully");
              clearfields();
              seteditmode(false);
              seteditid(null);
              fetchallexpenses();
            } else {
              toast.info("Error while updating the expense");
            }
          }
        } else {
          const apiresp = await axios.post("http://localhost:9000/api/expenses", apidata);
          if (apiresp.status >= 200 && apiresp.status < 300) {
            toast.success("Expense added successfully");
            clearfields();
            fetchallexpenses();
          } else {
            toast.error("Front-end error occurred");
          }
        }
      } catch (e) {
        toast.error("Error Occurred " + e.message);
        console.log(e.message);
      }
    };
    const fetchallexpenses = async () => {
      try {
        const apiresp = await axios.get("http://localhost:9000/api/fetchallexpenses");
        if (apiresp.status >= 200 && apiresp.status < 300) {
          const data = apiresp.data.data
          setallexpenses(data);
          const totalexp = data.reduce((acc, item) => {
            const amt = Number(item.amount);
            return !isNaN(amt) ? acc + amt : acc;
          }, 0);
          settotal(totalexp);
        }
        else {
          toast.error("Error occured while fetching the data")
        }
      }
      catch (e) {
        toast.error("Error occured " + e.message)
      }
    }
    const clearfields = () => {
      setexpense("");
      setamount("");
      setcat("");
      setdate("");
    }
    const delexpense = async (id, expense) => {
      try {
        const uchoice = window.confirm(`Are you sure to delele the expense ${expense}`)
        if (uchoice) {
          const apiresp = await axios.delete(`http://localhost:9000/api/delexpense/${id}`);
          if (apiresp.status >= 200 && apiresp.status < 300) {
            if (apiresp.data.success === true) {
              toast.success("Expense Deleted Successfully")
              fetchallexpenses();
            }
            else {
              toast.info("Error while deleting the expense")
            }
          }
        }
      }
      catch (e) {
        toast.error("Error while deletion " + e.message)
      }
    }
    const updateexpense = async (item) => {
      setexpense(item.expense);
      setamount(item.amount);
      setcat(item.cat);
      setdate(item.date);
      seteditid(item._id);
      seteditmode(true);
    }
  return (
    <div>
      <ToastContainer />
      <nav className="navbar">
        <a href="#" className="logo">Expense Tracker</a>
        <div className="navlinks">
        <Link to="/" className="active">Expense Tracker</Link>
        <Link to="/filterdata">Filter by Date/Category</Link>
        <Link to="/sort">Sort Expenses</Link>
        <Link to="/summary">Expense Summary</Link>
        </div>
      </nav>
      <form name="form1" onSubmit={handleSubmit}>
        <h2>Expense Tracker</h2>
        <input type="text" name="expense" placeholder="Enter expense name here..." value={expense} onChange={(e) => setexpense(e.target.value)} /><br /><br />
        <input type="number" name="amount" placeholder="Enter expense amount here..." value={amount} onChange={(e) => setamount(e.target.value)} /><br /><br />
        <select name="expensecat" value={cat} onChange={(e) => setcat(e.target.value)}>
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
        </select><br /><br />
        <input type="date" name="date" value={date} onChange={(e) => setdate(e.target.value)} /><br /><br />
        <button type="submit">{editmode ? "Update Expense" : "Add Expense"}</button>
      </form>
      <div>
        <h3>All Expenses</h3>
        <div className="totalexpensecontainer">
          <h2>Total Expense</h2>
          <p className="expenseamount">₹{total.toLocaleString('en-IN')}</p>
          <span className="expensenote">* Based on your current expenses</span>
        </div>
        <ul>
          {allexpenses.length === 0 ?
            (<li>No expenses found</li>) : (
              allexpenses.map((item) =>
                <li key={item._id}>
                  <div className="expensedetails">
                    <strong>{item.expense}</strong>- ₹{item.amount} - {item.cat} - {item.date}<br /></div>
                  <div class="expenseactions">
                    <button onClick={() => delexpense(item._id, item.expense)}>Delete Expense</button><br />
                    <button onClick={() => updateexpense(item)}>Edit Expense</button></div>
                </li>)
            )}
        </ul>
      </div>
    </div>
  );
}
export default Mainexp