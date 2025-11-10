import logoNestelia from "@/assets/logo_nestelia.webp";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "h-16 md:h-20",
  md: "h-24 md:h-32",
  lg: "h-32 md:h-48 lg:h-64",
  xl: "h-48 md:h-64 lg:h-80",
};

export default function Logo({ size = "lg", className = "" }: LogoProps) {
  return (
    <img
      src={logoNestelia}
      alt="Nestelia"
      className={`${sizeClasses[size]} w-auto object-contain ${className}`}
      style={{
        filter: "hue-rotate(-15deg) saturate(1.2) brightness(1.1)",
      }}
    />
  );
}
