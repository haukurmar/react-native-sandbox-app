import { createContext, useContext, useEffect } from "react";
import { SharedValue, useSharedValue } from "react-native-reanimated";
import { usePathname } from "expo-router";

interface ScrollContextType {
  scrollY: SharedValue<number>;
  lastScrollY: SharedValue<number>;
  isScrollingDown: SharedValue<boolean>;
  hideStartPosition: SharedValue<number>;
  scrollUpDistance: SharedValue<number>;
  resetScroll: () => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const scrollY = useSharedValue(0);
  const lastScrollY = useSharedValue(0);
  const isScrollingDown = useSharedValue(true);
  const hideStartPosition = useSharedValue(0);
  const scrollUpDistance = useSharedValue(0);
  const pathname = usePathname();

  const resetScroll = () => {
    scrollY.value = 0;
    lastScrollY.value = 0;
    isScrollingDown.value = false;
    hideStartPosition.value = 0;
    scrollUpDistance.value = 0;
  };

  // Reset scroll values on route change
  useEffect(() => {
    resetScroll();
  }, [pathname]);

  return (
    <ScrollContext.Provider
      value={{
        scrollY,
        lastScrollY,
        isScrollingDown,
        hideStartPosition,
        scrollUpDistance,
        resetScroll,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollContext must be used within a ScrollProvider");
  }
  return context;
};
