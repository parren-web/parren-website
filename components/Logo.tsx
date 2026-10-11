import Image from "next/image";

type LogoProps = {
  size?: number;
  showWordmark?: boolean;
};

/**
 * Parren brand lockup — official app icon artwork + wordmark.
 * Source: Brand Kit v1.0 ("App icon & avatar").
 */
export default function Logo({ size = 36, showWordmark = true }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src="/logo-icon.png"
        alt="Parren logo"
        width={size}
        height={size}
        className="rounded-[10px]"
        style={{
          boxShadow: "0 6px 24px -6px rgba(24,123,255,0.55)",
        }}
        priority
      />
      {showWordmark && (
        <span
          className="font-display text-xl tracking-tight text-white"
          style={{ fontWeight: 800 }}
        >
          Parren<span className="text-cyan-300">.ai</span>
        </span>
      )}
    </span>
  );
}
