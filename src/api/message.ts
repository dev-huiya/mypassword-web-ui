
interface Message {
  [index: string]: string[]
}

/**
 * 에러 메세지 보관용 객체
 * 여러 코드에 대해 하나의 메세지를 사용하기 위해 메세지를 키로 사용함.
 * key = message
 * value = error code
 */
const errorMessage: Message = {
  // message : [ codes ]

  // normal error code
  '로그인이 필요합니다.': ['AUTH_REQUIRED'],
  '잘못된 계정 정보입니다.': ['AUTH_WRONG'],
  '캡챠 인증에 실패했습니다.': ['CAPTCHA_FAIL', 'CAPTCHA_EMPTY'],
  // JWT verify 검증 실패
  '로그인 정보가 만료되었습니다.': ['JWT_EXPIRED_ERROR', 'TokenExpiredError'],
  '토큰 검증에 실패했습니다.': ['JWT_VERIFY_ERROR', 'JsonWebTokenError'],
  '아직 활성화되지 않은 토큰입니다.': ['NotBeforeError'],
  // 서버에서 내려온 JWT 관련 오류
  'JWT 키가 없습니다.': ['JWT_KEY_EMPTY'],
  'JWT 공개 키가 없습니다.': ['JWT_PUB_KEY_EMPTY'],
  // 게시판 오류
  '사용자 정보를 찾을 수 없습니다.': ['BOARD_USER_EMPTY', 'USER_EMPTY'],
  '게시판 정보를 찾을 수 없습니다.': ['BOARD_CATEGORY_EMPTY'],
  '게시글을 찾을 수 없습니다.': ['BOARD_NOT_FOUND'],
  '실패 했습니다': ['BOARD_FAIL'],
  '권한이 없습니다.': [
    'BOARD_PERMISSION_FAIL',
    'CATEGORY_PERMISSION_FAIL',
    'PERMISSION_DENIED',
  ],
  '삭제할 수 없는 게시글입니다': ['BOARD_CANNOT_DELETE'],
  // CRUD 오류
  '저장에 실패했습니다.': ['CREATE_FAIL'],
  '수정에 실패했습니다.': ['UPDATE_FAIL'],
  '삭제에 실패했습니다.': ['DELETE_FAIL'],
  '데이터를 찾을 수 없습니다.': ['DATA_NOT_FOUND'],
  // 일반 오류
  '필수 입력값이 누락되었습니다.': ['PARAM_REQUIRED'],
  '입력값이 잘못되었습니다.': ['PARAM_WRONG'],
  '데이터 형식이 일치하지 않습니다.': ['PARAM_MISMATCH'],
  '서버에서 오류가 발생했습니다.': ['SERVER_ERROR'],
  // 유저 관련 오류
  '예전 비밀번호가 잘못되었습니다.': ['PASSWORD_CHANGE_FAIL'],
  '차단된 계정입니다.': ['BANNED'],
  '이메일 인증이 필요합니다.': ['EMAIL_VERIFY_REQUIRED'],
  '이미 같은 정보로 등록된 계정이 있습니다.': ['SNS_NOT_EXIST_BUT_ACCOUNT_EXIST'],
  '이미 같은 종류의 간편 로그인 정보가 해당 계정에 연결되어 있습니다.': ['SNS_DUPLICATE_TYPE'],
  '간편 로그인 정보를 등록하는데 실패했습니다.': ['SNS_CREATE_FAIL'],
  '간편 로그인 정보를 삭제하는데 실패했습니다.': ['SNS_DELETE_FAIL'],
  // 인증 토큰 관련 오류
  '유효하지 않은 인증 토큰 입니다.': ['INVALID_VERIFY_TOKEN'],
  '만료된 인증 코드입니다.': ['VERIFY_TOKEN_EXPIRED'],
  // 비밀번호 관련 오류
  '유효하지 않은 URL 입니다.': ['URL_INVALID'],
  // 에러코드가 없을 때 (기본 메세지)
  '오류가 발생했습니다.': [''],
}

const find = (keyword = ''): string => {
  return Object
    .keys(errorMessage)
    .find(key =>
      errorMessage[key].findIndex(code => code === keyword) > -1
    ) || ''
}

/**
 * 서버에서 내려온 에러 메세지를 문자열로 바꿔주는 함수.
 * @param {string} key 서버에서 내려온 에러 메세지
 */
export const getErrorMessage = (key = ''): string => {
  return find(key) || find('')
}
