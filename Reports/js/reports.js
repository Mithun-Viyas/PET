// PERSON 5: Reports & Analytics
function renderReports(){
 const tx=PET.state.transactions, income=PET.total("income"),expense=PET.total("expense");
 const cats=[...new Set(tx.filter(t=>t.type==="expense").map(t=>t.category))];
 const max=Math.max(1,...cats.map(c=>tx.filter(t=>t.type==="expense"&&t.category===c).reduce((s,t)=>s+Number(t.amount),0)));
 const categoryBars=cats.length?cats.map(c=>{const total=tx.filter(t=>t.type==="expense"&&t.category===c).reduce((s,t)=>s+Number(t.amount),0);return `<div class="bar-row"><span>${PET.escape(c)}</span><div class="bar-track"><div class="bar-fill" style="width:${total/max*100}%"></div></div><strong>${PET.money(total)}</strong></div>`}).join(""):`<div class="empty">Add expenses to see category analytics.</div>`;
 return `<div class="grid stats"><div class="card"><div class="stat-label">Income</div><div class="stat-value positive">${PET.money(income)}</div></div><div class="card"><div class="stat-label">Expenses</div><div class="stat-value negative">${PET.money(expense)}</div></div><div class="card"><div class="stat-label">Net savings</div><div class="stat-value">${PET.money(income-expense)}</div></div></div>
 <div class="grid two-col"><div class="card"><h2>Expense by category</h2>${categoryBars}</div><div class="card"><h2>Financial overview</h2><p class="muted">Based on all transactions currently saved.</p><div class="bar-row"><span>Income</span><div class="bar-track"><div class="bar-fill" style="width:${income+expense?income/(income+expense)*100:0}%"></div></div><strong>${income+expense?(income/(income+expense)*100).toFixed(0):0}%</strong></div><div class="bar-row"><span>Expenses</span><div class="bar-track"><div class="bar-fill" style="width:${income+expense?expense/(income+expense)*100:0}%;background:#d58a78"></div></div><strong>${income+expense?(expense/(income+expense)*100).toFixed(0):0}%</strong></div><button class="btn" style="margin-top:20px" onclick="exportCSV()">Download CSV report</button></div></div>`;
}
function exportCSV(){
 const rows=[["Type","Title","Category","Amount","Date"],...PET.state.transactions.map(t=>[t.type,t.title,t.category,t.amount,t.date])];
 const csv=rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
 const blob=new Blob([csv],{type:"text/csv"}),url=URL.createObjectURL(blob),a=document.createElement("a");
 a.href=url;a.download="PET-transaction-report.csv";a.click();URL.revokeObjectURL(url);
}
