// PERSON 4: Budget Management
function renderBudget(){
 const categories=["Food","Travel","Shopping","Rent","Bills","Education","Health","Entertainment","Other"];
 const budgets=PET.state.budgets||{};
 const rows=categories.map(cat=>{
  const spent=PET.state.transactions.filter(t=>t.type==="expense"&&t.category===cat).reduce((s,t)=>s+Number(t.amount),0);
  const limit=Number(budgets[cat]||0), pct=limit?Math.min(100,spent/limit*100):0;
  return `<div style="margin-top:18px"><div class="section-head"><strong>${cat}</strong><span class="muted">${PET.money(spent)} / ${limit?PET.money(limit):"No limit"}</span></div><div class="progress"><span style="width:${pct}%"></span></div>${limit&&spent>limit?`<div class="negative muted">Budget exceeded by ${PET.money(spent-limit)}</div>`:""}</div>`;
 }).join("");
 return `<div class="grid two-col"><div class="card"><h2>Set category budget</h2><p class="muted">Choose a spending limit for a category.</p><form id="budget-form"><div class="field" style="margin-top:15px"><label>Category</label><select name="category">${categories.map(c=>`<option>${c}</option>`).join("")}</select></div><div class="field" style="margin-top:13px"><label>Monthly limit (₹)</label><input name="amount" type="number" min="1" step="0.01" placeholder="e.g. 5000" required></div><div class="form-actions"><button class="btn">Save budget</button></div></form></div><div class="card"><h2>Overall spending</h2><div class="stat-value">${PET.money(PET.total("expense"))}</div><p class="muted">Total expenses recorded so far</p><div class="notice">A budget helps you plan spending before the month begins.</div></div></div><div class="card" style="margin-top:18px"><h2>Category budget progress</h2>${rows}</div>`;
}
function bindBudget(){
 document.getElementById("budget-form")?.addEventListener("submit",e=>{
  e.preventDefault();const d=Object.fromEntries(new FormData(e.currentTarget));
  if(Number(d.amount)<=0)return alert("Enter a budget greater than zero.");
  PET.state.budgets[d.category]=Number(d.amount);PET.save();location.reload();
 });
}
