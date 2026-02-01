import  { useState, useEffect } from "react";

const ExpenseTracker = () => {
  const [formState, setFormState] = useState(false)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState("")
  const [type, setType] = useState('Income')
  const [transaction, setTransaction] = useState([])
 const [balance, setBalance] = useState(0)
 const [searchTerm, setSearchTerm] = useState("")
const filteredTransactions = transaction.filter((t)=>{
  return t.title.toLowerCase().includes(searchTerm.toLowerCase()) 
})
  
const totalIncome = transaction
  .filter((t) => t.type === "Income")
  .reduce((acc, t) => acc + t.amount, 0);

const totalExpense = transaction
  .filter((t) => t.type === "expense")
  .reduce((acc, t) => acc + t.amount, 0);

useEffect(() => {
  setBalance(totalIncome - totalExpense);
}, [totalIncome, totalExpense]);

  const handleAddTransaction = () => {
  if(!title || !amount) return;
      const transactionData = {
      id: Date.now(),
      title: title.trim().charAt(0).toUpperCase() + title.trim().slice(1),
      amount: Number(amount),
      type: type,
      }

    setTransaction((prev) => [...prev, transactionData])
    setTitle("")
    setAmount("")
    setFormState(true)
  };
 useEffect(() => {
  console.log("Transaction Updated", transaction);
},[transaction]);

  const handleDelete = (id) => {
    // implement delete logic
    const newTansaction = transaction?.filter((t) => t.id !== id);
    setTransaction(newTansaction);
  };

  return (
    
     <div className="tracker-container">
      <h2>Expense Tracker</h2>

      <div className="header-container">
        <div className="balance">
          <h3 data-testid="balance-amount">Balance: ${balance}</h3>
        </div>

        <button
          className="toggle-form-button"
          data-testid="toggle-form-button"
          onClick={()=>{setFormState(!formState)}}
        >
       {formState ? "Open Form" : "Close Form"}
        </button>
      </div>

      {!formState &&  <div className="form">
          <input    
            type="text"
            value={title}
            data-testid="title-input"
            placeholder="Title"
            onChange={(e)=>setTitle(e.target.value)}
          />
          <input
            type="number"
            data-testid="amount-input"
            placeholder="Amount"
          min="0"
          value={amount}
            onChange={(e)=>setAmount(e.target.value)}
          />
          <select
          data-testid="type-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          
        <button data-testid="add-button" onClick={handleAddTransaction}>
            Add Transaction
          </button>
        </div>
}

     {/* {formState && <> */}
     <div className="summary">
        <div data-testid="income-amount">Income: ${totalIncome}</div>
        <div data-testid="expenses-amount">Expense: ${totalExpense}</div>
      </div>

      <input
        type="text"
        data-testid="search-input"
        placeholder="Search..."
        className="search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="transactions">
        <ul>
      {filteredTransactions.length>0 ?
      (filteredTransactions.map((t) => (
          <li key={t.id} className={`${t.type === "Income" ? "income" : "expense"  }`}>
            <span>{t.title} : ${t.amount}</span>
            <button data-testid="delete-button" onClick={() => handleDelete(t.id)}>
              Remove
            </button>
          </li>
        )))
        :
        ( <p>No transactions found</p>  )
        }
        </ul>
        
      </div>
      {/* </>
      }  */}

    </div>
  );
};

export default ExpenseTracker;
