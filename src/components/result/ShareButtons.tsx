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
  const [kakaoMessage, setKakaoMessage] = useState(false);
  const [resolvedUrl, setResolvedUrl] = useState(shareUrl);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setResolvedUrl(window.location.href);
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
    setKakaoMessage(true);
    timerRef.current = setTimeout(() => setKakaoMessage(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <RetroButton variant="win98" size="md" onClick={handleTwitterShare}>
        X/Twitter 공유
      </RetroButton>

      <RetroButton variant="win98" size="md" onClick={handleCopyLink}>
        {copied ? "복사 완료!" : "링크 복사"}
      </RetroButton>

      <RetroButton variant="win98" size="md" onClick={handleKakaoShare}>
        {kakaoMessage ? "준비 중" : "카카오톡 공유"}
      </RetroButton>
    </div>
  );
}
