import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const WHITELISTED_IPS = [
  "129.126.179.57/32", // # Hive
  "129.126.179.57/32", //# Hive Silvergate
  "57.140.24.24/32", // # Hive Lightsaber
  "8.29.230.18/31", // # Cloudflare
  "8.29.230.0/24", // # Cloudflare CIDR
  "8.29.230.18/31", // # Cloudflare
  "13.212.79.60/32", // # GovTech SOE VPN
  "104.30.161.22/32", // # Cloudflare New IP
  "104.30.161.23/32", // # Cloudflare New IP
  "104.30.161.24/32", // # Cloudflare New IP
  "104.30.161.25/32", // # Cloudflare New IP
  "10.120.99.27/32", //
  "10.120.99.28/32", //
  "10.122.99.27/32", //
  "10.122.99.28/32", //
  "57.140.24.0/16", //
  "104.30.161.22",
  "129.126.176.49/32", // MBC10
  "129.126.176.50/31", // MBC10
  "129.126.176.52/31", // MBC10
  "129.126.176.54/32", // MBC10

  "129.126.176.137/32", // MBC30
  "129.126.176.138/31", // MBC30
  "129.126.176.140/31", // MBC30
  "129.126.176.142/32", // MBC30

  "129.126.179.57/32", // HIVE
  "129.126.179.58/31", // HIVE
  "129.126.179.60/31", // HIVE
  "129.126.179.62/32", // HIVE
];

function isIpInRange(ip: string, cidr: string): boolean {
  try {
    // Handle exact IP match
    if (!cidr.includes("/")) {
      return ip.trim() === cidr.trim();
    }

    // Simple CIDR check (for demonstration)
    const [range, bits] = cidr.split("/");
    const ipParts = ip.split(".").map(Number);
    const rangeParts = range.split(".").map(Number);
    const mask = ~((1 << (32 - Number(bits))) - 1);

    let ipNum = 0;
    let rangeNum = 0;

    for (let i = 0; i < 4; i++) {
      ipNum = (ipNum << 8) | ipParts[i];
      rangeNum = (rangeNum << 8) | rangeParts[i];
    }

    return (ipNum & mask) === (rangeNum & mask);
  } catch (error) {
    console.error("Error checking IP range:", error);
    return false;
  }
}

export function middleware(request: NextRequest) {
  const clientIp = request.headers.get("x-real-ip");
  if (!clientIp) {
    return NextResponse.next();
  }

  const hasAccess = WHITELISTED_IPS.some(
    (range) => clientIp && isIpInRange(clientIp, range),
  );

  if (!hasAccess) {
    request.nextUrl.pathname = "/restricted";
    return NextResponse.rewrite(request.nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dependency", "/dashboard", "/api/:path*"],
};
