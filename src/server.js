"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var client_1 = require("@prisma/client");
var convertHourToMinutes_1 = require("./utils/convertHourToMinutes");
var convertMinutesToHours_1 = require("./utils/convertMinutesToHours");
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use((0, cors_1["default"])());
var prisma = new client_1.PrismaClient();
app.get('/ads', function (req, res) {
    return res.json([1, 2, 3, 3, 3, 3]);
});
app.post('/games/:gameId/createAds', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var gameId, body, ad;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                gameId = req.params.gameId;
                body = req.body;
                return [4 /*yield*/, prisma.ad.create({
                        data: {
                            gameId: gameId,
                            name: body.name,
                            discord: body.discord,
                            weekDays: body.weekDays.join(","),
                            useVoiceChannel: body.useVoiceChannel,
                            yearsPlaying: body.yearsPlaying,
                            hourStart: (0, convertHourToMinutes_1.convertHourToMinutes)(body.hourStart),
                            hourEnd: (0, convertHourToMinutes_1.convertHourToMinutes)(body.hourEnd)
                        }
                    })];
            case 1:
                ad = _a.sent();
                return [2 /*return*/, res.json(ad)];
        }
    });
}); });
app.get('/games', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var games;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.game.findMany({
                    include: {
                        _count: {
                            select: {
                                Ads: true
                            }
                        }
                    }
                })];
            case 1:
                games = _a.sent();
                return [2 /*return*/, res.json(games)];
        }
    });
}); });
app.get('/games/:id/ads', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var gameId, ads;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                gameId = req.params.id;
                return [4 /*yield*/, prisma.ad.findMany({
                        where: {
                            gameId: gameId
                        },
                        select: {
                            id: true,
                            name: true,
                            weekDays: true,
                            useVoiceChannel: true,
                            yearsPlaying: true,
                            hourStart: true,
                            hourEnd: true
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    })];
            case 1:
                ads = _a.sent();
                return [2 /*return*/, res.json(ads.map(function (ad) {
                        return __assign(__assign({}, ad), { weekDays: ad.weekDays.split(","), hourStart: (0, convertMinutesToHours_1.convertMinutesToHour)(ad.hourStart), hourEnd: (0, convertMinutesToHours_1.convertMinutesToHour)(ad.hourEnd) });
                    }))];
        }
    });
}); });
app.get('/ads/:id/discord', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var adId, discord;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                adId = req.params.id;
                return [4 /*yield*/, prisma.ad.findUniqueOrThrow({
                        where: {
                            id: adId
                        },
                        select: {
                            discord: true
                        }
                    })];
            case 1:
                discord = _a.sent();
                return [2 /*return*/, res.json(discord)];
        }
    });
}); });
app.listen(3333);
