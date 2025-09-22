import React, { createContext, useContext, useMemo, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

type Ctx = {
  total: number;
  value: Animated.Value;
  setStep: (n: number, opts?: { immediate?: boolean }) => void;
};

const SignupProgressCtx = createContext<Ctx | null>(null);

export const SignupProgressProvider: React.FC<{
  totalSteps: number;
  initialStep?: number;
  children: React.ReactNode;
}> = ({ totalSteps, initialStep = 1, children }) => {
  const animated = useRef(new Animated.Value(initialStep)).current;

  const setStep = (n: number, opts?: { immediate?: boolean }) => {
    if (opts?.immediate) {
      animated.setValue(n);
      return;
    }
    Animated.timing(animated, {
      toValue: n,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };

  const ctx = useMemo(
    () => ({ total: totalSteps, value: animated, setStep }),
    [totalSteps, animated],
  );

  return (
    <SignupProgressCtx.Provider value={ctx}>
      {children}
    </SignupProgressCtx.Provider>
  );
};

export const useSignupProgress = () => {
  const v = useContext(SignupProgressCtx);
  if (!v)
    throw new Error(
      'useSignupProgress must be used within SignupProgressProvider',
    );
  return v;
};

export const useAttachStep = (
  step: number,
  options?: { immediateOnFirstFocus?: boolean },
) => {
  const { setStep } = useSignupProgress();
  const firstRef = useRef(true);

  useFocusEffect(
    useCallback(() => {
      const immediate = !!options?.immediateOnFirstFocus && firstRef.current;
      setStep(step, { immediate });
      firstRef.current = false;
    }, [setStep, step, options?.immediateOnFirstFocus]),
  );
};
