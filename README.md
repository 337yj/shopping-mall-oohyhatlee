<div align="center">
<img width="150px" style="border:none" alt="logo" src="https://github.com/337yj/Coding-Test/assets/110447844/8e99538a-ab81-46a0-a206-ac8f1c30af56" />
</div>
<img width="100%" style="border:none" alt="logo" src="https://github.com/337yj/shopping-mall-oohyhatlee/assets/110447844/281bbf38-5ec2-4d01-8058-77e37d920acd" />


## 프로젝트 소개

OohYhatLee는 푸른 여름 바다를 컨셉으로 한 의류 쇼핑몰 웹 사이트입니다. <br/>
<a  href="http://oohyhatlee-shop.s3-website.ap-northeast-2.amazonaws.com">🏝️ 사이트 바로가기</a>

<br/>

### 핵심 기능

- 상품등록 : 어드민 사용자는 등록 페이지에서 신규 상품을 등록할 수 있습니다.
- 장바구니 : 로그인한 사용자는 장바구니에 있는 상품을 관리할 수 있습니다.
- 반응형 디자인 : 반응형 웹을 적용하여 모바일, 테블릿, 데스크탑에서 사용할 수 있습니다.

<br/>

## 프로젝트 시작하기
1. Clone the repo
```
$ git clone https://github.com/337yj/shopping-mall-oohyhatlee.git
```
2. Install Yarn
```
$ yarn install
```
3. .env 파일을 만들고  Firebase 와 Cloudinary 환경변수를 입력합니다.
```
$ touch .env
```
```
# .env
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_DB_URL=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_CLOUDINARY_URL=
REACT_APP_CLOUDINARY_PRESET=
```
4. client build & run project
```
$ yarn build
$ yarn start
```

<br/>

## 기술 스택
- `React` `JavaScript` `Sass` 
- `React-Query` `Context`
- `firebase` `Cloudinary`
- `ESLint` `Prettier` 
- `AWS S3` `Github Action`

<br/>

## 폴더 구조
```
📂src
 ├─ api # Firebase API, Cloudinary upload API 
 ├─ assets # 필요한 리소스들
 ├─ components # 컴포넌트
 │  │ 
 │  ├─ Common # 공통
 │  │  └─ # CartItem, CartStatus, PriceCard, Products, Button
 │  │ 
 │  └─ Layout # 레이아웃
 │     └─ # Header, Footer
 │ 
 ├─ context
 │  └─ AuthContext.js # 사용자 인증 컨텍스트
 │ 
 ├─ hooks 
 │  ├─ useCart.js # 장바구니 데이터 페칭,관리 커스텀 훅
 │  ├─ useProducts.js # 상품 데이터 페칭,관리 커스텀 훅
 │  └─ useScrollFadeIn.js # 스크롤 애니메이션 커스텀 훅
 │ 
 ├─ pages
 │  ├─ AllProducts # 상품 리스트 페이지
 │  ├─ Home # 메인 페이지
 │  ├─ MyCart # 상품카트 페이지
 │  ├─ NewProduct # 새상품 등록 페이지 (어드민)
 │  ├─ ProductDetail # 상품 상세 페이지
 │  └─ ProtectedRoute # 페이지 접근 제어
 │ 
 ├─ router
 └─ styles # reset, 전역 스타일, scss 변수
 │  ├─ constants # colors
 │  ├─ mixins # flexbox
 │  ├─ _base.scss
 │  ├─ _reset.scss 
 │  └─ global.scss 
 └─ index.js
```
        

<br/>
        
## 데모 영상


 <table>
  <tr>
    <td align="center"><b>어드민 사용자 로그인</b></td>
    <td align="center"><b>로그인하지 않은 사용자</b></td>		
  </tr>
  <tr>
    <td>   
      <img width="100%" src="https://github.com/337yj/shopping-mall-oohyhatlee/assets/110447844/07cdd58c-d933-429e-8664-9f6576ccc8c1" />
    </td>
    <td>   
      <img width="100%" src="https://github.com/337yj/shopping-mall-oohyhatlee/assets/110447844/29cd885e-c924-458f-a07a-787ccd70cd82" />
    </td>
   </tr>
  <tr>
    <td>ㆍ어드민 사용자 로그인 시 헤더에 New메뉴 렌더링</td>
    <td>ㆍ로그인하지 않은 사용자의 접근 제한</td>		
  </tr>
</table>
<br/>

 <table>
   <tr>
    <td align="center"><b>데스크탑 홈</b></td>
    <td align="center"><b>모바일 홈</b></td>		
  </tr>
   <tr> 
    <td>   
      <img width="100%" src="https://github.com/337yj/shopping-mall-oohyhatlee/assets/110447844/f3c6c0f5-0940-48a6-bd4e-6dd57324b447" />
    </td>
    <td>   
      <img width="100%" src="https://github.com/337yj/shopping-mall-oohyhatlee/assets/110447844/51346bca-09ee-40b0-9c1c-7629663b5690" />
    </td>
  </tr>
<tr>
    <td>ㆍ데스크탑 뷰</td>
    <td>ㆍ 모바일 뷰 <br/>
    ㆍ 메뉴 이동
</td>		
</tr>
</table>
<br/>

<table>
 <tr>
    <td align="center"><b>상품 리스트</b></td>
    <td align="center"><b>상품 디테일</b></td>		
  </tr>
  <tr>
    <td>   
      <img width="100%" src="https://github.com/337yj/shopping-mall-oohyhatlee/assets/110447844/9469a124-5f9c-48f1-9697-0c497d998601" />
    </td>
    <td>   
      <img width="100%" src="https://github.com/337yj/shopping-mall-oohyhatlee/assets/110447844/1e5ac727-cb26-413c-845e-231b61ed460f" />
    </td>
  </tr>
  <tr>
    <td>ㆍ 상품 카테고리별 필터링<br/>
    ㆍ 상품 검색 기능</td>
    <td>ㆍ 특정 상품을 클릭하여 해당 상품의 상세 정보 확인 가능<br/>
ㆍ 상품 옵션 선택 및 장바구니에 추가 가능</td>		
</tr>
</table>
<br/>

 <table> 
   <tr>
    <td align="center"><b>장바구니</b></td>
    <td align="center"><b>상품 등록</b></td>		
  </tr>
   <tr>
    <td>   
      <img width="100%" src="https://github.com/337yj/shopping-mall-oohyhatlee/assets/110447844/a653b57c-f999-46fa-9777-b71a355e2e97" />
    </td>
    <td>   
      <img width="100%" src="https://github.com/337yj/shopping-mall-oohyhatlee/assets/110447844/baceb722-df69-481d-97fa-4bf99bbdca76" />
    </td>
   </tr>
   <tr>
    <td>ㆍ 로그인하지 않은 사용자의 접근 시 메인 페이지로 이동<br/>
    ㆍ 상품의 수량, 가격, 총 가격, 배송비 표시<br/>
    ㆍ 사용자는 장바구니에서 상품 수정 및 삭제 가능</td>
    <td>ㆍ 어드민 계정 사용자에게만 보이고 접근 가능<br/>
ㆍ 상품의 이미지, 제품명, 가격, 카테고리, 제품 설명, 옵션 정보 등록
  </td>		
  </tr>
</table> 
