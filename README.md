# 헬로우 휴먼 · Workless Engineering Club

사내 동호회 사이트입니다. → https://soorimsun.github.io/hello-human/

## 콘텐츠 올리기 전에 꼭 읽어주세요

이 사이트는 **검색엔진에 노출되지 않도록(noindex)** 설정되어 있습니다.
하지만 **링크를 아는 사람은 누구나 볼 수 있고, 이 리포의 내용도 공개되어 있습니다.**

- 회사명, 실명·연락처, 사내 시스템 이름·URL, 실제 로그·코드·데이터는 올리지 마세요.
- 새 페이지는 `.md` 파일로 올리면 됩니다. `_layouts/default.html`이 자동으로 적용되어 noindex가 붙습니다.
- `.html` 파일을 직접 만들 때는 `<head>`에 아래 태그를 반드시 넣어주세요.

  ```html
  <meta name="robots" content="noindex, nofollow, noarchive">
  ```

## 파일 구성

| 파일 | 역할 |
| --- | --- |
| `index.html` | 소개 페이지 (사이트 첫 화면) |
| `assets/style.css` | 공통 스타일 |
| `_layouts/default.html` | Markdown 페이지 공통 레이아웃 (noindex 포함) |
| `_config.yml` | Jekyll 설정 |
