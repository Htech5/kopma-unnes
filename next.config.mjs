/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  output: "standalone",
  experimental: {
    turbopack: false,
  },
  images: {
    // ponytail: /_next/image is 403 on the LiteSpeed host (WAF blocks the route).
    // Serve originals directly; drop this once the host allows /_next/image.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.ukmkopmaunnes.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "ukmkopmaunnes.com",
        pathname: "/uploads/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // 'unsafe-inline' masih diperlukan Next runtime; 'unsafe-eval' dibuang.
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://api.ukmkopmaunnes.com https://ukmkopmaunnes.com",
              "font-src 'self' data:",
              "connect-src 'self' https://api.ukmkopmaunnes.com https://ukmkopmaunnes.com",
              "frame-src 'self'",
              "media-src 'self' data: blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [];
  },
  async rewrites() {
    return [];
  },
};
export default nextConfig;
