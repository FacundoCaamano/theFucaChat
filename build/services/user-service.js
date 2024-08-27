"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const bcrypt_1 = require("bcrypt");
const message_model_1 = __importDefault(require("../models/message.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield (0, bcrypt_1.genSalt)(10);
    const passHash = yield (0, bcrypt_1.hash)(password, salt);
    const newUser = yield message_model_1.default.create({ userName: username, password: passHash });
    const token = generateToken(newUser._id.toString());
    return { user: newUser };
});
exports.register = register;
const generateToken = (userId) => {
    const key = process.env.SECRET_KEY;
    const token = jsonwebtoken_1.default.sign(userId, key);
    return token;
};
