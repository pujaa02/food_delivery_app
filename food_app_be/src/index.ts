import express, { Application } from "express";
const app: Application = express();
import cors from 'cors';
import { generateDocs } from './utils/GenerateDocs';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import http from 'http';
import { Server } from "socket.io";
import { PORT, BASE_URL } from "./config";
import { router } from "./common/routes";


const port = PORT || 8000;
export const prisma = new PrismaClient()
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: BASE_URL,
        methods: ['GET', 'POST'],
        credentials: true,
    },
});
const corsOptions = {
    origin: BASE_URL,
    methods: 'GET, PUT, POST, DELETE',
    credentials: true,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization,token_data',
};
app.use(cors(corsOptions))
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')))
app.use(cookieParser());
app.use(express.json());
app.use(router);

io.on("connection", (socket) => {

    socket.on('message', (msg) => {
        io.emit('message', msg);
    });

    socket.on("joinRoom", (room) => {
        socket.join(room);
    });

    socket.on("leaveRoom", (room) => {
        socket.leave(room);
    });

    socket.on('paymentMade', (data) => {
        io.to('drivers').emit('newNotification',  data );
    });

    socket.on("disconnect", () => {
    })

});
server.listen(port, () => {
    console.log(`Server is running in port: ${port} `);
});


generateDocs(app);
