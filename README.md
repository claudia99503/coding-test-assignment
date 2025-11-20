# PG 대시보드 과제

제공된 API를 활용해 결제 및 가맹점 데이터를 조회하는 대시보드 페이지를 구현했습니다.

## 프로젝트 개요

- Next.js(App Router) 기반 구현
- 결제/가맹점 데이터를 활용한 조회 기능 제공
- 대시보드, 거래 내역, 가맹점 상세 목록 및 가맹점 코드별 상세 페이지

## 기술 스택

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS

## UI 구성 방식

- **대시보드 지표 표시**: 대시보드에서 총 거래 건수, 총 거래 금액, 최근 거래 건수를 박스 형태로 그리드 레이아웃에 배치하여 한눈에 파악 가능
- **명확한 테이블 구조**: 결제 내역 및 가맹점 목록을 테이블로 정리하여 데이터 조회 및 확인 용이
- **일관된 레이아웃**: 모든 페이지의 여백과 정렬 방식을 통일하여 사용자 경험 일관성 유지

## 주요 화면

### 1. 홈 화면 (`/`)

대시보드, 거래 내역, 가맹점 목록으로 이동할 수 있는 메뉴 버튼 3개 제공

**UX 고려사항**: 사용자가 처음 접속 시 주요 기능을 한눈에 파악하고 핵심 페이지로 직관적으로 접근할 수 있도록 구성했습니다.

**사용 API**: 없음

### 2. 대시보드 (`/dashboard`)

- 총 거래 건수 표시
- 총 거래 금액 표시
- 최근 거래 5건 목록
- **전체 내역 보기 버튼**: 거래 내역 리스트 페이지(`/payments`)로 이동하여 전체 거래 내역 확인 가능
- 최근 거래 내역에서 가맹점 코드 클릭 시 가맹점 코드별 상세 페이지로 이동

**사용 API**:
- `GET /api/v1/payments/list`

### 3. 거래 내역 리스트 (`/payments`)

- 전체 결제 내역 조회 및 표시
- 최신 결제일시 기준 정렬
- **필터링 기능**
  - 결제 상태별 필터링
  - 결제 수단별 필터링
  - 날짜 범위별 필터링
- **검색 기능**: 결제코드 또는 가맹점코드로 필터링
- 각 행의 가맹점 코드 클릭 시 가맹점 코드별 상세 페이지로 이동

**사용 API**:
- `GET /api/v1/payments/list`

### 4. 가맹점 상세 목록 (`/merchants/list`)

- 전체 가맹점 상세 정보 조회 및 목록 표시
- **검색 기능**: 가맹점코드 또는 가맹점명으로 필터링
- 각 행의 가맹점 코드 클릭 시 가맹점 코드별 상세 페이지로 이동

**사용 API**:
- `GET /api/v1/merchants/details`

### 5. 가맹점 코드별 상세 (`/merchants/detail/[mchtCode]`)

- 선택한 가맹점 코드의 상세 정보 표시
- 이전 페이지로 돌아가기 버튼 제공

**사용 API**:
- `GET /api/v1/merchants/details/{mchtCode}`

## 폴더 구조

```
src/
 ├─ app/
 │   ├─ page.tsx                    # 홈 화면
 │   ├─ layout.tsx                  # 전역 레이아웃
 │   │
 │   ├─ dashboard/
 │   │    └─ page.tsx               # 대시보드 페이지
 │   │
 │   ├─ payments/
 │   │    └─ page.tsx               # 거래 내역 리스트 페이지
 │   │
 │   ├─ merchants/
 │   │    ├─ list/
 │   │    │    └─ page.tsx          # 가맹점 상세 목록 페이지
 │   │    └─ detail/
 │   │         └─ [mchtCode]/
 │   │              └─ page.tsx     # 가맹점 상세 보기 페이지
 │
 ├─ api/
 │   ├─ payments.ts                 # 결제 API
 │   ├─ merchants.ts                # 가맹점 API
 │   └─ common.ts                   # 공통 코드 API
 │
 ├─ components/
 │   ├─ StatCard.tsx                # 지표 표시 컴포넌트
 │   ├─ PaymentTable.tsx            # 결제 목록 테이블
 │   ├─ MerchantTable.tsx           # 가맹점 목록 테이블
 │   ├─ SearchInput.tsx             # 검색 입력 UI
 │   ├─ FilterDropdown.tsx          # 필터 드롭다운
 │   ├─ DateRangePicker.tsx         # 날짜 범위 선택 UI
 │   └─ FilterDropdown/...          # 드롭다운 컴포넌트
 │
 ├─ utils/
 │   ├─ formateDate.ts              # 날짜 변환 함수
 │   └─ paymentsUtils.ts            # 결제 유틸 함수
 │
 ├─ types/
 │   ├─ payments.ts                 # 결제 타입 정의
 │   └─ merchants.ts                # 가맹점 타입 정의
 │
 ├─ libs/
 │   └─ axios.ts                    # axios 인스턴스 설정
 │
 └─ styles/
      └─ globals.css                # 전역 스타일
```

## 실행 방법

```bash
npm install
npm run dev
```

http://localhost:3000 에서 실행됩니다.

