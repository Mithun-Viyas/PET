// PERSON 2: Income Management
function renderIncome() {
 const items=PET.state.transactions.filter(t=>t.type==="income");
 return `<div class="grid two-col">
  <div class="card"><h2>Add income</h2><p class="muted">Record money received from any source.</p>
   <form id="income-form">
    <div class="form-grid">
     <div class="field"><label>Income source</label><input name="title" placeholder="e.g. Monthly salary" required maxlength="50"></div>
     <div class="field"><label>Amount (₹)</label><input name="amount" type="number" min="0.01" step="0.01" placeholder="e.g. 25000" required></div>
     <div class="field"><label>Category</label><select name="category"><option>Salary</option><option>Business</option><option>Freelance</option><option>Investment</option><option>Gift</option><option>Other</option></select></div>
     <div class="field"><label>Date</label><input name="date" type="date" value="${new Date().toISOString().slice(0,10)}" required></div>
    </div><div class="form-actions"><button class="btn" type="submit">Save income</button></div>
   </form>
  </div>
  <div class="card"><h2>Income summary</h2><div class="stat-value positive">${PET.money(PET.total("income"))}</div><p class="muted">${items.length} income record(s) saved</p><div class="notice">Tip: Add every source of income to understand your actual monthly cash flow.</div></div>
 </div>
 <div class="card" style="margin-top:18px"><div class="section-head"><h2>Income history</h2><span class="muted">${items.length} records</span></div>${transactionTable(items)}</div>`;
}
function bindIncome() {
 document.getElementById("income-form")?.addEventListener("submit",e=>{
  e.preventDefault(); const d=Object.fromEntries(new FormData(e.currentTarget));
  if(Number(d.amount)<=0) return alert("Enter an amount greater than zero.");
  PET.addTransaction({...d,type:"income"}); location.reload();
 });
}
