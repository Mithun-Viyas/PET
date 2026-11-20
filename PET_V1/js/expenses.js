// PERSON 3: Expense Management
function renderExpenses() {
 const items=PET.state.transactions.filter(t=>t.type==="expense");
 return `<div class="grid two-col">
  <div class="card"><h2>Add expense</h2><p class="muted">Track where your money goes.</p>
   <form id="expense-form"><div class="form-grid">
    <div class="field"><label>Expense name</label><input name="title" placeholder="e.g. Lunch" required maxlength="50"></div>
    <div class="field"><label>Amount (₹)</label><input name="amount" type="number" min="0.01" step="0.01" placeholder="e.g. 250" required></div>
    <div class="field"><label>Category</label><select name="category"><option>Food</option><option>Travel</option><option>Shopping</option><option>Rent</option><option>Bills</option><option>Education</option><option>Health</option><option>Entertainment</option><option>Other</option></select></div>
    <div class="field"><label>Date</label><input name="date" type="date" value="${new Date().toISOString().slice(0,10)}" required></div>
   </div><div class="form-actions"><button class="btn" type="submit">Save expense</button></div></form>
  </div>
  <div class="card"><h2>Expense summary</h2><div class="stat-value negative">${PET.money(PET.total("expense"))}</div><p class="muted">${items.length} expense record(s) saved</p><div class="notice">Tip: Categorise expenses accurately to find areas where you can save.</div></div>
 </div>
 <div class="card" style="margin-top:18px"><div class="section-head"><h2>Expense history</h2><input id="expense-search" placeholder="Search expenses..." style="max-width:190px;padding:9px;border:1px solid var(--line);border-radius:8px"></div><div id="expense-table">${transactionTable(items)}</div></div>`;
}
function bindExpenses(){
 document.getElementById("expense-form")?.addEventListener("submit",e=>{
  e.preventDefault();const d=Object.fromEntries(new FormData(e.currentTarget));
  if(Number(d.amount)<=0)return alert("Enter an amount greater than zero.");
  PET.addTransaction({...d,type:"expense"});navigate("expenses");
 });
 document.getElementById("expense-search")?.addEventListener("input",e=>{
  const q=e.target.value.toLowerCase();
  const filtered=PET.state.transactions.filter(t=>t.type==="expense" && (t.title.toLowerCase().includes(q)||t.category.toLowerCase().includes(q)||t.date.includes(q)));
  document.getElementById("expense-table").innerHTML=transactionTable(filtered);
 });
}
