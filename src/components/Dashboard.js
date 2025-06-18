import React, { useState } from 'react';
import Overview from './Overview';
import Transactions from './Transactions';
import AddTransaction from './AddTransaction';
import './Dashboard.css'
;
function Dashboard({onLogout}) {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'transactions':
        return <Transactions />;
      case 'add':
        return <AddTransaction />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Finance Tracker</h2>
        <nav>
          <button onClick={() => setActiveTab('overview')}>Overview</button>
          <button onClick={() => setActiveTab('transactions')}>Transactions</button>
          <button onClick={() => setActiveTab('add')}>Add Transaction</button>
          <button onClick={onLogout}>Logout</button>
        </nav>
      </aside>

      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default Dashboard;