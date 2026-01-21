/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: Ini membiarkan build sukses meski ada error ESLint
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: Ini membiarkan build sukses meski ada error TypeScript
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig