import './App.css';
import SiteRoutes from './SiteRoutes';
import { ExpenseProvider } from './ExpenseContext';
function App() {
  return (
    <ExpenseProvider>
      <SiteRoutes />
      </ExpenseProvider>
  );
}

export default App;
