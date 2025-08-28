#!/usr/bin/python3
# -*- coding: utf-8 -*-

import json
import os
import re
import sys
from datetime import datetime

# --- 설정 ---
CHANGELOG_JSON_PATH = "CHANGELOG.json"
CHANGELOG_MD_PATH = "CHANGELOG.md"
SUMMARY_HTML_PATH = "summary_section.html"
# --- 설정 끝 ---


class ChangelogManager:
    def __init__(self):
        self.version = os.environ.get("VERSION", "0.0.0")
        self.pr_number = os.environ.get("PR_NUMBER", "N/A")
        self.timestamp = os.environ.get("TIMESTAMP", datetime.utcnow().isoformat())

    def _load_json(self):
        if os.path.exists(CHANGELOG_JSON_PATH):
            with open(CHANGELOG_JSON_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        return {"releases": []}

    def _save_json(self, data):
        with open(CHANGELOG_JSON_PATH, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    def _parse_summary_html(self):
        if not os.path.exists(SUMMARY_HTML_PATH):
            print(f"오류: {SUMMARY_HTML_PATH} 파일을 찾을 수 없습니다.")
            return None

        with open(SUMMARY_HTML_PATH, "r", encoding="utf-8") as f:
            html_content = f.read()

        # CodeRabbit 요약 섹션만 추출 (더 안정적인 방법)
        summary_match = re.search(r'Summary by CodeRabbit</h2>(.*)', html_content, re.DOTALL)
        if not summary_match:
            print("⚠️ CodeRabbit 요약 섹션을 찾을 수 없습니다. 전체 내용을 파싱합니다.")
            summary_html = html_content
        else:
            summary_html = summary_match.group(1)

        # h3 태그를 카테고리로, 다음 ul의 li들을 항목으로 파싱
        # 정규표현식을 사용하여 h3와 그에 따른 ul 목록을 찾습니다.
        pattern = re.compile(r'<h3.*?>(.*?)</h3>.*?<ul.*?>(.*?)</ul>', re.DOTALL)
        matches = pattern.findall(summary_html)
        
        changes = {}
        for title, items_html in matches:
            # 제목에서 아이콘과 공백 제거
            clean_title = re.sub(r'<g-emoji.*?>|</g-emoji>', '', title).strip()
            
            # li 태그에서 내용 추출
            items = [re.sub('<.*?>', '', item).strip() for item in re.findall(r'<li.*?>(.*?)</li>', items_html, re.DOTALL)]
            
            if clean_title and items:
                changes[clean_title] = items
        
        return changes if changes else None

    def update_from_summary(self):
        print("CodeRabbit 요약본 파싱 및 CHANGELOG.json 업데이트 시작...")
        changes = self._parse_summary_html()
        if not changes:
            print("파싱할 변경사항이 없습니다. 기본 항목을 추가합니다.")
            changes = {"General": [f"PR #{self.pr_number}의 변경사항이 반영되었습니다."]}

        data = self._load_json()

        # 동일 버전이 이미 있는지 확인
        existing_release = next((r for r in data["releases"] if r["version"] == self.version), None)
        if existing_release:
            print(f"이미 버전 {self.version}이 존재하여 업데이트합니다.")
            existing_release["changes"] = changes
            existing_release["timestamp"] = self.timestamp
            existing_release["pr_number"] = self.pr_number
        else:
            new_release = {
                "version": self.version,
                "timestamp": self.timestamp,
                "pr_number": self.pr_number,
                "changes": changes,
            }
            # 최신 버전을 맨 위에 추가
            data["releases"].insert(0, new_release)
        
        self._save_json(data)
        print(f"✅ CHANGELOG.json에 v{self.version} 업데이트 완료!")

    def generate_md(self):
        print("CHANGELOG.md 생성 시작...")
        data = self._load_json()
        
        md_content = ["# CHANGELOG\n\n이 파일은 워크플로우에 의해 자동으로 생성됩니다.\n"]

        for release in data.get("releases", []):
            version = release.get("version", "N/A")
            # 타임스탬프에서 날짜만 추출
            date = datetime.fromisoformat(release.get("timestamp").replace("Z", "+00:00")).strftime("%Y-%m-%d")
            pr_number = release.get("pr_number", "N/A")
            
            md_content.append(f"## v{version} ({date})\n")
            
            changes = release.get("changes", {})
            if not changes:
                md_content.append("- 변경사항 없음\n")
            else:
                for category, items in changes.items():
                    md_content.append(f"### {category}\n")
                    for item in items:
                        md_content.append(f"- {item}\n")
            md_content.append("\n")

        with open(CHANGELOG_MD_PATH, "w", encoding="utf-8") as f:
            f.write("".join(md_content))
        
        print(f"✅ {CHANGELOG_MD_PATH} 생성 완료!")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("사용법: python changelog_manager.py {update-from-summary|generate-md}")
        sys.exit(1)

    manager = ChangelogManager()
    command = sys.argv[1]

    if command == "update-from-summary":
        manager.update_from_summary()
    elif command == "generate-md":
        manager.generate_md()
    else:
        print(f"알 수 없는 명령어: {command}")
        sys.exit(1)
