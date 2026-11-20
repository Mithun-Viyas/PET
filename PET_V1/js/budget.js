// PERSON 4: Budget Management
// Tracks expenses for the current calendar month and updates progress immediately.

function renderBudget() {
  const categories = ["Food", "Travel", "Shopping", "Rent", "Bills", "Education", "Health", "Entertainment", "Other"];
  const budgets = PET.state.budgets || {};
  const currentMonth = new Date().toISOString().slice(0, 7);

  const monthExpenses = PET.state.transactions.filter(t =>
    t.type === "expense" && String(t.date || "").startsWith(currentMonth)
  );

  const rows = categories.map(category => {
    const spent = monthExpenses
      .filter(t => t.category === category)
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const limit = Number(budgets[category] || 0);
    const percent = limit > 0 ? (spent / limit) * 100 : 0;
    const barWidth = Math.min(100, percent);
    const exceeded = limit > 0 && spent > limit;
    const remaining = Math.max(0, limit - spent);

    return `
      <div class="budget-row" style="margin-top:22px">
        <div class="section-head">
          <strong>${PET.escape(category)}</strong>
          <span class="muted">${PET.money(spent)} / ${limit > 0 ? PET.money(limit) : "No limit"}</span>
        </div>
        <div class="progress" role="progressbar"
             aria-valuenow="${Math.round(percent)}" aria-valuemin="0"
             aria-valuemax="100" aria-label="${PET.escape(category)} budget used">
          <span style="width:${barWidth}%;${exceeded ? "background:linear-gradient(90deg,#ff6487,#ff315f);box-shadow:0 0 12px #ff315f55;" : ""}"></span>
        </div>
        <div class="${exceeded ? "negative" : "muted"}" style="font-size:11px;margin-top:7px">
          ${limit <= 0
            ? "Set a budget to track this category"
            : exceeded
              ? `Budget exceeded by ${PET.money(spent - limit)} · ${percent.toFixed(1)}% used`
              : `${percent.toFixed(1)}% used · ${PET.money(remaining)} remaining`}
        </div>
      </div>`;
  }).join("");

  const totalMonthExpenses = monthExpenses.reduce((sum, t) => sum + Number(t.amount || 0), 0);
  const monthLabel = new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  return `
    <div class="grid two-col">
      <div class="card">
        <h2>Set category budget</h2>
        <p class="muted">Choose a spending limit for a category.</p>
        <form id="budget-form">
          <div class="field" style="margin-top:15px">
            <label>Category</label>
            <select name="category">
              ${categories.map(c => `<option value="${c}">${c}</option>`).join("")}
            </select>
          </div>
          <div class="field" style="margin-top:13px">
            <label>Monthly limit (₹)</label>
            <input name="amount" type="number" min="1" step="0.01" placeholder="e.g. 5000" required>
          </div>
          <div class="form-actions">
            <button class="btn" type="submit">Save budget</button>
          </div>
        </form>
      </div>
      <div class="card">
        <h2>Overall spending</h2>
        <div class="stat-value">${PET.money(totalMonthExpenses)}</div>
        <p class="muted">Total expenses for ${monthLabel}</p>
        <div class="notice">Your category progress updates when you add or delete an expense.</div>
      </div>
    </div>
    <div class="card" style="margin-top:18px">
      <div class="section-head">
        <h2>Category budget progress</h2>
        <span class="muted">${monthLabel}</span>
      </div>
      ${rows}
    </div>`;
}

function bindBudget() {
  document.getElementById("budget-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const amount = Number(data.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      alert("Enter a budget greater than zero.");
      return;
    }

    PET.state.budgets[data.category] = amount;
    PET.save();
    navigate("budget");
  });
}
