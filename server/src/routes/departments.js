import { Router } from "express";
import { prisma } from "../utils/prisma.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
  const depts = await prisma.department.findMany({ orderBy: { name: "asc" } });
  res.json(depts);
});

router.post("/", requireAuth, requireRole("ADMIN", "HR"), async (req, res) => {
  const { name } = req.body;
  if (!name?.trim()) return res.status(400).json({ message: "name is required" });

  const dept = await prisma.department.create({ data: { name: name.trim() } });
  res.json(dept);
});

export default router;
