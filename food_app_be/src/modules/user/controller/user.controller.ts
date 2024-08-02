import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { RestaurantAttributes } from '../../restaurant/types/restaurant.types';
import { MenuAttributes } from '../../menu/types/menu.types';
import { menuFetchQuery } from '../../menu/repository/menu.repository';
import { restaurantFetchQuery } from '../../restaurant/repository/restaurant.repository';
import { checkUserexist, userAddQuery, findUser, userUpdateQuery, userFetchquery } from '../repository/user.repository';
import { UserAttributes } from '../types/user';
import { driverAddQuery } from '../../driver/repository/driver.repository';

function createRandomString(length: number): string {
  const chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result: string = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const adduser = async (req: Request, res: Response) => {
  try {
    const checkuser: UserAttributes | null = await checkUserexist(req.body.email);
    if (checkuser) {
      res.json({ message: 'user already exist' });
    } else {
      bcrypt.hash(req.body.password, 7, async (error, hashedPassword) => {
        const result: UserAttributes = await userAddQuery({
          fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email,
          phone: req.body.phone,
          gender: req.body.gender,
          bd: new Date(req.body.bd),
          password: hashedPassword,
          access_key: createRandomString(12),
          role_id: req.body.role_id,
          city: req.body.city,
          state: req.body.state,
          street: req.body.street,
          pincode: req.body.pincode,
        });
        if (result && result.role_id === 3) {
          await driverAddQuery(result.id)
        }
        res.status(200).send({
          message: 'user Created Successfully',
          user_id: result.id,
        });
        if (error) {
          return res.status(500).send({ message: 'failed' });
        }
      });
    }
  } catch (error) {
    return res.status(500).send({ message: 'failed' });
  }
};



const updateuser = async (req: Request, res: Response) => {
  const user_id: number = Number(req.params.user_id);
  try {
    const checkuser = await findUser(user_id);
    const date = new Date(req.body.bd)
    if (checkuser) {
      const result: { count: number } = await userUpdateQuery(
        { id: Number(user_id) },
        {
          fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email,
          phone: (req.body.phone),
          gender: req.body.gender,
          bd: date,
          role_id: Number(req.body.role_id),
          city: req.body.city || "",
          state: req.body.state || "",
          street: req.body.street || "",
          pincode: req.body.pincode || "",
        },
      );
      if (result.count > 0) {
        res.status(200).send({
          message: 'user updated Successfully',
        });
      } else {
        res.status(200).send({
          message: 'Operation Failed',
        });
      }
    } else {
      res.status(200).send({ message: 'user already exist' });
    }
  } catch (error) {
    return res.status(500).send({ message: 'failed' });
  }
};

const deleteuser = async (req: Request, res: Response) => {
  const user_id: number = Number(req.params.user_id);
  try {
    const checkuser = await findUser(user_id);
    if (checkuser) {
      const result: { count: number } = await userUpdateQuery({ id: user_id }, { deletedAt: new Date() });
      if (result.count > 0) {
        res.status(200).send({
          message: 'user deleted Successfully',
        });
      } else {
        res.status(200).send({
          message: 'Operation Failed',
        });
      }
    } else {
      res.status(200).send({ message: 'user does not exist' });
    }
  } catch (error) {
    return res.status(500).send({ message: 'failed' });
  }
};

const updatepassword = async (req: Request, res: Response) => {
  try {
    const checkuser = await checkUserexist(req.body.email);
    if (checkuser) {
      bcrypt.hash(req.body.password, 7, async (error, hashedPassword) => {
        await userUpdateQuery({ email: req.body.email }, { password: hashedPassword });
        res.status(200).send({
          message: 'password updated successfully',
        })
        if (error) {
          return res.status(500).send({ message: 'failed' });
        }
      })
    } else {
      res.status(200).send({ message: 'user does not exist' });
    }
  } catch (error) {
    return res.status(500).send({ message: 'failed' });
  }
};

const getalldata = async (req: Request, res: Response) => {
  try {
    const users: UserAttributes[] = await userFetchquery({ deletedAt: null, NOT: { role_id: 1 } });
    const restaurants: RestaurantAttributes = await restaurantFetchQuery({ deletedAt: null });
    const menus: MenuAttributes[] = await menuFetchQuery({ deletedAt: null });

    res.status(200).send({
      message: 'Successfully get users',
      users: users,
      restaurants: restaurants,
      menus: menus
    });
  } catch (error) {
    return res.status(500).send({ message: 'failed' });
  }
};
export default { adduser, getalldata, updateuser, deleteuser, updatepassword };
