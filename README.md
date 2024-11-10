# javascript-convenience-store-precourse

<a href="https://club-project-one.vercel.app/" target="_blank">
</a>

<br/>
<br/>

# 0. Getting Started (시작하기)

```bash
$ npm run test
$ npm run start
```

[미션 PR](https://github.com/woowacourse-precourse/javascript-convenience-store-7)

<br/>
<br/>

# 1. Overview (개요)

- 이름: javascript-convenience-store-7
- 프로젝트 설명: 우아한테크코스 - 프리코스 4주차 기능 목록 소개 README
- 작성자 : [mun-kyeong](https://github.com/mun-kyeong)

<br/>
<br>

# 2. Key Features (주요 기능)

### 재고 관리 (Inventory) - class

- [ ] 프모로션 상품인지 확인한다.
- [x] 각 상품의 재고 수량을 가져온다.
- [x] 각 상품의 재고 수량을 고려하여 결제 가능 여부를 확인한다.
- [x] 고객이 상품을 구매할 때마다, 결제된 수량만큼 해당 상품의 재고에서 차감하여 수량을 관리한다.
  - 재고를 차감함으로써 시스템은 최신 재고 상태를 유지한다.
  - 다음 고객이 구매할 때 정확한 재고 정보를 제공한다.

### 프로모션 (Promotions) - class

- [x] 프로모션 정보를 가져온다.
- [x] 오늘 날짜가 프로모션 기간 내에 포함되면 프로모션 정보를 가져온다.

  - 프로모션은 N개 구매 시 1개 무료 증정(Buy N Get 1 Free)의 형태로 진행된다.

### 멤버십 (Membership) - functions

- [x] 멤버십 할인의 최대 한도는 8,000원이다.
  - 멤버십 할인 최대 한도를 넘는지 판단

### 주문정보 (Order) - class

- [x] 물품 구매 시 영수증에 구매한 상품명, 수량, 가격 저장
- [ ] 프로모션에 따라 무료로 제공된 증정 상품의 목록 저장
- [ ] 프로모션에 의해 할인된 금액 저장
- [ ] 멤버십할인 가격 저장
- [ ] 총구매액 계산

### 할인 관리 (discountmanagement)

**promotions**

- [ ] 오늘 날짜가 프로모션 기간 내에 포함되면 할인을 적용한다.

  - 1+1 또는 2+1 프로모션이 각각 지정된 상품에 적용되며, 동일 상품에 여러 프로모션이 적용되지 않는다.
  - [ ] 프로모션 혜택은 프로모션 재고 내에서만 적용할 수 있다.

- [ ] 프로모션 기간 중이라면 프로모션 재고를 우선적으로 차감한다.
  - [ ] 프로모션 재고가 부족할 경우에는 일반 재고를 사용한다.

**membership**

- [ ] 멤버십 회원은 프로모션 미적용 금액의 30%를 할인받는다.
  - 프로모션 적용 후 남은 금액에 대해 멤버십 할인을 적용한다.

### 입출력 (IOhandler)

#### 입력

- [ ] 영수증 출력 후 추가 구매를 진행할지 또는 종료할지를 선택할 수 있다.
- [ ] 사용자가 잘못된 값을 입력할 경우 "[ERROR]"로 시작하는 메시지와 함께 Error를 발생시키고 해당 메시지를 출력한 다음 해당 지점부터 다시 입력을 받는다.
- [ ] [Promotions] 프로모션 적용이 가능한 상품에 대해 고객이 해당 수량보다 적게 가져온 경우, 필요한 수량을 추가로 가져오면 혜택을 받을 수 있음을 안내한다.
- [ ] [Promotions] 프로모션 재고가 부족하여 일부 수량을 프로모션 혜택 없이 결제해야 하는 경우, 일부 수량에 대해 정가로 결제하게 됨을 안내한다.

#### 출력

**영수증 (Receipt) - functions**

- [ ] 구매 내역과 산출한 금액 정보를 영수증으로 출력한다.
- [ ] [Receipt] 영수증은 고객의 구매 내역과 할인을 요약하여 출력한다.
  1. [ ] 구매 상품 내역: 구매한 상품명, 수량, 가격
  2. [ ] 증정 상품 내역: 프로모션에 따라 무료로 제공된 증정 상품의 목록
  3. [ ] 금액 정보 - 총구매액 : 구매한 상품의 총 수량과 총 금액
  4. [ ] 금액 정보 - 행사할인: 프로모션에 의해 할인된 금액
  5. [ ] 금액 정보 - 멤버십할인: 멤버십에 의해 추가로 할인된 금액
  6. [ ] 금액 정보 - 내실돈: 최종 결제 금액
- [ ] 영수증의 구성 요소를 보기 좋게 정렬하여 고객이 쉽게 금액과 수량을 확인할 수 있게 한다.

### 편의점 관리 (Order)

- [ ] 총구매액은 상품별 가격과 수량을 곱하여 계산하며, 프로모션 및 멤버십 할인 정책을 반영하여 최종 결제 금액을 산출한다.
- [ ] 사용자가 입력한 상품의 가격과 수량을 기반으로 최종 결제 금액을 계산한다.

### 기타 기능 (Utils)

- [x] 오늘 날짜를 가져온다.

<br/><br/>

# 3. 예외처리 목록

### 재고 관리 (Inventory) - class

- 존재하는 상품일 경우 error 출력
- 상품 이름이 반 값으로 들어온 경우 error 출력

### 프로모션 (Promotions) - class

- 동일 상품에 여러 프로모션이 적용되면 error 출력
- 동일한 이름의 프로모션이 존재할 경우 error 출력

<br/>
<br/>

# 4. 기능 요구사항

> 구매자의 할인 혜택과 재고 상황을 고려하여 최종 결제 금액을 계산하고 안내하는 결제 시스템을 구현한다.

- 사용자가 입력한 상품의 가격과 수량을 기반으로 최종 결제 금액을 계산한다.
  - 총구매액은 상품별 가격과 수량을 곱하여 계산하며, 프로모션 및 멤버십 할인 정책을 반영하여 최종 결제 금액을 산출한다.
- 구매 내역과 산출한 금액 정보를 영수증으로 출력한다.
- 영수증 출력 후 추가 구매를 진행할지 또는 종료할지를 선택할 수 있다.
- 사용자가 잘못된 값을 입력할 경우 "[ERROR]"로 시작하는 메시지와 함께 Error를 발생시키고 해당 메시지를 출력한 다음 해당 지점부터 다시 입력을 받는다.

<details>
<summary>재고 관리</summary>

### 재고 관리

- 각 상품의 재고 수량을 고려하여 결제 가능 여부를 확인한다.
- 고객이 상품을 구매할 때마다, 결제된 수량만큼 해당 상품의 재고에서 차감하여 수량을 관리한다.
- 재고를 차감함으로써 시스템은 최신 재고 상태를 유지하며, 다음 고객이 구매할 때 정확한 재고 정보를 제공한다.
</details>

<details>
<summary>프로모션 할인</summary>

### 프로모션 할인

- 오늘 날짜가 프로모션 기간 내에 포함된 경우에만 할인을 적용한다.
- 프로모션은 N개 구매 시 1개 무료 증정(Buy N Get 1 Free)의 형태로 진행된다.
- 1+1 또는 2+1 프로모션이 각각 지정된 상품에 적용되며, 동일 상품에 여러 프로모션이 적용되지 않는다.
- 프로모션 혜택은 프로모션 재고 내에서만 적용할 수 있다.
- 프로모션 기간 중이라면 프로모션 재고를 우선적으로 차감하며, 프로모션 재고가 부족할 경우에는 일반 재고를 사용한다.
- 프로모션 적용이 가능한 상품에 대해 고객이 해당 수량보다 적게 가져온 경우, 필요한 수량을 추가로 가져오면 혜택을 받을 수 있음을 안내한다.
- 프로모션 재고가 부족하여 일부 수량을 프로모션 혜택 없이 결제해야 하는 경우, 일부 수량에 대해 정가로 결제하게 됨을 안내한다.
</details>

<details>
<summary>멤버십 할인</summary>
### 멤버십 할인
- 멤버십 회원은 프로모션 미적용 금액의 30%를 할인받는다.
- 프로모션 적용 후 남은 금액에 대해 멤버십 할인을 적용한다.
- 멤버십 할인의 최대 한도는 8,000원이다.
</details>

<details>
<summary>멤버십 할인</summary>
### 영수증 출력
- 영수증은 고객의 구매 내역과 할인을 요약하여 출력한다.
- 영수증 항목은 아래와 같다.
  - 구매 상품 내역: 구매한 상품명, 수량, 가격
  - 증정 상품 내역: 프로모션에 따라 무료로 제공된 증정 상품의 목록
  - 금액 정보
    - 총구매액: 구매한 상품의 총 수량과 총 금액
    - 행사할인: 프로모션에 의해 할인된 금액
    - 멤버십할인: 멤버십에 의해 추가로 할인된 금액
    - 내실돈: 최종 결제 금액
- 영수증의 구성 요소를 보기 좋게 정렬하여 고객이 쉽게 금액과 수량을 확인할 수 있게 한다.
</details>

<br/>
<br/>

# 5. 입출력 요구사항

<details>
<summary>입출력 요구사항</summary>

### 입력

1. 구현에 필요한 상품 목록과 행사 목록을 파일 입출력을 통해 불러온다.

   - `public/products.md`과 `public/promotions.md`파일을 이용한다.
   - 두 파일 모두 내용의 형식을 유지한다면 값은 수정할 수 있다.

2. 구매할 상품과 수량을 입력 받는다. 상품명, 수량은 하이픈(-)으로, 개별 상품은 대괄호([])로 묶어 쉼표(,)로 구분한다.

```
[콜라-10],[사이다-3]
```

3. 프로모션 적용이 가능한 상품에 대해 고객이 해당 수량보다 적게 가져온 경우, 그 수량만큼 추가 여부를 입력받는다.
   - `Y` : 증정 받을 수 있는 상품을 추가한다.
   - `N` : 증정 받을 수 있는 상품을 추가하지 않는다.

```
Y
```

4. 프로모션 재고가 부족하여 일부 수량을 프로모션 혜택 없이 결제해야 하는 경우, 일부 수량에 대해 정가로 결제할지 여부를 입력받는다.
   - `Y` : 일부 수량에 대해 정가로 결제한다.
   - `N` : 정가로 결제해야하는 수량만큼 제외한 후 결제를 진행한다.

```
Y
```

5. 멤버십 할인 적용 여부를 입력 받는다.
   - `Y` : 멤버십 할인을 적용한다.
   - `N` : 멤버십 할인을 적용하지 않는다.

```
Y
```

5. 추가 구매 여부를 입력 받는다.
   - `Y` : 재고가 업데이트된 상품 목록을 확인 후 추가로 구매를 진행한다.
   - `N` : 구매를 종료한다.

```
Y
```

### 출력

1. 환영 인사와 함께 상품명, 가격, 프로모션 이름, 재고를 안내한다. 만약 재고가 0개라면 재고 없음을 출력한다.

```
 안녕하세요. W편의점입니다.
현재 보유하고 있는 상품입니다.

- 콜라 1,000원 10개 탄산2+1
- 콜라 1,000원 10개
- 사이다 1,000원 8개 탄산2+1
- 사이다 1,000원 7개
- 오렌지주스 1,800원 9개 MD추천상품
- 오렌지주스 1,800원 재고 없음
- 탄산수 1,200원 5개 탄산2+1
- 탄산수 1,200원 재고 없음
- 물 500원 10개
- 비타민워터 1,500원 6개
- 감자칩 1,500원 5개 반짝할인
- 감자칩 1,500원 5개
- 초코바 1,200원 5개 MD추천상품
- 초코바 1,200원 5개
- 에너지바 2,000원 5개
- 정식도시락 6,400원 8개
- 컵라면 1,700원 1개 MD추천상품
- 컵라면 1,700원 10개

구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])

```

2. 프로모션 적용이 가능한 상품에 대해 고객이 해당 수량만큼 가져오지 않았을 경우, 혜택에 대한 안내 메시지를 출력한다.

```
 현재 {상품명}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)
```

3. 프로모션 재고가 부족하여 일부 수량을 프로모션 혜택 없이 결제해야 하는 경우, 일부 수량에 대해 정가로 결제할지 여부에 대한 안내 메시지를 출력한다.

```
현재 {상품명} {수량}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)
```

4. 멤버십 할인 적용 여부를 확인하기 위해 안내 문구를 출력한다.

```
멤버십 할인을 받으시겠습니까? (Y/N)
```

5. 구매 상품 내역, 증정 상품 내역, 금액 정보를 출력한다.

```
==============W 편의점================
상품명		수량	금액
콜라		3 	3,000
에너지바 		5 	10,000
=============증	정===============
콜라		1
====================================
총구매액		8	13,000
행사할인			-1,000
멤버십할인			-3,000
내실돈			 9,000
```

6. 추가 구매 여부를 확인하기 위해 안내 문구를 출력한다.

```
감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)
```

</details>
<details>
<summary>실행결과 예시</summary>

<br/>

```
  안녕하세요. W편의점입니다.
현재 보유하고 있는 상품입니다.

- 콜라 1,000원 10개 탄산2+1
- 콜라 1,000원 10개
- 사이다 1,000원 8개 탄산2+1
- 사이다 1,000원 7개
- 오렌지주스 1,800원 9개 MD추천상품
- 오렌지주스 1,800원 재고 없음
- 탄산수 1,200원 5개 탄산2+1
- 탄산수 1,200원 재고 없음
- 물 500원 10개
- 비타민워터 1,500원 6개
- 감자칩 1,500원 5개 반짝할인
- 감자칩 1,500원 5개
- 초코바 1,200원 5개 MD추천상품
- 초코바 1,200원 5개
- 에너지바 2,000원 5개
- 정식도시락 6,400원 8개
- 컵라면 1,700원 1개 MD추천상품
- 컵라면 1,700원 10개

구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])
[콜라-3],[에너지바-5]

멤버십 할인을 받으시겠습니까? (Y/N)
Y

==============W 편의점================
상품명		수량	금액
콜라		3 	3,000
에너지바 		5 	10,000
=============증	정===============
콜라		1
====================================
총구매액		8	13,000
행사할인			-1,000
멤버십할인			-3,000
내실돈			 9,000

감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)
Y

안녕하세요. W편의점입니다.
현재 보유하고 있는 상품입니다.

- 콜라 1,000원 7개 탄산2+1
- 콜라 1,000원 10개
- 사이다 1,000원 8개 탄산2+1
- 사이다 1,000원 7개
- 오렌지주스 1,800원 9개 MD추천상품
- 오렌지주스 1,800원 재고 없음
- 탄산수 1,200원 5개 탄산2+1
- 탄산수 1,200원 재고 없음
- 물 500원 10개
- 비타민워터 1,500원 6개
- 감자칩 1,500원 5개 반짝할인
- 감자칩 1,500원 5개
- 초코바 1,200원 5개 MD추천상품
- 초코바 1,200원 5개
- 에너지바 2,000원 재고 없음
- 정식도시락 6,400원 8개
- 컵라면 1,700원 1개 MD추천상품
- 컵라면 1,700원 10개

구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])
[콜라-10]

현재 콜라 4개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)
Y

멤버십 할인을 받으시겠습니까? (Y/N)
N

==============W 편의점================
상품명		수량	금액
콜라		10 	10,000
=============증	정===============
콜라		2
====================================
총구매액		10	10,000
행사할인			-2,000
멤버십할인			-0
내실돈			 8,000

감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)
Y

안녕하세요. W편의점입니다.
현재 보유하고 있는 상품입니다.

- 콜라 1,000원 재고 없음 탄산2+1
- 콜라 1,000원 7개
- 사이다 1,000원 8개 탄산2+1
- 사이다 1,000원 7개
- 오렌지주스 1,800원 9개 MD추천상품
- 오렌지주스 1,800원 재고 없음
- 탄산수 1,200원 5개 탄산2+1
- 탄산수 1,200원 재고 없음
- 물 500원 10개
- 비타민워터 1,500원 6개
- 감자칩 1,500원 5개 반짝할인
- 감자칩 1,500원 5개
- 초코바 1,200원 5개 MD추천상품
- 초코바 1,200원 5개
- 에너지바 2,000원 재고 없음
- 정식도시락 6,400원 8개
- 컵라면 1,700원 1개 MD추천상품
- 컵라면 1,700원 10개

구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])
[오렌지주스-1]

현재 오렌지주스은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)
Y

멤버십 할인을 받으시겠습니까? (Y/N)
Y

==============W 편의점================
상품명		수량	금액
오렌지주스		2 	3,600
=============증	정===============
오렌지주스		1
====================================
총구매액		2	3,600
행사할인			-1,800
멤버십할인			-0
내실돈			 1,800

감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)
N
```

  </details>
  <br/>
  <br/>

# 6. Project Structure (프로젝트 구조)

<details>
<summary>폴더구조</summary>

//이후 추가 예정

</details>

<br/>
<br/>

# 7. 커밋 컨벤션

## 기본 구조

```md
<type>(<scope>): <subject>

<body>

<footer>
```

<details>
<summary>type 종류</summary>

## type 종류

```
feat (feature) - 기능
fix (bug fix)  - 수정
docs (documentation) - 문서작업
style (formatting, missing semi colons, …) - 스타일 (서식 누락)
refactor - 리팩토링
test (when adding missing tests)- 테스트
chore (maintain) - 잡일(기타..)
```

</details>

<details>
<summary>커밋 형식 설명</summary>

## 커밋 형식 설명

- `type` : 커밋 타입
- `scope` : 커밋이 변경된 위치 작성
  - 함수 변경되면 함수이름, 메서드 추가 및 클래스 이름이 될 수도 있음
- `subject` : 명령형, 현재형 언어 사용. 커밋 주제
- `body` : 변경된 부분 설명 및 이전 행동과 대조
- `footer` : 주요 변경사항은 참고 사항이랑 footer에 언급필요

</details>

<details>
<summary>커밋 예시</summary>

## 커밋 예시

```md
[FEAT] (vaildator) : 자동차 이름 유효성 검사

- 각 자동차의 이름이 5글자 이하인지
- 빈 문자열(자동차 이름)이 존재하는지
  (여기서는 "," 기준으로 분리되어 들어온 문자열 list들이므로
  빈 문자열은 "a,a,,b" 이런식으로 ","가 2번 이상 연속된 경우 예외처리)
- 동일한 자동차 이름이 존재하는지

문자열을 분리한 후 각각의 이름에 대한 유효성 검사를 진행합니다.
```

</details>
<br/>
