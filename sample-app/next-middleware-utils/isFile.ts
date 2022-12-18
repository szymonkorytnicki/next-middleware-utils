const PUBLIC_FILE = /\.(.*)$/;

export function isFile(pathname: string): boolean {
  return PUBLIC_FILE.test(pathname);
}
