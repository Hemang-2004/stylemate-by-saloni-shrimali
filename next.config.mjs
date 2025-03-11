/** @type {import('next').NextConfig} */
const nextConfig = {};

export default {
    reactStrictMode: true,
    env: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
  };
  
