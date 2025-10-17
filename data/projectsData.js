const projectsData = [
  {
    title: 'OpenStack 환경 구축',
    description: `OpenStack을 직접 구축하며 클라우드 인프라의 구조와 서비스 간 동작 원리를 이해한 프로젝트입니다. 
                Controller, Compute, Network, Storage 노드로 구성된 환경을 수동 설치 방식으로 구축하였으며, Self-Service Network와 Floating IP를 통한 외부 통신을 구현하며 실제 클라우드 서비스 환경과 유사한 구조를 실습했습니다.`,
    imgSrc: '',
    href: '',
    github: 'https://github.com/2018007956/TIL/tree/main/OpenStack',
    tech1: 'OpenStack',
    tech2: 'Network',
    tech3: 'Linux',
  },
  {
    title: 'OpenStack SDK / CLI',
    description: `오픈소스 컨트리뷰션 아카데미에 참여하여 openstacksdk에서 openstack user 명령어의 CRUD 기능에 대한 기능 테스트를 구현했습니다. 이 과정에서 Gerrit 기반 코드 리뷰와 Zuul을 활용한 테스트 과정을 거치며, 다수의 기여자가 동시에 작업하는 오픈소스에서의 협업 프로세스를 경험할 수 있었습니다.`,
    imgSrc: '',
    href: 'https://review.opendev.org/c/openstack/openstacksdk/+/959336',
    github: '',
    tech1: 'OpenStack',
    tech2: 'Python',
    tech3: 'Gerrit',
  },
  {
    title: '주가 예측 서비스, 알려주가AI',
    description: `1일 뒤부터 7일 뒤까지의 일자별 주가 동향 예측 정보와 관련 주식 정보를 제공하여 단기투자자들에게 인사이트를 제공하는 모바일 웹앱 서비스입니다.`,
    imgSrc: '',
    href: '',
    github: 'https://github.com/boostcampaitech6/level2-3-cv-finalproject-cv-01',
    tech1: 'FastAPI',
    tech2: 'MySQL',
    tech3: 'NCP',
  },
  {
    title: 'AI 기반의 커뮤니티 플랫폼',
    description: `스터디 학습 환경 개선을 위한 AI 답변 시스템을 적용한 커뮤니티 플랫폼입니다. `,
    imgSrc: '',
    href: '',
    github: 'https://github.com/2018007956/Preddit',
    tech1: 'TypeScript',
    tech2: 'PostgreSQL',
    tech3: 'Gemma2 API',
  },
]

export default projectsData
