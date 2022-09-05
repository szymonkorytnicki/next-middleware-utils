const PUBLIC_FILE = /\.(.*)$/;

export function isPage(pathname: string): boolean {
  return !(pathname.startsWith("/_next") || pathname.includes("/api/") || PUBLIC_FILE.test(pathname));
}
