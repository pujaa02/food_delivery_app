import { Request, Response } from 'express';
import { chataddQuery, chatgetQuery } from '../repository/chat.repository';


const addchatdata = async (req: Request, res: Response) => {
    try {
        await chataddQuery({
            sender_id: (req.body.sender_id),
            receiver_id: (req.body.receiver_id),
            message: (req.body.message)
        })
        res.status(200).send({ message: 'success' });
    } catch (error) {
        return res.status(500).send({ message: 'failed' });
    }
};

const getchatdata = async (req: Request, res: Response) => {
    try {
        const result = await chatgetQuery()
        res.status(200).send({ message: 'success', result: result });
    } catch (error) {
        return res.status(500).send({ message: 'failed' });
    }
};


export default { addchatdata, getchatdata }