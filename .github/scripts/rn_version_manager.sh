#!/bin/bash
set -e

# React Native 프로젝트의 버전 관리를 위한 스크립트
# 사용법:
# ./rn_version_manager.sh get              - 현재 package.json 버전 가져오기
# ./rn_version_manager.sh increment        - package.json의 patch 버전 올리기
# ./rn_version_manager.sh sync             - package.json 버전을 iOS/Android에 동기화

# --- 설정 ---
PACKAGE_JSON="package.json"
INFO_PLIST="ios/Wit/Info.plist"
BUILD_GRADLE="android/app/build.gradle"
# --- 설정 끝 ---

# jq 설치 확인
if ! command -v jq &> /dev/null
then
    echo "jq가 설치되어 있지 않습니다. sudo apt-get install jq 또는 brew install jq 명령어로 설치해주세요."
    exit 1
fi

# 현재 버전 가져오기
get_version() {
  if [ ! -f "$PACKAGE_JSON" ]; then
    echo "오류: package.json 파일을 찾을 수 없습니다."
    exit 1
  fi
  grep '"version":' "$PACKAGE_JSON" | sed 's/.*"version": *"\([^"]*\)".*/\1/'
}

# Patch 버전 증가
increment_version() {
  current_version=$(get_version)
  
  # awk를 사용하여 버전 분리 및 patch 증가
  new_version=$(echo "$current_version" | awk -F. -v OFS=. '{$3++; print}')
  
  # package.json 파일 업데이트 (macOS와 Linux 호환 sed)
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/\"version\": \"${current_version}\"/\"version\": \"${new_version}\"/" "$PACKAGE_JSON"
  else
    sed -i "s/\"version\": \"${current_version}\"/\"version\": \"${new_version}\"/" "$PACKAGE_JSON"
  fi
  
  echo "$new_version"
}

# iOS/Android 프로젝트에 버전 동기화
sync_native_versions() {
  new_version=$(get_version)
  
  # Git 커밋 수로 빌드 번호 생성 (항상 증가)
  build_number=$(git rev-list --count HEAD)

  echo "버전 동기화 시작: v${new_version} (빌드 ${build_number})"

  # --- iOS 버전 동기화 ---
  if [ -f "$INFO_PLIST" ]; then
    echo "iOS Info.plist 업데이트 중..."
    # macOS 환경 체크
    if command -v /usr/libexec/PlistBuddy >/dev/null 2>&1; then
      /usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString ${new_version}" "$INFO_PLIST"
      /usr/libexec/PlistBuddy -c "Set :CFBundleVersion ${build_number}" "$INFO_PLIST"
      echo "✅ iOS 버전 동기화 완료."
    else
      echo "⚠️ 경고: PlistBuddy를 찾을 수 없습니다. macOS 환경이 아닌 것 같습니다."
      echo "iOS 버전 동기화를 건너뜁니다."
    fi
  else
    echo "⚠️ 경고: ios/Wit/Info.plist 파일을 찾을 수 없어 iOS 버전 동기화를 건너뜁니다."
  fi

  # --- Android 버전 동기화 ---
  if [ -f "$BUILD_GRADLE" ]; then
    echo "Android build.gradle 업데이트 중..."
    # versionName 업데이트 (macOS와 Linux 호환 sed)
    if [[ "$OSTYPE" == "darwin"* ]]; then
      sed -i '' -E "s/versionName \"[0-9\.]+\"/versionName \"${new_version}\"/" "$BUILD_GRADLE"
      sed -i '' -E "s/versionCode [0-9]+/versionCode ${build_number}/" "$BUILD_GRADLE"
    else
      sed -i -E "s/versionName \"[0-9\.]+\"/versionName \"${new_version}\"/" "$BUILD_GRADLE"
      sed -i -E "s/versionCode [0-9]+/versionCode ${build_number}/" "$BUILD_GRADLE"
    fi
    echo "✅ Android 버전 동기화 완료."
  else
    echo "⚠️ 경고: android/app/build.gradle 파일을 찾을 수 없어 Android 버전 동기화를 건너뜁니다."
  fi
  
  echo "모든 버전 동기화가 완료되었습니다."
}


# --- 메인 로직 ---
COMMAND=$1

case "$COMMAND" in
  get)
    get_version
    ;;
  increment)
    increment_version
    ;;
  sync)
    sync_native_versions
    ;;
  *)
    echo "잘못된 명령어입니다. 사용법: $0 {get|increment|sync}"
    exit 1
    ;;
esac
