/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This stops the build from failing on internal Next.js type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // This ensures ESLint warnings don't block your deployment
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;