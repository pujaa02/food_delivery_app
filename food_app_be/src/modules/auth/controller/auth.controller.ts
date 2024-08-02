/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '../../../config';
import { checkUserexist } from '../../user/repository/user.repository';
import { Payload, UserAttributes } from '../../user/types/user';
import { getalldata } from '../repository/auth.repository';
import generalResponse from '../../../common/helper/generalReponse';

const login = async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const pass: string = req.body.password;
    const jwtsecret: string | undefined = JWT_SECRET;

    try {
        const result = await checkUserexist(email);
        if (result?.password) {
            const password: string | null = result.password;
            const isPassSame: boolean = await bcrypt.compare(pass, password);
            if (isPassSame) {
                const payload: Payload = {
                    user_id: result.id,
                    email: result.email,
                    name: result.fname,
                    role_id: result.role_id,
                };
                const token: string = jwt.sign(
                    payload,
                    jwtsecret as string,
                    { expiresIn: "1h" },
                );
                res.cookie('token', token).status(200).json({
                    msg: "Success", user: result
                });

            } else {
                res.json({ msg: "failed" });
            }
        } else {
            res.json({ msg: "user not found" });
        }

    } catch (error) {
        return res.status(500).send({ message: "failed" });
    }
};

const getLoggedIn = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const result = await getalldata(user)
        return generalResponse(res, result, result?.message, result?.success, false, 200)
    } catch (error) {
        return generalResponse(res, "", "error occured", false, false, 400);
    }
}

export default { login, getLoggedIn }