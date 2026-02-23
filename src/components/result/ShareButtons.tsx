"use client";

import { useEffect, useRef, useState } from "react";
import { getResultLevel } from "@/lib/result-levels";
import { RetroButton } from "@/components/ui/RetroButton";

interface ShareButtonsProps {
  score: number;
  shareUrl: string;
}

export function ShareButtons({ score, shareUrl }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [resolvedUrl, setResolvedUrl] = useState(shareUrl);
  const [kakaoReady, setKakaoReady] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setResolvedUrl(window.location.href);
  }, []);

  useEffect(() => {
    const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
    if (!kakaoAppKey) return;

    const initKakao = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(kakaoAppKey);
      }
      if (window.Kakao?.isInitialized()) {
        setKakaoReady(true);
      }
    };

    if (window.Kakao) {
      initKakao();
    } else {
      const interval = setInterval(() => {
        if (window.Kakao) {
          initKakao();
          clearInterval(interval);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const level = getResultLevel(score);

  const tweetText = `나는 90년대를 ${score}% 기억한다! 🎮 추억퀴즈에서 ${level.title} 등급을 받았어요!`;

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(resolvedUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(resolvedUrl);
      setCopied(true);
    } catch {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = resolvedUrl;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(true);
      } catch {
        alert("링크를 복사할 수 없습니다. 주소창에서 직접 복사해주세요.");
        return;
      }
    }
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  const handleKakaoShare = () => {
    if (!kakaoReady || !window.Kakao) {
      handleCopyLink();
      return;
    }

    const baseUrl = resolvedUrl.split("/result/")[0];
    const ogImageUrl = `${baseUrl}/api/og?score=${score}&category=&level=${encodeURIComponent(level.title)}`;

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `${level.title} - 추억퀴즈`,
        description: `나는 90년대를 ${score}% 기억한다! 🎮`,
        imageUrl: ogImageUrl,
        link: {
          mobileWebUrl: resolvedUrl,
          webUrl: resolvedUrl,
        },
      },
      buttons: [
        {
          title: "나도 퀴즈 풀기",
          link: {
            mobileWebUrl: baseUrl,
            webUrl: baseUrl,
          },
        },
      ],
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <RetroButton variant="win98" size="md" onClick={handleKakaoShare}>
        카카오톡 공유
      </RetroButton>

      <RetroButton variant="win98" size="md" onClick={handleTwitterShare}>
        X/Twitter 공유
      </RetroButton>

      <RetroButton variant="win98" size="md" onClick={handleCopyLink}>
        {copied ? "복사 완료!" : "링크 복사"}
      </RetroButton>
    </div>
  );
}
