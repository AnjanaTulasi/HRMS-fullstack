import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function Section({ title, children }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 16, marginTop: 16, border: "1px solid #eee" }}>
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      {children}
    </div>
  );
}

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [depts, setDepts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);

  const authHeaders = useMemo(() => ({
    headers: { Authorization: `Bearer ${token}` }
  }), [token]);

  async function register(role = "HR") {
    await axios.post(`${API}/api/auth/register`, { email, password, role });
    alert("Registered! Now login.");
  }

  async function login(e) {
    e.preventDefault();
    const res = await axios.post(`${API}/api/auth/login`, { email, password });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
  }

  async function loadAll() {
    if (!token) return;
    const [d, e, l] = await Promise.all([
      axios.get(`${API}/api/departments`, authHeaders),
      axios.get(`${API}/api/employees`, authHeaders),
      axios.get(`${API}/api/leaves`, authHeaders)
    ]);
    setDepts(d.data);
    setEmployees(e.data);
    setLeaves(l.data);
  }

  useEffect(() => { loadAll(); }, [token]); // eslint-disable-line

  async function addDept() {
    const name = prompt("Department name?");
    if (!name) return;
    await axios.post(`${API}/api/departments`, { name }, authHeaders);
    loadAll();
  }

  async function addEmployee() {
    const employeeCode = prompt("Employee Code (e.g., EMP001)?");
    const fullName = prompt("Full name?");
    const empEmail = prompt("Email?");
    if (!employeeCode || !fullName || !empEmail) return;

    const departmentId = depts[0]?.id || null;

    await axios.post(`${API}/api/employees`, {
      employeeCode,
      fullName,
      email: empEmail,
      title: "Engineer",
      departmentId
    }, authHeaders);

    loadAll();
  }

  async function requestLeave(employeeId) {
    const fromDate = prompt("From date (YYYY-MM-DD)?");
    const toDate = prompt("To date (YYYY-MM-DD)?");
    const reason = prompt("Reason?");
    if (!fromDate || !toDate || !reason) return;

    await axios.post(`${API}/api/leaves`, { employeeId, fromDate, toDate, reason }, authHeaders);
    loadAll();
  }

  async function setLeaveStatus(id, status) {
    await axios.patch(`${API}/api/leaves/${id}/status`, { status }, authHeaders);
    loadAll();
  }

  if (!token) {
    return (
      <div style={{ maxWidth: 420, margin: "40px auto", fontFamily: "system-ui" }}>
        <h1>HRMS</h1>
        <p style={{ color: "#555" }}>
          Quick start: enter email + password → click <b>Register as HR</b> → then <b>Login</b>.
        </p>

        <form onSubmit={login} style={{ display: "grid", gap: 10 }}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" style={{ padding: 10 }} />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" style={{ padding: 10 }} />
          <button style={{ padding: 10 }}>Login</button>
        </form>

        <button onClick={() => register("HR")} style={{ padding: 10, marginTop: 10, width: "100%" }}>
          Register as HR
        </button>
        <button onClick={() => register("ADMIN")} style={{ padding: 10, marginTop: 10, width: "100%" }}>
          Register as ADMIN
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1050, margin: "24px auto", fontFamily: "system-ui", padding: "0 12px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0 }}>HRMS Dashboard</h1>
          <div style={{ color: "#666", marginTop: 4 }}>Backend: {API}</div>
        </div>
        <button onClick={() => { localStorage.removeItem("token"); setToken(""); }} style={{ padding: "8px 12px" }}>
          Logout
        </button>
      </header>

      <Section title="Departments">
        <button onClick={addDept} style={{ padding: "8px 12px" }}>+ Add Department</button>
        <ul>
          {depts.map(d => <li key={d.id}>{d.name}</li>)}
        </ul>
      </Section>

      <Section title="Employees">
        <button onClick={addEmployee} style={{ padding: "8px 12px" }}>+ Add Employee</button>
        <div style={{ overflowX: "auto" }}>
          <table border="1" cellPadding="8" style={{ marginTop: 10, width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Code</th><th>Name</th><th>Email</th><th>Dept</th><th>Leave</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(e => (
                <tr key={e.id}>
                  <td>{e.employeeCode}</td>
                  <td>{e.fullName}</td>
                  <td>{e.email}</td>
                  <td>{e.department?.name || "-"}</td>
                  <td><button onClick={() => requestLeave(e.id)}>Request</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Leave Requests of employees">
        <div style={{ overflowX: "auto" }}>
          <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Employee</th><th>From</th><th>To</th><th>Reason</th><th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map(l => (
                <tr key={l.id}>
                  <td>{l.employee?.fullName}</td>
                  <td>{new Date(l.fromDate).toLocaleDateString()}</td>
                  <td>{new Date(l.toDate).toLocaleDateString()}</td>
                  <td>{l.reason}</td>
                  <td>{l.status}</td>
                  <td>
                    <button onClick={() => setLeaveStatus(l.id, "APPROVED")}>Approve</button>{" "}
                    <button onClick={() => setLeaveStatus(l.id, "REJECTED")}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
