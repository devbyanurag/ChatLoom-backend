import { Request, Response, Router } from "express";
const router_user = Router();



router_user.get('/categories', async (req: Request, res: Response) => {
    try {
        // const data = await userModel.find({});
       
        res.json({ data: "data" });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



export { router_user }
