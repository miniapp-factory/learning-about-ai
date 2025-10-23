"use client";

import { createContext, useContext, useEffect, useState } from "react";
import sdk, { Context } from "@farcaster/miniapp-sdk";
import { MiniAppSDK } from "@farcaster/miniapp-sdk/dist/types";

export interface MiniAppContext {
  sdk: MiniAppSDK;
  context: Context.MiniAppContext | undefined;
  isInMiniApp: boolean | undefined;
  unlockedLessons: string[];
  unlockLesson: (id: string) => void;
  isLessonUnlocked: (id: string) => boolean;
}
const defaultSettings: MiniAppContext = {
  sdk,
  context: undefined,
  isInMiniApp: undefined,
  unlockedLessons: [],
  unlockLesson: () => {},
  isLessonUnlocked: () => false,
};
const MiniAppContext = createContext<MiniAppContext>(defaultSettings);

export function MiniAppProvider({ children }: { children: React.ReactNode }) {
  const [context, setContext] = useState<MiniAppContext>(defaultSettings);
  const [unlockedLessons, setUnlockedLessons] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("unlockedLessons");
    if (stored) setUnlockedLessons(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("unlockedLessons", JSON.stringify(unlockedLessons));
  }, [unlockedLessons]);

  const unlockLesson = (id: string) => {
    setUnlockedLessons((prev) => {
      if (!prev.includes(id)) return [...prev, id];
      return prev;
    });
  };

  const isLessonUnlocked = (id: string) => unlockedLessons.includes(id);

  useEffect(() => {
    const ready = async () => {
      await Promise.all([
        sdk.context
          .then((ctx) =>
            setContext((oldContext) => {
              return { ...oldContext, context: ctx };
            })
          )
          .catch(console.error),
        sdk
          .isInMiniApp()
          .then((isInMiniApp) =>
            setContext((oldContext) => {
              return { ...oldContext, isInMiniApp };
            })
          )
          .catch(console.error),
      ]);

      await sdk.actions.ready().catch(console.error);
    };

    ready();
  }, []);

  const value: MiniAppContext = {
    ...context,
    unlockedLessons,
    unlockLesson,
    isLessonUnlocked,
  };

  return (
    <MiniAppContext.Provider value={value}>
      {children}
    </MiniAppContext.Provider>
  );
}

export function useMiniAppContext() {
  return useContext(MiniAppContext);
}
