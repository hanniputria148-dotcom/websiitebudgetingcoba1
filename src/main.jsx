import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  ArrowDownLeft,
  ArrowRightLeft,
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  Database,
  FileClock,
  FileText,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  RefreshCw,
  Search,
  Settings2,
  ShieldCheck,
  UserRound,
  WalletCards,
  X,
  XCircle
} from "lucide-react";
import "./styles.css";

const initialBudget = [
  {
    id: 1,
    unitEntity: "Kantor Pusat Silog",
    fundsCenterCode: "001",
    fundsCenterName: "GENERAL",
    commitmentItemCode: "6214000000",
    commitmentItemName: "Biaya BBM kendaraan dinas",
    currentBudget: 233421610,
    consumableBudget: 48618900,
    consumedBudget: 48612552
  },
  {
    id: 2,
    unitEntity: "Kantor Pusat Silog",
    fundsCenterCode: "001",
    fundsCenterName: "GENERAL",
    commitmentItemCode: "6710000000",
    commitmentItemName: "Biaya Perjalanan Dinas",
    currentBudget: 740094264,
    consumableBudget: 159702790,
    consumedBudget: 159283489
  },
  {
    id: 3,
    unitEntity: "Kantor Pusat Silog",
    fundsCenterCode: "001",
    fundsCenterName: "GENERAL",
    commitmentItemCode: "6742000410",
    commitmentItemName: "Biaya Alat Tulis Kantor",
    currentBudget: 2489300,
    consumableBudget: 1498400,
    consumedBudget: 1001900
  },
  {
    id: 4,
    unitEntity: "Kantor Pusat Silog",
    fundsCenterCode: "151",
    fundsCenterName: "TIM ANALISIS BUBI",
    commitmentItemCode: "6772000400",
    commitmentItemName: "JASA TENAGA ADMINISTRASI",
    currentBudget: 0,
    consumableBudget: 0,
    consumedBudget: 0
  },
  {
    id: 5,
    unitEntity: "Kantor Pusat Silog",
    fundsCenterCode: "210",
    fundsCenterName: "BIRO INTERNAL AUDIT",
    commitmentItemCode: "6214000000",
    commitmentItemName: "Biaya BBM kendaraan dinas",
    currentBudget: 109605774,
    consumableBudget: 5395838,
    consumedBudget: 5370838
  },
  {
    id: 6,
    unitEntity: "Kantor Pusat Silog",
    fundsCenterCode: "210",
    fundsCenterName: "BIRO INTERNAL AUDIT",
    commitmentItemCode: "6311000100",
    commitmentItemName: "GAJI",
    currentBudget: 0,
    consumableBudget: 0,
    consumedBudget: 0
  },
  {
    id: 7,
    unitEntity: "Kantor Pusat Silog",
    fundsCenterCode: "210",
    fundsCenterName: "BIRO INTERNAL AUDIT",
    commitmentItemCode: "6313000300",
    commitmentItemName: "TUNJANGAN MAKAN",
    currentBudget: 0,
    consumableBudget: 0,
    consumedBudget: 0
  },
  {
    id: 8,
    unitEntity: "Kantor Pusat Silog",
    fundsCenterCode: "210",
    fundsCenterName: "BIRO INTERNAL AUDIT",
    commitmentItemCode: "6313001901",
    commitmentItemName: "TUNJANGAN LAINNYA",
    currentBudget: 0,
    consumableBudget: 0,
    consumedBudget: 0
  },
  {
    id: 9,
    unitEntity: "Kantor Pusat Silog",
    fundsCenterCode: "210",
    fundsCenterName: "BIRO INTERNAL AUDIT",
    commitmentItemCode: "6313001902",
    commitmentItemName: "TUNJANGAN PENGAWASAN",
    currentBudget: 0,
    consumableBudget: 0,
    consumedBudget: 0
  },
  {
    id: 10,
    unitEntity: "Kantor Pusat Silog",
    fundsCenterCode: "210",
    fundsCenterName: "BIRO INTERNAL AUDIT",
    commitmentItemCode: "6313001903",
    commitmentItemName: "TUNJANGAN INSENTIF",
    currentBudget: 0,
    consumableBudget: 0,
    consumedBudget: 0
  }
];

const users = [
  {
    username: "admin.biro",
    password: "123456",
    name: "Admin Biro Internal Audit",
    role: "BIRO",
    fundsCenterCode: "210",
    fundsCenterName: "BIRO INTERNAL AUDIT"
  },
  {
    username: "admin.pusat",
    password: "123456",
    name: "Admin Pusat",
    role: "PUSAT",
    fundsCenterCode: "ALL",
    fundsCenterName: "Seluruh Funds Center"
  }
];

const initialRequests = [
  {
    id: "REQ-0001",
    unitEntity: "Kantor Pusat Silog",
    fundsCenterCode: "210",
    fundsCenterName: "BIRO INTERNAL AUDIT",
    commitmentItemCode: "6214000000",
    commitmentItemName: "Biaya BBM kendaraan dinas",
    requestAmount: 1500000,
    description: "Tambahan kebutuhan operasional kendaraan dinas.",
    requestDate: "2026-10-03",
    status: "Pending",
    sourceFundsCenterCode: "210",
    sourceFundsCenterName: "BIRO INTERNAL AUDIT",
    createdBy: "admin.biro"
  }
];

const initialAudit = [
  {
    id: "TRX-0001",
    type: "Input Budget Awal",
    amount: 109605774,
    user: "admin.pusat",
    date: "2026-10-01 09:00",
    status: "Success",
    description: "Inisialisasi budget BIRO INTERNAL AUDIT."
  }
];

const rupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value || 0);

const compactRupiah = (value) => {
  const n = Number(value || 0);
  if (n >= 1_000_000_000) return `Rp ${(n / 1_000_000_000).toFixed(1)} M`;
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(1)} jt`;
  if (n >= 1_000) return `Rp ${(n / 1_000).toFixed(0)} rb`;
  return rupiah(n);
};

const getAvailable = (b) => b.consumableBudget - b.consumedBudget;
const getHold = (b) => b.currentBudget - b.consumableBudget;
const getUtilization = (b) =>
  b.consumableBudget > 0 ? (b.consumedBudget / b.consumableBudget) * 100 : 0;

function App() {
  const [session, setSession] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("budget_session")) || null;
    } catch {
      return null;
    }
  });
  const [budgets, setBudgets] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("budget_data")) || initialBudget;
    } catch {
      return initialBudget;
    }
  });
  const [requests, setRequests] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("budget_requests")) || initialRequests;
    } catch {
      return initialRequests;
    }
  });
  const [audit, setAudit] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("budget_audit")) || initialAudit;
    } catch {
      return initialAudit;
    }
  });
  const [page, setPage] = useState("dashboard");
  const [toast, setToast] = useState(null);

  useEffect(() => localStorage.setItem("budget_data", JSON.stringify(budgets)), [budgets]);
  useEffect(() => localStorage.setItem("budget_requests", JSON.stringify(requests)), [requests]);
  useEffect(() => localStorage.setItem("budget_audit", JSON.stringify(audit)), [audit]);
  useEffect(() => {
    if (session) localStorage.setItem("budget_session", JSON.stringify(session));
    else localStorage.removeItem("budget_session");
  }, [session]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const notify = (type, message) => setToast({ type, message });

  const login = (username, password) => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) {
      notify("error", "Username atau password salah.");
      return false;
    }
    setSession(user);
    setPage("dashboard");
    notify("success", `Selamat datang, ${user.name}.`);
    return true;
  };

  const logout = () => {
    setSession(null);
    setPage("dashboard");
  };

  const visibleBudgets = useMemo(() => {
    if (!session || session.role === "PUSAT") return budgets;
    return budgets.filter((b) => b.fundsCenterCode === session.fundsCenterCode);
  }, [budgets, session]);

  const totals = useMemo(() => ({
    current: visibleBudgets.reduce((s, b) => s + b.currentBudget, 0),
    consumable: visibleBudgets.reduce((s, b) => s + b.consumableBudget, 0),
    consumed: visibleBudgets.reduce((s, b) => s + b.consumedBudget, 0),
    available: visibleBudgets.reduce((s, b) => s + getAvailable(b), 0),
    hold: visibleBudgets.reduce((s, b) => s + getHold(b), 0)
  }), [visibleBudgets]);

  const addAudit = (entry) => {
    setAudit((prev) => [
      {
        id: `TRX-${String(Date.now()).slice(-6)}`,
        date: new Date().toLocaleString("id-ID", { hour12: false }),
        status: "Success",
        ...entry
      },
      ...prev
    ]);
  };

  const submitRequest = (payload) => {
    const id = `REQ-${String(Date.now()).slice(-6)}`;
    const request = {
      id,
      requestDate: new Date().toISOString().slice(0, 10),
      status: "Pending",
      createdBy: session.username,
      ...payload
    };
    setRequests((prev) => [request, ...prev]);
    addAudit({
      type: "Pengajuan Budget",
      amount: payload.requestAmount,
      user: session.username,
      description: `${id} untuk ${payload.commitmentItemName}.`
    });
    notify("success", `${id} berhasil dikirim dan berstatus Pending.`);
    setPage("requests");
  };

  const approveRequest = (request) => {
    const source = budgets.find(
      (b) =>
        b.fundsCenterCode === request.sourceFundsCenterCode &&
        b.commitmentItemCode === request.commitmentItemCode &&
        b.unitEntity === request.unitEntity
    );

    if (!source || getAvailable(source) < request.requestAmount) {
      notify("error", "Budget pada sumber transaksi tidak mencukupi.");
      return;
    }

    setBudgets((prev) =>
      prev.map((b) =>
        b.id === source.id
          ? { ...b, consumedBudget: b.consumedBudget + request.requestAmount }
          : b
      )
    );

    setRequests((prev) =>
      prev.map((r) =>
        r.id === request.id
          ? { ...r, status: "Approved", approvedBy: session.username, approvedAt: new Date().toISOString() }
          : r
      )
    );

    addAudit({
      type: "Approval Budget",
      amount: request.requestAmount,
      user: session.username,
      description: `${request.id} disetujui. Sumber budget ${source.fundsCenterCode}.`
    });

    notify("success", `${request.id} berhasil disetujui dan budget diperbarui.`);
  };

  const rejectRequest = (request) => {
    const reason = window.prompt("Masukkan alasan penolakan:", "Kebutuhan belum dapat dipenuhi.");
    if (reason === null) return;

    setRequests((prev) =>
      prev.map((r) =>
        r.id === request.id
          ? { ...r, status: "Rejected", rejectionReason: reason, rejectedBy: session.username }
          : r
      )
    );

    addAudit({
      type: "Rejection Budget",
      amount: request.requestAmount,
      user: session.username,
      description: `${request.id} ditolak: ${reason}`
    });

    notify("success", `${request.id} ditolak dan alasannya disimpan.`);
  };

  const openBudget = (budgetId, amount) => {
    const opening = Number(amount);
    const target = budgets.find((b) => b.id === budgetId);
    if (!target || !opening || opening <= 0) {
      notify("error", "Nominal pembukaan budget tidak valid.");
      return;
    }
    const hold = getHold(target);
    if (opening > hold) {
      notify("error", `Pembukaan maksimal ${rupiah(hold)} sesuai Approval Hold Amount.`);
      return;
    }

    setBudgets((prev) =>
      prev.map((b) =>
        b.id === budgetId ? { ...b, consumableBudget: b.consumableBudget + opening } : b
      )
    );
    addAudit({
      type: "Pembukaan Budget",
      amount: opening,
      user: session.username,
      description: `Pembukaan budget untuk ${target.fundsCenterName} - ${target.commitmentItemName}.`
    });
    notify("success", "Consumable Budget berhasil dibuka.");
  };

  const realokasi = (sourceId, targetId, amount) => {
    const nominal = Number(amount);
    const source = budgets.find((b) => b.id === Number(sourceId));
    const target = budgets.find((b) => b.id === Number(targetId));

    if (!source || !target || source.id === target.id || !nominal || nominal <= 0) {
      notify("error", "Data realokasi tidak valid.");
      return;
    }
    if (source.commitmentItemCode !== target.commitmentItemCode) {
      notify("error", "Realokasi harus menggunakan Commitment Item yang sama.");
      return;
    }
    if (getAvailable(source) < nominal) {
      notify("error", "Available Amount sumber tidak mencukupi.");
      return;
    }

    setBudgets((prev) =>
      prev.map((b) => {
        if (b.id === source.id) return { ...b, consumableBudget: b.consumableBudget - nominal };
        if (b.id === target.id) return { ...b, consumableBudget: b.consumableBudget + nominal };
        return b;
      })
    );

    addAudit({
      type: "Realokasi Budget",
      amount: nominal,
      user: session.username,
      description: `Realokasi ${source.fundsCenterCode} → ${target.fundsCenterCode} untuk ${source.commitmentItemName}.`
    });
    notify("success", "Realokasi budget berhasil disimpan.");
  };

  const resetDemo = () => {
    if (!window.confirm("Reset seluruh data demo ke kondisi awal?")) return;
    setBudgets(initialBudget);
    setRequests(initialRequests);
    setAudit(initialAudit);
    notify("success", "Data demo berhasil di-reset.");
  };

  if (!session) return <LoginPage onLogin={login} />;

  return (
    <div className="app-shell">
      <Sidebar
        session={session}
        page={page}
        setPage={setPage}
        onLogout={logout}
      />
      <main className="main-area">
        <Topbar session={session} onReset={resetDemo} />
        {page === "dashboard" && (
          <Dashboard
            session={session}
            budgets={visibleBudgets}
            requests={requests}
            totals={totals}
            setPage={setPage}
          />
        )}
        {page === "requests" && (
          <RequestsPage
            session={session}
            budgets={visibleBudgets}
            requests={requests}
            onSubmit={submitRequest}
            onApprove={approveRequest}
            onReject={rejectRequest}
          />
        )}
        {page === "budget" && (
          <BudgetPage
            session={session}
            budgets={visibleBudgets}
            allBudgets={budgets}
            onOpen={openBudget}
            onRealokasi={realokasi}
            notify={notify}
          />
        )}
        {page === "audit" && <AuditPage audit={audit} />}
        {page === "reports" && (
          <ReportsPage budgets={visibleBudgets} requests={requests} audit={audit} />
        )}
      </main>
      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("admin.biro");
  const [password, setPassword] = useState("123456");

  const submit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="login-page">
      <div className="login-decoration one" />
      <div className="login-decoration two" />
      <div className="login-card">
        <div className="brand-mark"><WalletCards size={28} /></div>
        <div className="eyebrow">FINANCE CONTROL SYSTEM</div>
        <h1>Budget Monitoring<br />& Approval</h1>
        <p className="login-copy">
          Kelola, pantau, ajukan, dan setujui budget dalam satu sistem terintegrasi.
        </p>
        <form onSubmit={submit} className="login-form">
          <label>Username</label>
          <div className="input-with-icon">
            <UserRound size={17} />
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Masukkan username" />
          </div>
          <label>Password</label>
          <div className="input-with-icon">
            <ShieldCheck size={17} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan password" />
          </div>
          <button className="primary-btn full" type="submit">Masuk ke Sistem <ArrowDownLeft size={17} /></button>
        </form>
        <div className="demo-account">
          <strong>Akun demo</strong>
          <span>Admin Biro: <b>admin.biro</b> / 123456</span>
          <span>Admin Pusat: <b>admin.pusat</b> / 123456</span>
        </div>
      </div>
      <div className="login-side">
        <div className="side-content">
          <div className="mini-badge"><Activity size={15} /> REAL-TIME BUDGET MONITORING</div>
          <h2>Control the budget.<br /><span>Decide with confidence.</span></h2>
          <p>
            Dashboard dirancang berdasarkan struktur Unit Entity, Funds Center,
            Commitment Item, dan komponen budget RKAP.
          </p>
          <div className="feature-list">
            <Feature icon={<BarChart3 />} text="Monitoring budget per biro" />
            <Feature icon={<ClipboardCheck />} text="Workflow pengajuan & approval" />
            <Feature icon={<ArrowRightLeft />} text="Realokasi budget terkontrol" />
            <Feature icon={<FileClock />} text="Audit trail setiap perubahan" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, text }) {
  return <div className="feature"><span>{icon}</span>{text}</div>;
}

function Sidebar({ session, page, setPage, onLogout }) {
  const items = [
    { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { key: "budget", label: session.role === "PUSAT" ? "Kelola Budget" : "Detail Budget", icon: <CircleDollarSign size={18} /> },
    { key: "requests", label: session.role === "PUSAT" ? "Approval Request" : "Pengajuan Budget", icon: <ClipboardCheck size={18} /> },
    { key: "reports", label: "Laporan", icon: <BarChart3 size={18} /> },
    { key: "audit", label: "Audit Trail", icon: <History size={18} /> }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-small"><WalletCards size={21} /></div>
        <div>
          <strong>BudgetFlow</strong>
          <span>Finance Control</span>
        </div>
      </div>

      <div className="access-card">
        <div className="avatar">{session.name.slice(0, 1)}</div>
        <div className="access-text">
          <strong>{session.role === "PUSAT" ? "Admin Pusat" : "Admin Biro"}</strong>
          <span>{session.role === "PUSAT" ? "Full Access" : session.fundsCenterCode + " · " + session.fundsCenterName}</span>
        </div>
      </div>

      <nav className="nav-list">
        <span className="nav-label">MENU UTAMA</span>
        {items.map((item) => (
          <button
            key={item.key}
            className={`nav-item ${page === item.key ? "active" : ""}`}
            onClick={() => setPage(item.key)}
          >
            {item.icon}
            <span>{item.label}</span>
            {item.key === "requests" && session.role === "PUSAT" && <em>{/* badge handled by page */}</em>}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="system-status"><span /> Sistem aktif</div>
        <button className="logout-btn" onClick={onLogout}><LogOut size={17} /> Keluar</button>
      </div>
    </aside>
  );
}

function Topbar({ session, onReset }) {
  return (
    <header className="topbar">
      <div>
        <div className="breadcrumb">Finance Control / <strong>{session.role === "PUSAT" ? "Admin Pusat" : session.fundsCenterName}</strong></div>
        <h2>Budget Monitoring & Approval</h2>
      </div>
      <div className="top-actions">
        <button className="icon-btn" title="Reset data demo" onClick={onReset}><RefreshCw size={18} /></button>
        <button className="icon-btn"><Bell size={18} /><span className="notification-dot" /></button>
        <div className="profile-mini">
          <div className="avatar small">{session.name.slice(0, 1)}</div>
          <div><strong>{session.name}</strong><span>{session.role === "PUSAT" ? "Administrator Pusat" : "Pengusul Budget"}</span></div>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}

function Dashboard({ session, budgets, requests, totals, setPage }) {
  const pending = requests.filter((r) => r.status === "Pending").length;
  const approved = requests.filter((r) => r.status === "Approved").length;
  const utilization = totals.consumable ? (totals.consumed / totals.consumable) * 100 : 0;

  return (
    <div className="content">
      <section className="hero-row">
        <div>
          <div className="page-kicker">{session.role === "PUSAT" ? "OVERVIEW PUSAT" : "OVERVIEW BIRO"}</div>
          <h1>{session.role === "PUSAT" ? "Ringkasan seluruh budget" : "Ringkasan budget biro"}</h1>
          <p>Pantau posisi anggaran, pengajuan, dan perubahan budget secara terintegrasi.</p>
        </div>
        <div className="period-chip"><Clock3 size={15} /> Periode 2026 <ChevronDown size={14} /></div>
      </section>

      <section className="kpi-grid">
        <Kpi title="Current Budget" value={compactRupiah(totals.current)} sub="Total RKAP" icon={<WalletCards />} tone="navy" />
        <Kpi title="Consumable Budget" value={compactRupiah(totals.consumable)} sub="Budget yang dibuka" icon={<CircleDollarSign />} tone="blue" />
        <Kpi title="Consumed Budget" value={compactRupiah(totals.consumed)} sub={`${utilization.toFixed(1)}% dari consumable`} icon={<BarChart3 />} tone="purple" />
        <Kpi title="Available Amount" value={compactRupiah(totals.available)} sub={`${compactRupiah(totals.hold)} masih hold`} icon={<Activity />} tone="green" />
      </section>

      <section className="dashboard-grid">
        <div className="panel wide">
          <PanelHeader title="Budget by Funds Center" subtitle="Kondisi budget berdasarkan sumber biaya" action="Detail" onClick={() => setPage("budget")} />
          <BudgetTable budgets={budgets.slice(0, 8)} />
        </div>

        <div className="panel">
          <PanelHeader title={session.role === "PUSAT" ? "Status Pengajuan" : "Pengajuan Saya"} subtitle="Ringkasan request terbaru" />
          <div className="request-summary">
            <div><span>Pending</span><strong>{pending}</strong></div>
            <div><span>Approved</span><strong>{approved}</strong></div>
            <div><span>Rejected</span><strong>{requests.filter((r) => r.status === "Rejected").length}</strong></div>
          </div>
          <button className="secondary-btn full" onClick={() => setPage("requests")}>Lihat semua pengajuan <ArrowDownLeft size={15} /></button>
        </div>
      </section>

      <section className="dashboard-grid bottom">
        <div className="panel">
          <PanelHeader title="Budget Utilization" subtitle="Consumed dibanding Consumable" />
          <div className="utilization">
            <div className="util-circle" style={{ "--progress": `${Math.min(utilization, 100)}%` }}>
              <strong>{utilization.toFixed(1)}%</strong><span>terpakai</span>
            </div>
            <div className="util-copy">
              <div><span>Consumed</span><b>{rupiah(totals.consumed)}</b></div>
              <div><span>Available</span><b>{rupiah(totals.available)}</b></div>
            </div>
          </div>
        </div>
        <div className="panel">
          <PanelHeader title="Business Rules" subtitle="Kontrol konsistensi budget" />
          <div className="rule-list">
            <Rule ok={totals.current >= totals.consumable} text="Current ≥ Consumable" />
            <Rule ok={totals.consumable >= totals.consumed} text="Consumable ≥ Consumed" />
            <Rule ok={totals.available >= 0} text="Available Amount ≥ 0" />
            <Rule ok={totals.hold >= 0} text="Approval Hold ≥ 0" />
          </div>
        </div>
      </section>
    </div>
  );
}

function Kpi({ title, value, sub, icon, tone }) {
  return (
    <div className={`kpi-card ${tone}`}>
      <div className="kpi-icon">{icon}</div>
      <div><span>{title}</span><strong>{value}</strong><small>{sub}</small></div>
    </div>
  );
}

function Rule({ ok, text }) {
  return <div className={`rule ${ok ? "ok" : "bad"}`}>{ok ? <CheckCircle2 size={17} /> : <XCircle size={17} />}<span>{text}</span><em>{ok ? "Valid" : "Invalid"}</em></div>;
}

function PanelHeader({ title, subtitle, action, onClick }) {
  return <div className="panel-header"><div><h3>{title}</h3><p>{subtitle}</p></div>{action && <button className="link-btn" onClick={onClick}>{action} →</button>}</div>;
}

function BudgetTable({ budgets }) {
  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>Funds Center</th><th>Commitment Item</th><th>Current</th><th>Consumed</th><th>Available</th><th>Utilization</th></tr></thead>
        <tbody>
          {budgets.map((b) => (
            <tr key={b.id}>
              <td><strong>{b.fundsCenterCode}</strong><span className="cell-sub">{b.fundsCenterName}</span></td>
              <td><strong>{b.commitmentItemCode}</strong><span className="cell-sub">{b.commitmentItemName}</span></td>
              <td>{rupiah(b.currentBudget)}</td>
              <td>{rupiah(b.consumedBudget)}</td>
              <td className={getAvailable(b) < 0 ? "danger-text" : "positive-text"}>{rupiah(getAvailable(b))}</td>
              <td><Progress value={getUtilization(b)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Progress({ value }) {
  return <div className="progress-cell"><div className="progress-track"><span style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }} /></div><small>{value.toFixed(1)}%</small></div>;
}

function RequestsPage({ session, budgets, requests, onSubmit, onApprove, onReject }) {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const scopedRequests = session.role === "PUSAT"
    ? requests
    : requests.filter((r) => r.fundsCenterCode === session.fundsCenterCode);

  const filtered = filter === "All" ? scopedRequests : scopedRequests.filter((r) => r.status === filter);
  const pending = scopedRequests.filter((r) => r.status === "Pending").length;

  return (
    <div className="content">
      <section className="hero-row">
        <div><div className="page-kicker">{session.role === "PUSAT" ? "WORKFLOW APPROVAL" : "BUDGET REQUEST"}</div><h1>{session.role === "PUSAT" ? "Approval Request" : "Pengajuan Budget"}</h1><p>{session.role === "PUSAT" ? "Review dan putuskan pengajuan budget dari seluruh biro." : "Ajukan kebutuhan budget sesuai Funds Center dan Commitment Item."}</p></div>
        {session.role === "BIRO" && <button className="primary-btn" onClick={() => setShowForm(true)}><Plus size={17} /> Buat Request</button>}
      </section>

      <div className="filter-row">
        {["All", "Pending", "Approved", "Rejected"].map((x) => <button key={x} className={`filter-pill ${filter === x ? "active" : ""}`} onClick={() => setFilter(x)}>{x === "All" ? "Semua" : x}</button>)}
        {session.role === "PUSAT" && <span className="pending-indicator"><span /> {pending} pending approval</span>}
      </div>

      <div className="panel">
        <div className="table-toolbar"><div><h3>Daftar Pengajuan</h3><p>{filtered.length} request ditemukan</p></div><div className="searchbox"><Search size={16} /><input placeholder="Cari request..." /></div></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Request</th><th>Funds Center</th><th>Commitment Item</th><th>Nominal</th><th>Tanggal</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td><strong>{r.id}</strong><span className="cell-sub">{r.createdBy}</span></td>
                  <td>{r.fundsCenterCode}<span className="cell-sub">{r.fundsCenterName}</span></td>
                  <td>{r.commitmentItemCode}<span className="cell-sub">{r.commitmentItemName}</span></td>
                  <td><strong>{rupiah(r.requestAmount)}</strong></td>
                  <td>{r.requestDate}</td>
                  <td><StatusBadge status={r.status} /></td>
                  <td><button className="table-action" onClick={() => setSelected(r)}>Detail</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && <RequestModal budgets={budgets} onClose={() => setShowForm(false)} onSubmit={(p) => { onSubmit(p); setShowForm(false); }} />}
      {selected && <RequestDetail request={selected} session={session} onClose={() => setSelected(null)} onApprove={() => { onApprove(selected); setSelected(null); }} onReject={() => { onReject(selected); setSelected(null); }} />}
    </div>
  );
}

function RequestModal({ budgets, onClose, onSubmit }) {
  const options = budgets.filter((b) => b.commitmentItemCode);
  const [budgetId, setBudgetId] = useState(options[0]?.id || "");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const selected = options.find((b) => b.id === Number(budgetId));

  const submit = (e) => {
    e.preventDefault();
    const nominal = Number(amount);
    if (!selected || !nominal || nominal <= 0) return;
    onSubmit({
      unitEntity: selected.unitEntity,
      fundsCenterCode: selected.fundsCenterCode,
      fundsCenterName: selected.fundsCenterName,
      commitmentItemCode: selected.commitmentItemCode,
      commitmentItemName: selected.commitmentItemName,
      requestAmount: nominal,
      description,
      sourceFundsCenterCode: selected.fundsCenterCode,
      sourceFundsCenterName: selected.fundsCenterName
    });
  };

  return <Modal title="Buat Request Budget" onClose={onClose}>
    <form className="modal-form" onSubmit={submit}>
      <label>Commitment Item</label>
      <select value={budgetId} onChange={(e) => setBudgetId(e.target.value)}>{options.map((b) => <option key={b.id} value={b.id}>{b.commitmentItemCode} — {b.commitmentItemName}</option>)}</select>
      {selected && <div className="availability-box"><span>Available Amount</span><strong>{rupiah(getAvailable(selected))}</strong></div>}
      <label>Nominal Request</label>
      <input type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Contoh: 3000000" required />
      <label>Deskripsi / Tujuan</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Jelaskan kebutuhan budget..." required />
      <label>Lampiran <small>(opsional)</small></label>
      <input type="file" />
      <button className="primary-btn full" type="submit">Submit Request <ArrowDownLeft size={16} /></button>
    </form>
  </Modal>;
}

function RequestDetail({ request, session, onClose, onApprove, onReject }) {
  return <Modal title={`Detail ${request.id}`} onClose={onClose}>
    <div className="detail-grid">
      <Detail label="Status"><StatusBadge status={request.status} /></Detail>
      <Detail label="Nominal">{rupiah(request.requestAmount)}</Detail>
      <Detail label="Funds Center">{request.fundsCenterCode} · {request.fundsCenterName}</Detail>
      <Detail label="Commitment Item">{request.commitmentItemCode} · {request.commitmentItemName}</Detail>
      <Detail label="Tanggal">{request.requestDate}</Detail>
      <Detail label="Pengaju">{request.createdBy}</Detail>
      <div className="detail-full"><span>Keterangan</span><p>{request.description || "-"}</p></div>
      {request.rejectionReason && <div className="rejection-note"><strong>Alasan penolakan</strong><p>{request.rejectionReason}</p></div>}
    </div>
    {session.role === "PUSAT" && request.status === "Pending" && <div className="modal-actions"><button className="danger-btn" onClick={onReject}><XCircle size={16} /> Reject</button><button className="success-btn" onClick={onApprove}><CheckCircle2 size={16} /> Approve</button></div>}
  </Modal>;
}

function Detail({ label, children }) { return <div className="detail-item"><span>{label}</span><strong>{children}</strong></div>; }

function StatusBadge({ status }) {
  const cls = status.toLowerCase().replace(" ", "-");
  return <span className={`status-badge ${cls}`}>{status}</span>;
}

function BudgetPage({ session, budgets, allBudgets, onOpen, onRealokasi, notify }) {
  const [query, setQuery] = useState("");
  const [openModal, setOpenModal] = useState(null);
  const [realokasiModal, setRealokasiModal] = useState(false);

  const filtered = budgets.filter((b) =>
    `${b.fundsCenterName} ${b.commitmentItemName} ${b.commitmentItemCode}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="content">
      <section className="hero-row">
        <div><div className="page-kicker">BUDGET CONTROL</div><h1>{session.role === "PUSAT" ? "Kelola Budget" : "Detail Budget Biro"}</h1><p>{session.role === "PUSAT" ? "Input, pembukaan, dan realokasi budget berdasarkan business rules." : `Data dibatasi untuk Funds Center ${session.fundsCenterCode}.`}</p></div>
        {session.role === "PUSAT" && <button className="primary-btn" onClick={() => setRealokasiModal(true)}><ArrowRightLeft size={17} /> Realokasi Budget</button>}
      </section>

      <div className="panel">
        <div className="table-toolbar"><div><h3>Budget Master</h3><p>Unit Entity + Funds Center + Commitment Item</p></div><div className="searchbox"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari budget..." /></div></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Funds Center</th><th>Commitment Item</th><th>Current</th><th>Consumable</th><th>Consumed</th><th>Available</th><th>Hold</th>{session.role === "PUSAT" && <th>Aksi</th>}</tr></thead>
            <tbody>{filtered.map((b) => <tr key={b.id}>
              <td><strong>{b.fundsCenterCode}</strong><span className="cell-sub">{b.fundsCenterName}</span></td>
              <td><strong>{b.commitmentItemCode}</strong><span className="cell-sub">{b.commitmentItemName}</span></td>
              <td>{rupiah(b.currentBudget)}</td>
              <td>{rupiah(b.consumableBudget)}</td>
              <td>{rupiah(b.consumedBudget)}</td>
              <td className="positive-text">{rupiah(getAvailable(b))}</td>
              <td>{rupiah(getHold(b))}</td>
              {session.role === "PUSAT" && <td><button className="table-action" disabled={getHold(b) <= 0} onClick={() => setOpenModal(b)}>Buka Budget</button></td>}
            </tr>)}</tbody>
          </table>
        </div>
      </div>

      {openModal && <OpeningModal budget={openModal} onClose={() => setOpenModal(null)} onSubmit={(amount) => { onOpen(openModal.id, amount); setOpenModal(null); }} />}
      {realokasiModal && <RealokasiModal budgets={allBudgets} onClose={() => setRealokasiModal(false)} onSubmit={(s,t,a) => { onRealokasi(s,t,a); setRealokasiModal(false); }} />}
    </div>
  );
}

function OpeningModal({ budget, onClose, onSubmit }) {
  const [amount, setAmount] = useState("");
  return <Modal title="Pembukaan Budget" onClose={onClose}>
    <div className="availability-box"><span>Approval Hold Amount</span><strong>{rupiah(getHold(budget))}</strong></div>
    <div className="logic-note">Opening Amount ≤ Approval Hold Amount</div>
    <form className="modal-form" onSubmit={(e) => { e.preventDefault(); onSubmit(amount); }}>
      <label>Opening Amount</label>
      <input type="number" min="1" max={getHold(budget)} value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <button className="primary-btn full" type="submit">Buka Budget</button>
    </form>
  </Modal>;
}

function RealokasiModal({ budgets, onClose, onSubmit }) {
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [amount, setAmount] = useState("");
  const sourceBudget = budgets.find((b) => b.id === Number(source));
  const targets = budgets.filter((b) => b.commitmentItemCode === sourceBudget?.commitmentItemCode && b.id !== sourceBudget?.id);
  return <Modal title="Realokasi Budget" onClose={onClose}>
    <form className="modal-form" onSubmit={(e) => { e.preventDefault(); onSubmit(source, target, amount); }}>
      <label>Sumber Budget</label>
      <select value={source} onChange={(e) => { setSource(e.target.value); setTarget(""); }}>{budgets.map((b) => <option key={b.id} value={b.id}>{b.fundsCenterCode} — {b.commitmentItemName}</option>)}</select>
      {sourceBudget && <div className="availability-box"><span>Available sumber</span><strong>{rupiah(getAvailable(sourceBudget))}</strong></div>}
      <label>Tujuan Budget <small>(Commitment Item sama)</small></label>
      <select value={target} onChange={(e) => setTarget(e.target.value)} disabled={!sourceBudget}><option value="">Pilih tujuan</option>{targets.map((b) => <option key={b.id} value={b.id}>{b.fundsCenterCode} — {b.fundsCenterName}</option>)}</select>
      <label>Nominal Realokasi</label>
      <input type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <button className="primary-btn full" type="submit">Simpan Realokasi</button>
    </form>
  </Modal>;
}

function AuditPage({ audit }) {
  return <div className="content">
    <section className="hero-row"><div><div className="page-kicker">CONTROL & COMPLIANCE</div><h1>Audit Trail</h1><p>Seluruh aktivitas yang mengubah kondisi budget dicatat sebagai histori transaksi.</p></div></section>
    <div className="panel">
      <div className="table-toolbar"><div><h3>Transaction History</h3><p>{audit.length} aktivitas tercatat</p></div><div className="audit-safe"><ShieldCheck size={16} /> Immutable log</div></div>
      <div className="table-wrap"><table><thead><tr><th>Transaction ID</th><th>Type</th><th>Amount</th><th>User</th><th>Date</th><th>Status</th><th>Description</th></tr></thead>
      <tbody>{audit.map((a) => <tr key={a.id}><td><strong>{a.id}</strong></td><td>{a.type}</td><td>{rupiah(a.amount)}</td><td>{a.user}</td><td>{a.date}</td><td><StatusBadge status={a.status} /></td><td>{a.description}</td></tr>)}</tbody></table></div>
    </div>
  </div>;
}

function ReportsPage({ budgets, requests, audit }) {
  const byFund = Object.values(budgets.reduce((acc, b) => {
    const k = b.fundsCenterCode;
    if (!acc[k]) acc[k] = { code: k, name: b.fundsCenterName, current: 0, consumed: 0, available: 0 };
    acc[k].current += b.currentBudget;
    acc[k].consumed += b.consumedBudget;
    acc[k].available += getAvailable(b);
    return acc;
  }, {}));

  return <div className="content">
    <section className="hero-row"><div><div className="page-kicker">REPORTING</div><h1>Laporan & Monitoring</h1><p>Ringkasan penggunaan budget, status pengajuan, dan aktivitas sistem.</p></div></section>
    <div className="kpi-grid three">
      <Kpi title="Total Request" value={requests.length} sub="Seluruh pengajuan" icon={<FileText />} tone="navy" />
      <Kpi title="Approved" value={requests.filter((r) => r.status === "Approved").length} sub="Pengajuan disetujui" icon={<CheckCircle2 />} tone="green" />
      <Kpi title="Audit Activity" value={audit.length} sub="Histori transaksi" icon={<FileClock />} tone="purple" />
    </div>
    <div className="panel"><PanelHeader title="Rekap per Funds Center" subtitle="Monitoring budget per pusat biaya" /><div className="report-bars">{byFund.map((b) => {
      const pct = b.current ? (b.consumed / b.current) * 100 : 0;
      return <div className="bar-row" key={b.code}><div className="bar-label"><strong>{b.code}</strong><span>{b.name}</span></div><div className="bar-track"><span style={{ width: `${Math.min(pct, 100)}%` }} /></div><strong>{pct.toFixed(1)}%</strong></div>;
    })}</div></div>
  </div>;
}

function Modal({ title, onClose, children }) {
  return <div className="modal-backdrop"><div className="modal"><div className="modal-header"><h3>{title}</h3><button className="icon-btn" onClick={onClose}><X size={18} /></button></div>{children}</div></div>;
}

function Toast({ toast, onClose }) {
  return <div className={`toast ${toast.type}`}><span>{toast.type === "success" ? <CheckCircle2 size={18} /> : <XCircle size={18} />}</span><div>{toast.message}</div><button onClick={onClose}><X size={15} /></button></div>;
}

createRoot(document.getElementById("root")).render(<App />);
