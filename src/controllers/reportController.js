import { Router  } from "express";
import { mythService } from "../services/index.js";

const reportController = Router()

reportController.get('/report/myths/latest', async  (req,res) => {
    try {
    const latestMyths = await mythService.getLatest();
    res.json(latestMyths);
  } catch (err) {
    res.status(500).json({ message: 'Error loading myths' });
  }
})


export default reportController