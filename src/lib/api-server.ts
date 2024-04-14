import { createCaller, createTRPCContext } from "~/server";

const createContext = async () => {
   return createTRPCContext();
};

export const servercaller = createCaller(createContext);
