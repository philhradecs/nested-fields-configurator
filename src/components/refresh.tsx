import { atom, useAtomValue, useSetAtom } from "jotai";

const refreshTokenAtom = atom(Date.now());
export const useRefreshToken = () => useAtomValue(refreshTokenAtom);
export const useRefreshRuleOptions = () => {
  const set = useSetAtom(refreshTokenAtom);

  return () => {
    console.warn("refreshing rule options with delay");
    setTimeout(() => set(Date.now()), 50);
  };
};
