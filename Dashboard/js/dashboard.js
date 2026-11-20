// PERSON 1: Dashboard Management
function renderDashboard() {
  const income=PET.total("income"), expenses=PET.total("expense"), balance=income-expenses;
  const recent=PET.state.transactions.slice(0,6);
  return `
  <div class="grid stats">
    <div class="card"><span class="stat-icon">₹</span><div class="stat-label">Total Balance</div><div class="stat-value">${PET.money(balance)}</div><div class="stat-foot">Income minus expenses</div></div>
    <div class="card"><span class="stat-icon">↗</span><div class="stat-label">Total Income</div><div class="stat-value positive">${PET.money(income)}</div><div class="stat-foot">All recorded income</div></div>
    <div class="card"><span class="stat-icon">↘</span><div class="stat-label">Total Expenses</div><div class="stat-value negative">${PET.money(expenses)}</div><div class="stat-foot">All recorded expenses</div></div>
  </div>
  <div class="grid two-col">
    <div class="card"><div class="section-head"><h2>Recent transactions</h2><button class="btn secondary" onclick="navigate('expenses')">View all</button></div>
      ${recent.length ? `<div class="table-wrap"><table><thead><tr><th>DETAILS</th><th>DATE</th><th>AMOUNT</th></tr></thead><tbody>${recent.map(t=>`<tr><td><strong>${PET.escape(t.title)}</strong><br><span class="muted">${PET.escape(t.category)}</span></td><td>${PET.escape(t.date)}</td><td class="${t.type==='income'?'amount-in':'amount-out'}">${t.type==='income'?'+':'−'}${PET.money(t.amount)}</td></tr>`).join("")}</tbody></table></div>` : `<div class="empty">No transactions yet. Add your first income or expense.</div>`}
    </div>
    <div class="card"><div class="section-head"><h2>Quick actions</h2></div><p class="muted">Keep your money records up to date.</p><div style="display:grid;gap:10px;margin-top:20px"><button class="btn" onclick="navigate('income')">＋ Add income</button><button class="btn secondary" onclick="navigate('expenses')">＋ Add expense</button><button class="btn secondary" onclick="navigate('budget')">◎ Set a budget</button></div></div>
  </div>`;
}
