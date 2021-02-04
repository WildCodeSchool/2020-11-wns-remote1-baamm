import { Request, Response, Router } from "express";
import verifyToken from '../middleware/verifyToken';

const postRoute = Router();

postRoute.get('/', verifyToken, (req: Request, res: Response) => {
    res.json({
        posts : {
            title: 'my favourite song', 
            description: '2pac'
        }
    })
})

export default postRoute;