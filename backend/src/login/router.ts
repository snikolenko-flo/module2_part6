import { login } from './handler.js';
import express, { Request, Response } from 'express';
import { FileService } from '../services/file.service.js';
import { log } from '../helper/logger.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import './auth.js';
import * as dotenv from 'dotenv';
dotenv.config();

const secret = process.env.SECRET;
export const loginRouter = express.Router();
export const signUpRouter = express.Router();
const fileService = new FileService();

loginRouter.get('/', async (req: Request, res: Response) => {
  log.info(`Request "${req.originalUrl}" is got.`);
  await fileService.sendFile(req, res, './built/frontend/html/login.html', 'text/html');
});

signUpRouter.get('/', async (req: Request, res: Response) => {
  log.info(`Request "${req.originalUrl}" is got.`);
  await fileService.sendFile(req, res, './built/frontend/html/signup.html', 'text/html');
});

signUpRouter.post(
  '/',
  passport.authenticate('signup', { session: false }),
  async (req, res) => {
    const body = { email: req.body.email };
    const token = jwt.sign({ user: body }, secret);
    return res.json({ token });
  }
);

loginRouter.post(
  '/',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      { successRedirect: '/', failureRedirect: '/login' },
      async (err, user) => {
        try {
          if (err || !user) {
            const error = new Error(`An error ${err} has occurred for user ${user}.`);

            log.error('Email or password are invalid.');
            res.statusCode = 401;
            res.end(JSON.stringify({ errorMessage: 'Email or password are invalid.' }));
            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, secret);

              return res.json({ token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);
