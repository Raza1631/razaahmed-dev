"use client";

import Image from "next/image";
import { useState } from "react";

type ProfilePhotoProps = {
  src: string;
  /** Whether the file exists in /public (checked on the server). */
  available: boolean;
};

export function ProfilePhoto({ src, available }: ProfilePhotoProps) {
  const [failed, setFailed] = useState(false);

  if (!available || failed) {
    return (
      <div
        role="img"
        aria-label="Profile photo placeholder for Raza Ahmed"
        className="bg-surface text-muted flex h-full w-full items-center justify-center text-7xl font-semibold tracking-tight"
      >
        RA
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt="Portrait of Raza Ahmed"
      fill
      priority
      sizes="(min-width: 1024px) 460px, (min-width: 640px) 420px, 90vw"
      className="object-cover object-top"
      onError={() => setFailed(true)}
    />
  );
}
