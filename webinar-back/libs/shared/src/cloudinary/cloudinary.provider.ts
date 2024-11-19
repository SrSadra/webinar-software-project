import { ConfigOptions, v2 } from "cloudinary";

export const CloudinaryProvider = {
    provide: "cloudinary",
    useFactory: (): ConfigOptions => {
      return v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
    },
  };