interface KakaoShareContent {
  title: string;
  description: string;
  imageUrl: string;
  link: { mobileWebUrl: string; webUrl: string };
}

interface KakaoShareButton {
  title: string;
  link: { mobileWebUrl: string; webUrl: string };
}

interface KakaoShare {
  sendDefault(params: {
    objectType: "feed";
    content: KakaoShareContent;
    buttons?: KakaoShareButton[];
  }): void;
}

interface KakaoStatic {
  init(appKey: string): void;
  isInitialized(): boolean;
  Share: KakaoShare;
}

interface Window {
  Kakao?: KakaoStatic;
}
