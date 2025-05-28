import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async headers() {
    return [{
      source: "/embed",
      headers: [{
        key: "Content-Security-Policy",
        value: "frame-src 'self' htpps://roadsidecoder.created.app"
      }]
    }]
  }
}

export default nextConfig