import { Request, Response } from 'express';
import { RatingAttributes } from '../types/rating.types';
import { ratingAddQuery2, ratingFetchquery } from '../repository/rating.repository';

const addrating = async (req: Request, res: Response) => {
  try {
    await ratingAddQuery2({
      user_id: Number(req.params.user_id),
      menu_id: Number(req.params.menu_id),
      rating: Number(req.body.rating),
      content: req.body.content.toString() || ''
    })
    res.status(200).send({ message: 'success' });
  } catch (error) {
    return res.status(500).send({ message: 'failed' });
  }
};

const fetchrating = async (req: Request, res: Response) => {
  try {
    const result: RatingAttributes[] = await ratingFetchquery();
    res.status(200).send({ message: 'success', data: result });
  } catch (error) {
    return res.status(500).send({ message: 'failed' });
  }
};


export default { addrating, fetchrating };
