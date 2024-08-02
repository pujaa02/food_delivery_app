// import { Request, Response } from "express";
// import Permission from "../models/permissions";
// import Role_Permissions from "../models/role_permissions";

// const role = (role: number, name: string) => {
//     return async (req: Request, res: Response) => {
//         try {
//             const permisssion = await Permission.findOne({ where: { permission_name: name } });
//             const has_permission = await Role_Permissions.findOne({ where: { permission_id: permisssion?.permission_id, role_id: role } })
//             if (!has_permission) {
//                 return false;
//             }
//             return true;
//         } catch (error) {
//             res.status(500).send({ error: 'Internal server error' });
//         }
//     };
// };

// export default role;