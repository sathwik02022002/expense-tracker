import React, { useState, useEffect } from "react";
import "./styles.css";

const App = () => {
  const [accounts, setAccounts] = useState(
    JSON.parse(localStorage.getItem("accounts")) || []
  );
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(null);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  const handleNewAccount = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const balance = Number(event.target.balance.value);
    const newAccount = { name, balance, transactions: [] };
    setAccounts([...accounts, newAccount]);
    event.target.reset();
  };

  const handleAccountSelect = (index) => {
    setSelectedAccountIndex(index);
  };

  const handleNewTransaction = (event) => {
    event.preventDefault();
    const transaction = { description, amount: Number(amount), type };
    const updatedAccount = {
      ...accounts[selectedAccountIndex],
      balance:
        type === "deposit"
          ? accounts[selectedAccountIndex].balance + Number(amount)
          : accounts[selectedAccountIndex].balance - Number(amount),
      transactions: [
        ...accounts[selectedAccountIndex].transactions,
        transaction,
      ],
    };
    const updatedAccounts = [...accounts];
    updatedAccounts[selectedAccountIndex] = updatedAccount;
    setAccounts(updatedAccounts);
    event.target.reset();
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Expense Tracker</h1>
      </div>
      <div className="accounts">
        <h1>Accounts</h1>
        <form onSubmit={handleNewAccount} className="new-account-form">
          <h2>Create Account</h2>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
          <label htmlFor="balance">Balance:</label>
          <input type="number" id="balance" name="balance" />
          <button type="submit">Create Account</button>
        </form>
        <div className="account-list">
          <h2>Account List</h2>
          <ul>
            {accounts.map((account, index) => (
              <li
                key={index}
                onClick={() => handleAccountSelect(index)}
                className={selectedAccountIndex === index ? "selected" : ""}
              >
                {account.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="transactions">
        <h1>Transactions</h1>
        {selectedAccountIndex !== null ? (
          <>
            <div className="account-info">
              <h3>{accounts[selectedAccountIndex].name}</h3>
              <p>Balance: {accounts[selectedAccountIndex].balance}</p>
            </div>
            <form
              onSubmit={handleNewTransaction}
              className="new-transaction-form"
            >
              <h2>New Transaction</h2>
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                onChange={(event) => setDescription(event.target.value)}
              />
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                id="amount"
                name="amount"
                onChange={(event) => setAmount(event.target.value)}
              />
              <label htmlFor="type">Type:</label>
              <select
                id="type"
                name="type"
                onChange={(event) => setType(event.target.value)}
              >
                <option value="">Select Type</option>
                <option value="deposit">Deposit</option>
                <option value="withdrawal">Withdrawal</option>
              </select>
              <button type="submit">Add Transaction</button>
            </form>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {accounts[selectedAccountIndex].transactions.map(
                  (transaction, index) => (
                    <tr key={index}>
                      <td>{transaction.description}</td>
                      <td>{transaction.type}</td>
                      <td>{transaction.amount}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </>
        ) : (
          <p>Please select an account to view transactions</p>
        )}
      </div>
    </div>
  );
};

export default App;
