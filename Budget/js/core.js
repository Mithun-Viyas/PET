// Shared data layer: every module reads and writes through PET.
const PET = {
  state: { transactions: [], budgets: {} },
  load() {
    try {
      const saved = JSON.parse(localStorage.getItem("pet-data"));
      if (saved) this.state = {...this.state, ...saved};
    } catch (error) { console.warn("Could not load PET data", error); }
  },
  save() { localStorage.setItem("pet-data", JSON.stringify(this.state)); },
  addTransaction(item) {
    this.state.transactions.unshift({...item, id: Date.now() + Math.random()});
    this.save();
  },
  updateTransaction(id, updates) {
    this.state.transactions = this.state.transactions.map(t => t.id == id ? {...t, ...updates} : t);
    this.save();
  },
  deleteTransaction(id) {
    this.state.transactions = this.state.transactions.filter(t => t.id != id);
    this.save();
  },
  money(value) {
    return new Intl.NumberFormat("en-IN", {style:"currency", currency:"INR", maximumFractionDigits:2}).format(Number(value)||0);
  },
  total(type) {
    return this.state.transactions.filter(t=>t.type===type).reduce((sum,t)=>sum+Number(t.amount),0);
  },
  escape(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  }
};
PET.load();
