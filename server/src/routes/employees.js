import { Router } from "express";
import { prisma } from "../utils/prisma.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
  const employees = await prisma.employee.findMany({
    include: { department: true },
    orderBy: { createdAt: "desc" }
  });
  res.json(employees);
});

router.post("/", requireAuth, requireRole("ADMIN", "HR"), async (req, res) => {
  const { employeeCode, fullName, email, title, departmentId } = req.body;
  if (!employeeCode || !fullName || !email) {
    return res.status(400).json({ message: "employeeCode, fullName, email are required" });
  }

  const emp = await prisma.employee.create({
    data: {
      employeeCode,
      fullName,
      email,
      title: title || null,
      departmentId: departmentId || null
    }
  });

  res.json(emp);
});

router.delete("/:id", requireAuth, requireRole("ADMIN", "HR"), async (req, res) => {
  await prisma.employee.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
});

export default router;
