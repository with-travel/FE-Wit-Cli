// import React, { useMemo, useState } from 'react';
// import { Animated, LayoutChangeEvent, StyleSheet, View } from 'react-native';
// import { useSignupProgress } from '@/components/providers/SignupProgressProvider';
// import { colors } from '@/constants/colors';

// const TRACK = '#EAEAEA';
// const FILL = colors.PRIMARY_COLOR;
// const SEP = 'rgba(0,0,0,0.15)';

// type Props = {
//   height?: number;
//   radius?: number;
//   showSeparators?: boolean;
//   style?: any;
// };

// export default function ProgressStepBar({
//   height = 8,
//   radius = 4,
//   showSeparators = true,
//   style,
// }: Props) {
//   const { value, total } = useSignupProgress();
//   const [width, setWidth] = useState(0);

//   const onLayout = (e: LayoutChangeEvent) =>
//     setWidth(e.nativeEvent.layout.width);

//   const animatedWidth = useMemo(
//     () =>
//       value.interpolate({
//         inputRange: [0, total], // 0 ~ total 단계
//         outputRange: [0, width], // 0 ~ 전체 너비
//         extrapolate: 'clamp',
//       }),
//     [value, total, width],
//   );

//   return (
//     <View onLayout={onLayout} style={[styles.wrap, { height }, style]}>
//       <View
//         style={[
//           StyleSheet.absoluteFill,
//           { backgroundColor: TRACK, borderRadius: radius },
//         ]}
//       />
//       <Animated.View
//         style={[
//           StyleSheet.absoluteFill,
//           { width: animatedWidth, backgroundColor: FILL, borderRadius: radius },
//         ]}
//       />
//       {showSeparators &&
//         total > 1 &&
//         Array.from({ length: total - 1 }).map((_, i) => (
//           <View
//             key={i}
//             pointerEvents="none"
//             style={[styles.sep, { left: (width * (i + 1)) / total }]}
//           />
//         ))}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrap: { width: '100%', position: 'relative', overflow: 'hidden' },
//   sep: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     width: StyleSheet.hairlineWidth,
//     backgroundColor: SEP,
//   },
// });
import React, { useMemo, useState } from 'react';
import { Animated, LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { useSignupProgress } from '@/components/providers/SignupProgressProvider';
import { colors } from '@/constants/colors';

const TRACK = '#D9D9D9';
const FILL = colors.PRIMARY_COLOR;
const GAP = 4; // ✅ 요구사항: 세그먼트 간격 4px

type Props = {
  height?: number;
  radius?: number;
  style?: any;
};

export default function ProgressStepBar({
  height = 4,
  radius = 0,
  style,
}: Props) {
  const { value, total } = useSignupProgress();
  const [width, setWidth] = useState(0);

  const onLayout = (e: LayoutChangeEvent) =>
    setWidth(e.nativeEvent.layout.width);

  // 세그먼트 너비 = (전체너비 - 간격*(개수-1)) / 개수
  const segmentWidth = useMemo(() => {
    if (!width || !total) return 0;
    return (width - GAP * (total - 1)) / total;
  }, [width, total]);

  // 각 세그먼트의 채워진 폭(애니메이션 값)
  const fillWidths = useMemo(() => {
    return Array.from({ length: total }).map((_, i) =>
      value.interpolate({
        inputRange: [i, i + 1], // i ~ i+1 진행 구간
        outputRange: [0, segmentWidth], // 0 ~ 세그먼트 폭
        extrapolate: 'clamp',
      }),
    );
  }, [value, total, segmentWidth]);

  return (
    <View onLayout={onLayout} style={[styles.wrap, { height }, style]}>
      <View style={styles.row}>
        {Array.from({ length: total }).map((_, i) => (
          <View
            key={`track-${i}`}
            style={[
              styles.segment,
              {
                width: segmentWidth,
                marginLeft: i === 0 ? 0 : GAP,
                borderRadius: radius,
                backgroundColor: TRACK,
              },
            ]}
          >
            <Animated.View
              style={{
                height: '100%',
                width: fillWidths[i], // ✅ 세그먼트별 채움
                borderRadius: radius,
                backgroundColor: FILL,
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  segment: {
    height: '100%',
    overflow: 'hidden',
  },
});
