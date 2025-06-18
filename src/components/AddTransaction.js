import React from 'react';

function AddTransaction() {
  return (
    <div>
      <h2>Add New Transaction</h2>
      <form>
        <div>
          <label>Title:</label>
          <input type="text" placeholder="e.g. Grocery" />
        </div>
        <div>
          <label>Amount:</label>
          <input type="number" placeholder="e.g. 50" />
        </div>
        <div>
          <label>Type:</label>
          <select>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTransaction;