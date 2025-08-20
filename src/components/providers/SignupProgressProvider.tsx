// import React, { createContext, useContext, useMemo, useRef } from 'react';
// import { Animated, Easing } from 'react-native';

// type Ctx = {
//   total: number;
//   value: Animated.Value;
//   setStep: (n: number, opts?: { immediate?: boolean }) => void;
// };

// const SignupProgressCtx = createContext<Ctx | null>(null);

// export const SignupProgressProvider: React.FC<{
//   totalSteps: number;
//   initialStep?: number;
//   children: React.ReactNode;
// }> = ({ totalSteps, initialStep = 1, children }) => {
//   const animated = useRef(new Animated.Value(initialStep)).current;

//   const setStep = (n: number, opts?: { immediate?: boolean }) => {
//     if (opts?.immediate) {
//       animated.setValue(n);
//       return;
//     }
//     Animated.timing(animated, {
//       toValue: n,
//       duration: 300,
//       easing: Easing.out(Easing.cubic),
//       useNativeDriver: false,
//     }).start();
//   };

//   const ctx = useMemo(
//     () => ({ total: totalSteps, value: animated, setStep }),
//     [totalSteps, animated],
//   );

//   return (
//     <SignupProgressCtx.Provider value={ctx}>
//       {children}
//     </SignupProgressCtx.Provider>
//   );
// };

// export const useSignupProgress = () => {
//   const v = useContext(SignupProgressCtx);
//   if (!v)
//     throw new Error(
//       'useSignupProgress must be used within SignupProgressProvider',
//     );
//   return v;
// };

// export const useAttachStep = (step: number, immediateFirst = false) => {
//   const { setStep } = useSignupProgress();
//   React.useEffect(() => {
//     setStep(step, { immediate: immediateFirst });
//   }, [setStep, step, immediateFirst]);
// };
import React, { createContext, useContext, useMemo, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // ✅ 추가
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
      useNativeDriver: false, // width 애니메이션이므로 false
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

// ✅ 포커스될 때마다 단계 세팅 (첫 포커스만 즉시 세팅 옵션 지원)
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
// // SignupProgressProvider.tsx
// import React, {
//     createContext,
//     useContext,
//     useMemo,
//     useRef,
//     useCallback,
//   } from 'react';
//   import { Animated, Easing, InteractionManager } from 'react-native';
//   import { useFocusEffect } from '@react-navigation/native';

//   type Ctx = {
//     total: number;
//     value: Animated.Value;
//     setStep: (n: number, opts?: { immediate?: boolean }) => void;
//   };

//   const SignupProgressCtx = createContext<Ctx | null>(null);

//   export const SignupProgressProvider: React.FC<{
//     totalSteps: number;
//     initialStep?: number;
//     children: React.ReactNode;
//   }> = ({ totalSteps, initialStep = 1, children }) => {
//     const animated = useRef(new Animated.Value(initialStep)).current;

//     const setStep = (n: number, opts?: { immediate?: boolean }) => {
//       if (opts?.immediate) {
//         animated.setValue(n);
//         return;
//       }
//       Animated.timing(animated, {
//         toValue: n,
//         duration: 1000, // 살짝 부드럽게
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: false,
//       }).start();
//     };

//     const ctx = useMemo(
//       () => ({ total: totalSteps, value: animated, setStep }),
//       [totalSteps, animated],
//     );

//     return (
//       <SignupProgressCtx.Provider value={ctx}>
//         {children}
//       </SignupProgressCtx.Provider>
//     );
//   };

//   export const useSignupProgress = () => {
//     const v = useContext(SignupProgressCtx);
//     if (!v)
//       throw new Error(
//         'useSignupProgress must be used within SignupProgressProvider',
//       );
//     return v;
//   };

//   export const useAttachStep = (
//     step: number,
//     options?: { immediateOnFirstFocus?: boolean },
//   ) => {
//     const { setStep } = useSignupProgress();
//     const firstRef = useRef(true);

//     useFocusEffect(
//       useCallback(() => {
//         let cancelled = false;
//         const immediate = !!options?.immediateOnFirstFocus && firstRef.current;

//         const task = InteractionManager.runAfterInteractions(() => {
//           if (!cancelled) setStep(step, { immediate });
//           firstRef.current = false;
//         });

//         return () => {
//           cancelled = true;
//           task?.cancel?.();
//         };
//       }, [setStep, step, options?.immediateOnFirstFocus]),
//     );
//   };
