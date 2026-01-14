import { Router } from "express";
import { prisma } from "../utils/prisma.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
  const leaves = await prisma.leaveRequest.findMany({
    include: { employee: true },
    orderBy: { createdAt: "desc" }
  });
  res.json(leaves);
});

router.post("/", requireAuth, async (req, res) => {
  const { employeeId, fromDate, toDate, reason } = req.body;
  if (!employeeId || !fromDate || !toDate || !reason) {
    return res.status(400).json({ message: "employeeId, fromDate, toDate, reason are required" });
  }

  const leave = await prisma.leaveRequest.create({
    data: {
      employeeId,
      fromDate: new Date(fromDate),
      toDate: new Date(toDate),
      reason
    }
  });

  res.json(leave);
});

router.patch("/:id/status", requireAuth, requireRole("ADMIN", "HR"), async (req, res) => {
  const { status } = req.body; // PENDING/APPROVED/REJECTED
  const updated = await prisma.leaveRequest.update({
    where: { id: req.params.id },
    data: { status }
  });
  res.json(updated);
});

export default router;
