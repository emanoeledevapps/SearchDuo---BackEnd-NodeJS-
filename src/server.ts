import express from "express";
import cors from 'cors';
import {PrismaClient} from '@prisma/client';
import { convertHourToMinutes } from "./utils/convertHourToMinutes";
import { convertMinutesToHour } from "./utils/convertMinutesToHours";

const app = express();
app.use(express.json());
app.use(cors());
const prisma = new PrismaClient();

app.get('/ads', (req, res) => {
    return res.json([1,2,3,3,3,3]);
});

app.post('/games/:gameId/createAds', async (req, res) => {
    const gameId = req.params.gameId;
    const body = req.body;

    const ad = await prisma.ad.create({
        data:{
            gameId,
            name: body.name,
            discord: body.discord,
            weekDays: body.weekDays.join(","),
            useVoiceChannel: body.useVoiceChannel,
            yearsPlaying: body.yearsPlaying,
            hourStart: convertHourToMinutes(body.hourStart),
            hourEnd: convertHourToMinutes(body.hourEnd),
        }
    })

    return res.json(ad);
});

app.get('/games', async (req, res) => {
    const games = await prisma.game.findMany({
        include:{
            _count:{
                select:{
                    Ads: true
                }
            }
        }
    });
    return res.json(games);
})

app.get('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id;

    const ads = await prisma.ad.findMany({
        where:{
            gameId
        },
        select:{
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        orderBy:{
            createdAt: 'desc'
        }
    })

    return res.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(","),
            hourStart: convertMinutesToHour(ad.hourStart),
            hourEnd: convertMinutesToHour(ad.hourEnd),
        }
    }));
})

app.get('/ads/:id/discord', async (req, res) => {
    const adId = req.params.id;

    const discord = await prisma.ad.findUniqueOrThrow({
        where:{
            id: adId
        },
        select:{
            discord: true,
        }
    })

    return res.json(discord);
})

app.listen(3333);