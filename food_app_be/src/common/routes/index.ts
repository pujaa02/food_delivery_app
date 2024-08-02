import { Request, Response, Router } from "express";
import passport from "passport";
import { auth } from "../../middlewares/auth";
import { adminrouter } from "../../modules/admin/routes/admin.routes";
import { cartrouter } from "../../modules/cart/routes/cart.routes";
import { chatrouter } from "../../modules/chat/routes/chat.routes";
import { driverrouter } from "../../modules/driver/routes/driver.routes";
import { homerouter } from "../../modules/home/routes/home.routes";
import { menurouter } from "../../modules/menu/routes/menu.routes";
import { orderrouter } from "../../modules/order/routes/order.routes";
import { ratingrouter } from "../../modules/rating/routes/rating.routes";
import { restaurantrouter } from "../../modules/restaurant/routes/restaurant.routes";
import userController from "../../modules/user/controller/user.controller";
import { userrouter } from "../../modules/user/routes/user.routes";
import { userValidation } from "../../modules/user/validations/user";
import loginController from "../../modules/auth/controller/auth.controller";
import { authrouter } from "../../modules/auth/routes/auth.routes";
import { notificationrouter } from "../../modules/notifications/routes/notification.routes";
auth(passport);
export const router = Router();

router.use(
    '/v1/admin',
    passport.authenticate('jwt', {
        session: false,
        failureRedirect: '/login',
    }),
    adminrouter,
);

router.use(
    '/v1/user',
    passport.authenticate('jwt', {
        session: false,
        failureRedirect: '/login',
    }),
    userrouter,
);

router.use(
    '/v1/restaurant',
    passport.authenticate('jwt', {
        session: false,
        failureRedirect: '/login',
    }),
    restaurantrouter,
);

router.use(
    '/v1/menu',
    passport.authenticate('jwt', {
        session: false,
        failureRedirect: '/login',
    }),
    menurouter,
);

router.use(
    '/v1/driver',
    passport.authenticate('jwt', {
        session: false,
        failureRedirect: '/login',
    }),
    driverrouter,
);

router.use(
    '/v1/notification',
    passport.authenticate('jwt', {
        session: false,
        failureRedirect: '/login',
    }),
    notificationrouter,
);

router.use(
    '/v1/cart',
    passport.authenticate('jwt', {
        session: false,
        failureRedirect: '/login',
    }),
    cartrouter,
);
router.use(
    '/v1/rating',
    passport.authenticate('jwt', {
        session: false,
        failureRedirect: '/login',
    }),
    ratingrouter,
);

router.use(
    '/v1/order',
    passport.authenticate('jwt', {
        session: false,
        failureRedirect: '/login',
    }),
    orderrouter,
);

router.use(
    '/v1/chat',
    passport.authenticate('jwt', {
        session: false,
        failureRedirect: '/login',
    }),
    chatrouter,
);

router.use(
    '/v1/home',
    homerouter,
);

router.use(
    '/v1/auth',
    authrouter
);


router.use('/v1/login', loginController.login);
router.use('/v1/register', userValidation, userController.adduser);

router.use("/v1/updatepass", userController.updatepassword);

router.use('/dashboard', (req: Request, res: Response) => {
    res.json({ msg: 'welcome Please Login First' });
});
router.use('/v1/logout', (req: Request, res: Response) => {
    res.clearCookie('token').json('logout sucessfully');
});
