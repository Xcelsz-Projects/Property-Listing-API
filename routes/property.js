import { Router } from "express";
import { createProperty, getAllProperties, getPropertyById, updateProperty } from "../controllers/property.js";

const propertyRouter = Router();

propertyRouter.post('/properties', createProperty);
propertyRouter.get('/properties', getAllProperties);
propertyRouter.get('/properties/:id', getPropertyById);
propertyRouter.patch('/properties/:id', updateProperty);

export default propertyRouter;