/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/api/auth/signin',
        permanent: false
      }
    ]
  }
};

export default nextConfig;
