import Record from "../models/recordModel.js";

export const createRecord = async (req, res) => {
  try {
    const record = await Record.create({
      ...req.body,
      createdBy: req.user.id
    });
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getRecords = async (req, res) => {
  try {
    const { type, category } = req.query;

    const filter = {};
    if (type) filter.type = type;
    if (category) filter.category = category;

    const records = await Record.find(filter);

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const updateRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  } 
};

export const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json({ message: "Record deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const filterRecordsByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) return res.status(400).json({ message: "Category query parameter is required" });

    const records = await Record.find({ category });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const filterRecordsByType = async (req, res) => {
  try {
    const { type } = req.query;
    if (!type) return res.status(400).json({ message: "Type query parameter is required" });  
    const records = await Record.find({ type });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};  
export const filterRecordByTypeAndCategory = async (req, res) => {
  try {
    const { type, category } = req.query;
    if (!type || !category) return res.status(400).json({ message: "Type and Category query parameters are required" });

    const records = await Record.find
      ({ type, category });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }   
};