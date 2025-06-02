import React from 'react'; 
import { Routes, Route } from 'react-router-dom';
import Mainexp from './Mainexp';
import Filter from './Filter';
import Sort from './Sort';
import ExpenseSummary from './ExpenseSummary';
function SiteRoutes(){
    return(
            <Routes>
                <Route path="/" element={<Mainexp/>}/>
                <Route path="/filterdata" element={<Filter/>}/>
                <Route path="/sort" element={<Sort/>}/>
                <Route path="/summary" element={<ExpenseSummary/>}/>
            </Routes>

    )
}
export default SiteRoutes