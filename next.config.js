/** @type {import('next').NextConfig} */
const nextConfig = {
  // eslint-disable-next-line require-await
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth',
        permanent: true,
      },
    ];
  },
  output: 'standalone',
};

module.exports = nextConfig;
