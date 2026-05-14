import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Include content YAML files in the serverless function bundle on Vercel
  outputFileTracingIncludes: {
    "/**": ["./content/**/*"],
  },
};

export default nextConfig;
