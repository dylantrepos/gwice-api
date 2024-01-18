import { Application, Request, Response } from "express";

export const routerApp = (app: Application) => {

  app.get('/', (_: Request, res: Response) => res.send({ 
    message: 'Hello World!'
  })); 

  app.get('/check', (_: Request, res: Response) => res.send({ 
    message: 'Hello from the back!'
  })); 
}