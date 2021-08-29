module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["ghtea.github.io"],
  },
  webpack: (config, {isServer}) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
}

