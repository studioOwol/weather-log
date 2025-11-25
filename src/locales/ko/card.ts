export default {
  add: {
    title: "새로운 기록 추가하기",
    description: "오늘의 날씨 기록을 추가합니다.",
  },
  edit: {
    title: "기록 수정하기",
    description: "기록을 수정합니다.",
  },
  delete: {
    title: "기록 삭제하기",
    description: "{{date}}의 기록을 삭제하시겠습니까?",
    warning: "삭제 후 되돌릴 수 없습니다.",
    confirm: "삭제",
  },
  field: {
    date: "날짜",
    location: "위치",
    minTemp: "최저 기온",
    maxTemp: "최고 기온",
    note: "메모",
    notePlaceholder: "메모를 추가해보세요",
  },
  button: {
    cancel: "취소",
    save: "저장",
    saving: "저장 중...",
    update: "수정",
    updating: "수정 중...",
    delete: "삭제",
    deleting: "삭제 중...",
    refresh: "새로고침",
    refreshing: "새로고침 중...",
  },
  loading: {
    location: "위치 정보를 가져오는 중...",
    weather: "날씨 정보를 가져오는 중...",
  },
  error: {
    locationNotFound: "위치 정보를 사용할 수 없습니다.",
    weatherNotFound: "날씨 정보를 사용할 수 없습니다.",
    addressRefreshFailed: "주소를 새로고침하는데 실패했습니다.",
  },
} as const
