export const storage = {
  get(key: string): any | null {
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : null;
  },
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key: string): void {
    localStorage.removeItem(key);
  },
};
