// @ts-check

/** @type {import('next').NextConfig} **/
const NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = NextConfig
