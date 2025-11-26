export default {
  signOut: {
    title: "로그아웃",
    description: "정말 로그아웃 하시겠습니까?",
    cancel: "취소",
    confirm: "로그아웃",
  },
  signIn: {
    title: "로그인",
    email: "이메일",
    password: "비밀번호",
    submit: "로그인",
    loading: "로그인 중...",
    noAccount: "계정이 없으신가요?",
    signUpLink: "회원가입",
  },
  signUp: {
    title: "회원가입",
    email: "이메일",
    password: "비밀번호 (6자 이상)",
    confirmPassword: "비밀번호 확인",
    submit: "가입하기",
    loading: "계정 생성 중...",
    hasAccount: "이미 계정이 있으신가요?",
    signInLink: "로그인",
    errors: {
      passwordMismatch: "비밀번호가 일치하지 않습니다.",
      passwordTooShort: "비밀번호는 최소 6자 이상이어야 합니다.",
    },
  },
} as const
