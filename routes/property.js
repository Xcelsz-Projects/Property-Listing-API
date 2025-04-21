import { Router } from "express";
import { createProperty, getAllProperties, getPropertyById } from "../controllers/property.js";

const propertyRouter = Router();

propertyRouter.post('/properties', createProperty);
propertyRouter.get('/properties', getAllProperties);
propertyRouter.get('/properties/:id', getPropertyById);

export default propertyRouter;