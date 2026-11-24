import { config } from "dotenv";

config({ path: process.cwd() + "/" + ".env" });

export const NAVER_ID = String(process.env.NAVER_ID);
export const NAVER_PASS = String(process.env.NAVER_PASS);
