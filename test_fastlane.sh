#!/bin/bash

# Fastlane 로컬 테스트 스크립트
echo "🧪 Fastlane 로컬 테스트 시작..."

# 프로젝트 루트로 이동
cd "$(dirname "$0")"

# 환경 변수 설정 (실제 값으로 교체 필요)
export VERSION_NAME="1.0.24"
export BUILD_NUMBER="100"
export PROVISIONING_PROFILE_SPECIFIER="Your_Profile_Name_Here"
export APPLE_ID="kjh002899@gmail.com"
export APP_STORE_CONNECT_API_KEY_PATH="$HOME/.appstoreconnect/private_keys/AuthKey_YOUR_KEY_ID.p8"

echo "🔍 환경 변수 확인:"
echo "  - VERSION_NAME: $VERSION_NAME"
echo "  - BUILD_NUMBER: $BUILD_NUMBER"
echo "  - PROVISIONING_PROFILE_SPECIFIER: $PROVISIONING_PROFILE_SPECIFIER"
echo "  - APPLE_ID: $APPLE_ID"

# iOS 디렉토리로 이동
cd ios

echo "📦 Fastlane 설치 확인..."
if ! command -v bundle &> /dev/null; then
    echo "❌ Bundler가 설치되어 있지 않습니다. 설치해주세요:"
    echo "gem install bundler"
    exit 1
fi

echo "📦 의존성 설치..."
bundle install

echo "🔍 Fastlane 버전 확인..."
bundle exec fastlane --version

echo "📋 사용 가능한 lane 목록:"
bundle exec fastlane lanes

echo ""
echo "🧪 테스트 옵션:"
echo "1. Export IPA만 테스트: bundle exec fastlane build_and_export"
echo "2. TestFlight 업로드만 테스트: bundle exec fastlane upload_testflight"
echo "3. 전체 프로세스 테스트: bundle exec fastlane release"
echo ""
echo "⚠️  실제 테스트 전에 다음을 확인하세요:"
echo "  - 아카이브 파일이 ../build/Wit.xcarchive에 존재하는지"
echo "  - 프로비저닝 프로파일이 올바르게 설정되었는지"
echo "  - App Store Connect API Key가 올바른 위치에 있는지"
