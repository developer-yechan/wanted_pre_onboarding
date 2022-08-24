# wanted_pre_onboarding

## Database Modeling

![image](https://user-images.githubusercontent.com/99064214/186046791-4e51e941-a73e-4bd1-8085-19ea323030b4.png)

#
필요한 모델인 회사, 사용자, 채용공고 외 지원내역, 기술 , 필요 기술 모델 추가로 구현
#
하나의 회사가 여러개의 채용공고를 올릴 수 있기 때문에 회사와 채용공고는 1:N 관계


따라서 채용공고는 회사의 id를 참조하는 foreign key로 companyId를 갖는다. 

#

한 채용 공고에 여러 기술이 포함될 수 있고 하나의 기술이 여러 채용 공고에 포함 될 수 있으므로


채용공고와 기술을 N:M 관계


필요 기술 모델은 채용공고와 기술 테이블의 중간 테이블로


속성은 채용공고의 id와 기술의 id를 참조하는 다중 foreign key 채용공고id와 기술id로 구성

#

한명의 사용자가 여러 채용공고에 지원할 수 있고 한개의 채용공고에도 여러 사용자가 지원할 수 있기 때문에 사용자와 채용공고도 N:M 관계


따라서 지원내역 모델은 사용자와 채용공고의 중간테이블


속성은 채용공고의 id와 사용자의 id를 참조하는 다중 foreign key 채용공고id와 시용자id로 구성
#
## 구현 과정(문제해결과 느낀점 중심으로)


### 채용 공고 READ API

1. N:M 관계 테이블 조인

채용공고를 READ API를 구현할 때 jobPosting 테이블과 companies 테이블 그리고 skills 테이블을 조인을 해야 요구사항에 있는 정보를 모두 포함하는 api를 만들 수 있었다.

raw query를 썼다면 jobPosting 테이블과 skills table 사이 required_skills table을 먼저 조인해야 skills 테이블을 조인할 수 있어서 더 쿼리가 복잡해졌을 것이다.

하지만 시퀄라이즈에서는 jobPosting과 skills를 belongsToMany 함수로 관계를 설정해 놓으니 skills를 바로 조인할 수 있었다.

채용공고에서 여러개의 기술을 등록할 경우가 있으니 기술이 배열 형태의 value가 return 되야 했는데 이 역시도 raw query로 하려면 group by 등 추가적으로 작성해줘야할 쿼리가 있어 번거로운데 sequelize는 알아서 배열 형태로 return 해주니 정말 편했다.

2. 채용상세API 회사가 올린 다른 채용공고

원래 jobPosting 테이블의 companyId를 기준으로 셀프 조인을 해서 정보를 가져올 수 있지 않을까?하는 생각으로
셀프 조인을 시퀄라이즈 문법으로 구현하려고 했으나 잘되지 않았다.
그래서 
1. 채용공고id에 해당하는 채용공고를 findOne 메소드로 가져왔다. 
2. 앞서 가져온 채용공고에서 채용공고id와 회사 id를 가져와서 findAll 메소드로 채용공고 id는 다르면서 회사id는 같은 조건을 주어  회사가 올린 다른 채용공고를 가져왔다.
3. otherPosts라는 key 값으로 1에서 가져온 채용공고에 회사가 올린 다른 채용공고를 추가했다. 
이런 식으로 구현했다.
