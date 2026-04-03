import { getSummary } from "../services/summaryService.js";

export const fetchSummary = async (req, res) => {
  try {
    const data = await getSummary(req.user.id, req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
