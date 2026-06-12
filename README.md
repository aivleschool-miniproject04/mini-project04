# AivleBooks (창작 서재 관리 서비스)

> **"글과 AI 표지 시안을 함께 관리하는 나만의 창작 서재"**  
> 본 프로젝트는 사용자가 작성한 도서의 메타데이터와 글을 관리하고, OpenAI의 IMAGE API를 연동하여 어울리는 책 표지 시안을 생성·보관하는 웹 서비스입니다.

---

## 주요 기능 (Key Features)

### 1. 메인 홈 화면 (`StartPage`)
![StartPage 화면](./docs/screenshots/startpage.png)
- **도서 큐레이션**: 추천수가 가장 많은 **인기 도서 3선**과 등록일 기준 최근에 등록된 **신작 도서 3선**을 한눈에 노출합니다.
- **바로가기 메뉴**: 전체 도서 목록 조회 및 새 도서 등록으로 빠르게 이동할 수 있는 단축 메뉴를 제공합니다.

### 2. 도서 목록 및 검색 (`BookList`)
![BookList 화면](./docs/screenshots/booklist.png)
- **다차원 조건 검색**: 전체 검색뿐 아니라 `제목`, `작가`, `출판사`, `내용`, `태그` 등 개별 필터 타입을 선택하여 실시간으로 도서를 필터링할 수 있습니다.
- **해시태그 기반 검색**: 검색어 앞에 `#`을 붙여 입력할 경우(예: `#소설`) 도서에 등록된 태그만을 타겟팅하는 태그 전용 검색이 가능합니다.
- **페이지네이션(Pagination)**: 한 페이지당 최대 12개의 도서를 렌더링하며, 하단 페이지 네비게이션을 통해 대용량 도서 목록도 쾌적하게 로드합니다.

### 3. 상세 정보 조회 및 추천 (`BookDetail`)
![BookDetail 화면](./docs/screenshots/bookdetail.png)
- **상세 데이터 시각화**: 도서의 작가, 출판사, 본문 내용과 함께 시스템이 추출한 핵심 태그 목록, 등록일 및 최종 수정일을 한눈에 구성하여 보여줍니다.
- **도서 추천 및 토스트 피드백**: 마음에 드는 도서에 '추천하기'를 눌러 실시간으로 추천수(좋아요)를 올릴 수 있으며, 추천이 완료되면 토스트 알림창으로 상태를 즉각 피드백합니다. (로그인 사용자 전용 기능)
- **도서 삭제**: 본인이 등록한 도서에 한하여 더 이상 보관하지 않을 도서를 즉시 제거할 수 있습니다.

### 4. AI 책 표지 자동 생성 (`CoverUpdate`)
![CoverUpdate 화면](./docs/screenshots/coverupdate.png)
- **IMAGE API 연동**: 도서의 제목, 저자, 본문 키워드를 분석하여 IMAGE API를 통해 맞춤형 세로 표지를 디자인합니다.
- **표지 자동 업데이트**: 생성된 이미지는 Base64 데이터로 변환되어 해당 도서의 정보에 실시간으로 저장 및 렌더링됩니다.

### 5. 도서 한 줄 감상평 및 댓글 관리 (`BookDetail`)
- **한 줄 감상평 등록 및 삭제**: 도서 상세 페이지 하단에서 책에 대한 감상평을 한 줄로 쉽게 등록할 수 있으며, 본인이 작성한 감상평에 한해 삭제할 수 있습니다. (로그인 사용자 전용 기능)
- **감상평 좋아요**: 다른 독자들이 남긴 감상평에 좋아요(❤️)를 누를 수 있습니다.
- **감상평 정렬**: 작성일 기준의 `최신순` 정렬 및 좋아요 개수 기준의 `좋아요순` 정렬을 지원합니다.

### 6. 다이내믹 AI 추천 헤더 배너 (`Header`)
![Header 화면](./docs/screenshots/header.png)
- **자동 슬라이드 배너**: 홈 및 목록 화면 상단에 5초 주기로 자동 전환되는 다이내믹 롤링 배너 영역을 제공합니다.
- **이 달의 AI 추천 도서**: AI 큐레이션 알고리즘을 거친 추천 도서 정보(`aiRecommendation` 데이터)가 존재할 경우, 추천 도서명과 함께 AI가 추천하는 사유(`reason`)를 배너에 실시간으로 노출합니다.

### 7. 사용자 인증 및 계정 관리 (`AuthPage`)
- **로그인 & 회원가입**: 아이디, 비밀번호, 닉네임, 이름, 이메일을 바탕으로 가입을 진행하며, 로그인 성공 시 사용자 정보 및 액세스 토큰을 로컬에 안전하게 보관합니다.
- **권한 관리**: 비로그인 사용자는 조회만 가능하며, 도서 등록, 수정, 삭제, AI 표지 생성, 도서 추천 및 감상평 작성을 위해서는 로그인이 필요합니다.
- **본인 작성 글 제한**: 도서 상세 수정/삭제 및 표지 관리 버튼은 도서를 직접 등록한 사용자(소유자)에게만 활성화됩니다.

---

## 서비스 흐름도 (Flow Diagram)

```mermaid
graph TD
    StartPage[StartPage: 홈 화면] -->|도서 목록 바로가기| BookList[BookList: 도서 목록]
    StartPage -->|새 도서 등록 바로가기| BookCreate[BookCreate: 도서 등록]
    StartPage -->|도서 카드 클릭| BookDetail[BookDetail: 도서 상세]
    
    BookList -->|도서 카드 클릭| BookDetail
    BookList -->|새 도서 등록| BookCreate
    BookList -->|로고 클릭| StartPage
    BookList -->|검색 필터 선택 및 실시간 검색| BookList
    BookList -->|페이지네이션 이동| BookList

    BookDetail -->|수정| BookUpdate[BookUpdate: 도서 수정]
    BookDetail -->|삭제: DELETE /books/:id| BookList
    BookDetail -->|AI 표지 생성| CoverUpdate[CoverUpdate: AI 표지 생성]
    BookDetail -->|댓글 작성 및 좋아요: POST /books/:id/comments| BookDetail

    BookUpdate -->|수정 완료 및 태그 갱신: PATCH /books/:id| BookDetail
    BookCreate -->|등록 완료 및 태그 추출: POST /books| BookDetail

    CoverUpdate -->|생성: OpenAI API| OpenAI[OpenAI Image API]
    OpenAI -->|Base64 이미지 반환| CoverUpdate
    CoverUpdate -->|표지 저장: PATCH /books/:id/cover| BookDetail

    Header[Header: 상단 메뉴] -->|로그인/회원가입 클릭| AuthPage[AuthPage: 로그인/회원가입]
    AuthPage -->|로그인 성공| StartPage
    
    BookCreate -.->|미로그인 시 리다이렉트| AuthPage
    BookDetail -.->|추천/댓글 작성 시 미로그인 시 리다이렉트| AuthPage
```

---

## API 엔드포인트 (API Endpoints)

API 서버의 기본 주소는 환경 변수를 통해 커스텀할 수 있습니다.
- 도서 & 댓글 API 기본값: `http://localhost:8080/books` (`VITE_BOOK_API_URL`)
- 인증 API 기본값: `http://localhost:8080/users` (`VITE_AUTH_API_URL`)

### 1. 도서 관련 API (Book APIs)

| HTTP 메서드 | 엔드포인트 | 설명 | 요청 본문(Body) 예시 / 특이사항 |
| :--- | :--- | :--- | :--- |
| **GET** | `/books` | 전체 도서 목록 조회 | - |
| **POST** | `/books` | 신규 도서 등록 | `{ title, author: { userId }, publisher, content, tags, coverImageUrl, likeCount }` (Authorization 헤더 필요) |
| **PATCH** | `/books/:id` | 도서 정보 수정 | `{ title, author: { userId }, publisher, content, tags, updatedAt }` (Authorization 헤더 필요, 본인만 가능) |
| **POST** | `/books/:id/like` | 도서 추천 / 취소 | `{ userId }` (Authorization 헤더 필요) |
| **PATCH** | `/books/:id/cover` | 도서 표지 이미지 저장 | `{ coverImageUrl: "data:image..." }` (Authorization 헤더 필요) |
| **DELETE** | `/books/:id` | 도서 삭제 | - (Authorization 헤더 필요, 본인만 가능) |

### 2. 댓글 관련 API (Comment APIs)

| HTTP 메서드 | 엔드포인트 | 설명 | 요청 본문(Body) 예시 / 특이사항 |
| :--- | :--- | :--- | :--- |
| **GET** | `/books/:id/comments?sort=likes\|latest` | 특정 도서의 댓글 목록 조회 | 정렬 조건: `likes`(좋아요순), `latest`(최신순) |
| **POST** | `/books/:id/comments` | 댓글 등록 | `{ content }` (Authorization 헤더 필요) |
| **POST** | `/books/:id/comments/:commentId/like` | 댓글 좋아요 | - (Authorization 헤더 필요) |
| **DELETE** | `/books/:id/comments/:commentId` | 댓글 삭제 | - (Authorization 헤더 필요, 본인만 가능) |

### 3. 인증 관련 API (Auth APIs)

| HTTP 메서드 | 엔드포인트 | 설명 | 요청 본문(Body) 예시 / 특이사항 |
| :--- | :--- | :--- | :--- |
| **POST** | `/users/register` | 신규 회원가입 | `{ userId, password, name, email, nickname }` |
| **POST** | `/users/login` | 로그인 | `{ userId, password }` |
| **POST** | `/users/refresh` | 액세스 토큰 재발급 | `{ refreshToken }` |

### 4. 외부 API (External APIs)

| HTTP 메서드 | 엔드포인트 | 설명 | 요청 본문(Body) 예시 / 특이사항 |
| :--- | :--- | :--- | :--- |
| **POST** | `https://api.openai.com/v1/images/generations` | OpenAI 이미지 생성 (DALL-E) | `{ model, prompt, n, size, quality, output_format }` |
| **POST** | `https://api.openai.com/v1/chat/completions` | OpenAI Chat API (태그 추출 및 AI 도서 추천 배너) | `{ model, messages, response_format }` (gpt-4o-mini 사용) |

---

## 서비스 기본 구조 (Project Structure)

```text
mini-project04/
├── docs/                   # 프로젝트 문서화 리소스
│   └── screenshots/        # README.md용 주요 기능 화면 스크린샷 이미지
├── public/                 # 정적 리소스 파일 (파비콘 등)
├── src/                    # 소스 코드 메인 디렉토리
│   ├── api/                # API 통신 모듈
│   │   └── authApi.js              # 사용자 인증 관련 API (로그인, 회원가입, 토큰 갱신)
│   ├── assets/             # 기본 로고 이미지 등의 정적 파일
│   ├── components/         # 재사용 가능한 UI 컴포넌트
│   │   ├── BookCard.jsx            # 도서 카드 목록 컴포넌트
│   │   ├── BookForm.jsx            # 도서 등록/수정 폼 컴포넌트
│   │   ├── CoverImageModal.jsx     # AI 표지 크게 보기 모달
│   │   ├── CoverPreview.jsx        # AI 생성 표지 미리보기 및 컨트롤러
│   │   ├── Header.jsx              # 상단 네비게이션 헤더 및 AI 추천 배너
│   │   ├── NewBooksSection.jsx     # 신작 도서 3선 영역
│   │   └── PopularBooksSection.jsx # 인기 도서 3선 영역
│   ├── pages/              # 주요 레이아웃 페이지 컴포넌트
│   │   ├── StartPage.jsx           # 메인 웰컴 홈 화면 (인기/신작 도서 노출)
│   │   ├── BookList.jsx            # 도서 목록, 페이지네이션 및 다차원 검색 화면
│   │   ├── BookDetail.jsx          # 도서 상세 조회 및 한 줄 평(댓글) 영역
│   │   ├── BookCreate.jsx          # 도서 생성 화면 (자동 태그 추출 기능 포함)
│   │   ├── BookUpdate.jsx          # 도서 정보 수정 화면
│   │   ├── CoverUpdate.jsx         # AI 표지 생성 및 로컬 업로드 화면
│   │   └── AuthPage.jsx            # 로그인 및 회원가입 화면
│   ├── styles/             # 전역 및 레이아웃 스타일 파일
│   ├── App.jsx             # 비즈니스 로직, 상태 관리 및 라우팅 컨트롤러
│   └── main.jsx            # React 엔트리 포인트
├── db.json                 # Mock 데이터베이스 (JSON Server용 데이터 백업)
├── package.json            # 의존성 및 실행 스크립트 정의
└── vite.config.js          # Vite 설정 파일
```

---

## 환경 변수 설정 (.env)

로컬 개발 환경에서 프로젝트 동작 방식을 변경하려면 루트 디렉토리에 `.env` 또는 `.env.local` 파일을 생성하여 다음과 같은 변수를 정의할 수 있습니다.

```env
# OpenAI API Key (AI 표지 생성 및 태그 추출, AI 도서 추천 배너 기능 등에 필수 사용)
VITE_OPENAI_API_KEY=your_openai_api_key_here

# 백엔드 도서 API 서버 URL (생략 시 기본값: http://localhost:8080/books)
VITE_BOOK_API_URL=http://localhost:8080/books

# 백엔드 사용자 인증 API 서버 URL (생략 시 기본값: http://localhost:8080/users)
VITE_AUTH_API_URL=http://localhost:8080/users

# Mock 인증 사용 여부 (true인 경우 백엔드 서버가 없어도 Mock 계정으로 로그인/회원가입 가능)
VITE_USE_MOCK_AUTH=true
```

---

## AI 표지 생성 가이드 (AI Cover Generation)

본 서비스의 핵심 기능인 AI 책 표지 생성의 상세 사용 방법입니다.

### 사전 준비 사항
- 이미지 생성을 위해서는 **OpenAI API Key**가 필요하며, UI에서 입력하거나 `.env` 파일에 `VITE_OPENAI_API_KEY`를 설정할 수 있습니다.

### 사용 단계
1. **상세 페이지 진입**: 도서 목록 또는 홈 화면에서 임의의 도서를 클릭하여 상세 화면으로 이동합니다.
2. **표지 생성 화면 이동**: 상세 화면 하단의 `[표지 관리]` 버튼을 클릭합니다. (본인이 등록한 도서에 한하여 노출)
3. **API Key 및 옵션 설정**:
   - **API Key**: 본인의 `sk-...`로 시작하는 OpenAI API 키를 입력합니다. (비밀번호 타입으로 마스킹 처리됨)
   - **모델**: 드롭다운 메뉴에서 이미지 생성 모델(예: `gpt-Image-2.0`, `gpt-Image-1.5`) 중 하나를 선택합니다.
   - **Quality**: Low, Medium, High 중 원하는 이미지 생성 품질을 선택합니다.
4. **AI 생성 실행**: `[AI 표지 생성]` 버튼을 클릭하면 도서의 `제목`, `저자`, `출판사`, `본문내용`을 기반으로 맞춤형 세로 표지가 생성되어 미리보기 화면에 노출됩니다.
5. **로컬 이미지 직접 업로드**:
   - AI 생성 기능을 사용하지 않으려면, 우측 결과 영역에서 파일 선택 아이콘을 클릭해 로컬 PC 안의 파일(`.png`, `.jpg` 등)을 바로 표지로 지정할 수 있습니다.
6. **표지 삭제**: 생성되거나 등록된 이미지 표지가 마음에 들지 않을 경우, `삭제` 버튼을 눌러 기본 표지 상태로 언제든지 되돌릴 수 있습니다.

---

## 기술 스택

- **Frontend**: React (v19), Vite (v8)
- **Styling**: Vanilla CSS (CSS Variables 테마 적용)
- **API 통신**: Fetch API
- **AI 연동**: OpenAI API (DALL-E 및 GPT)
- **DB (Mock)**: JSON Server (로컬 모의 API 테스트용)

---

## 실행 방법 (Getting Started)

로컬 개발 환경에서 애플리케이션을 구동하기 위한 순서입니다.

### 사전 준비 사항
- 컴퓨터에 Node.js가 설치되어 있어야 합니다.

### 1. 의존성 패키지 설치
프로젝트 루트 디렉토리에서 터미널을 열고 아래 명령어를 입력하여 필요한 패키지를 설치합니다.
```bash
npm install
```

### 2. API 서버 환경 구성

#### 옵션 A: 실제 백엔드 서버와 연동 (기본값)
- 실제 백엔드 서버(Spring Boot 등)가 **8080 포트**에서 정상 작동 중인지 확인합니다.

#### 옵션 B: 로컬 Mock API 서버 (JSON Server)와 연동
1. 루트 디렉토리에 `.env` 파일을 새로 만들고 아래의 설정을 작성합니다.
   ```env
   VITE_BOOK_API_URL=http://localhost:3000/books
   VITE_USE_MOCK_AUTH=true
   ```
2. 아래 명령어를 실행하여 3000번 포트로 JSON Server를 시작합니다.
   ```bash
   npm run server
   ```

### 3. 프론트엔드 개발 서버 실행 (포트: 5173 등)
새로운 터미널 창을 열어 아래 명령어를 통해 리액트 개발 서버를 시작합니다.
```bash
npm run dev
```
서버가 시작되면 화면에 표시되는 로컬 URL(예: `http://localhost:5173`)로 브라우저에서 접속하여 확인합니다.
