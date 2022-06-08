import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
  //will show only undefined orderid
  const tickets = await Ticket.find({
    orderId: undefined,
  });
  res.send(tickets);
});

export { router as indexTickerRouter };
