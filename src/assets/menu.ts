export const menu = [
  {
    name: '로그인',
    link: '/login',
    icon: 'log-in-icon',
    type: 'logout',
  },
  {
    name: '회원정보 수정',
    link: '/account/info',
    icon: 'user-icon',
    type: 'login',
  },
  {
    name: '테마 변경',
    link: '/account/theme',
    icon: 'toggle-left-icon',
    type: 'login',
  },
  {
    name: '북마크',
    link: '/account/bookmark',
    icon: 'bookmark-icon',
    type: 'login',
  },
  {
    name: '작성내역 관리',
    icon: 'history-icon',
    type: 'login',
    link: '#',
    children: [
      {
        name: '레시피',
        link: '/account/history/recipes',
      },
      {
        name: '댓글',
        link: '/account/history/comments',
      },
    ],
  },
  {
    name: '서비스',
    icon: 'globe-icon',
    link: '#',
    type: 'login,logout',
    children: [
      {
        name: '이용약관',
        link: '/service/terms',
      },
    ],
  },
  {
    name: '로그아웃',
    link: '/logout',
    icon: 'log-out-icon',
    type: 'login',
  },
]
