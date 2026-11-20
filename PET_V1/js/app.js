// Shared application navigation and common transaction table
function transactionTable(items){
 if(!items.length)return `<div class="empty">No records found.</div>`;
 return `<div class="table-wrap"><table><thead><tr><th>DETAILS</th><th>DATE</th><th>AMOUNT</th><th>ACTION</th></tr></thead><tbody>${items.map(t=>`<tr><td><strong>${PET.escape(t.title)}</strong><br><span class="muted">${PET.escape(t.category)}</span></td><td>${PET.escape(t.date)}</td><td class="${t.type==='income'?'amount-in':'amount-out'}">${PET.money(t.amount)}</td><td><button class="btn danger" onclick="removeTransaction('${t.id}')">Delete</button></td></tr>`).join("")}</tbody></table></div>`;
}
function removeTransaction(id){if(confirm("Delete this transaction?")){PET.deleteTransaction(id);navigate(currentPage);}}
let currentPage="dashboard";
const pages={dashboard:["Dashboard",renderDashboard],income:["Income Management",renderIncome],expenses:["Expense Management",renderExpenses],budget:["Budget Management",renderBudget],reports:["Reports & Analytics",renderReports]};
function navigate(page){
 if(!pages[page])return;currentPage=page;
 document.getElementById("page-title").textContent=pages[page][0];
 document.getElementById("app-content").innerHTML=pages[page][1]();
 document.querySelectorAll(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
 if(page==="income")bindIncome();if(page==="expenses")bindExpenses();if(page==="budget")bindBudget();
}
document.querySelectorAll(".nav-link").forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.page)));
document.getElementById("today").textContent=new Date().toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short",year:"numeric"});
navigate("dashboard");
