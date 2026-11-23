import symbol from "@/assets/simbolo-minus-1.png";

const BrandMark = ({ className = "" }: { className?: string }) => (
  <span
    aria-hidden="true"
    className={`inline-block h-10 w-10 bg-gradient-to-br from-primary to-mystic ${className}`}
    style={{
      maskImage: `url(${symbol})`,
      maskSize: "contain",
      maskPosition: "center",
      maskRepeat: "no-repeat",
      WebkitMaskImage: `url(${symbol})`,
      WebkitMaskSize: "contain",
      WebkitMaskPosition: "center",
      WebkitMaskRepeat: "no-repeat",
    }}
  />
);

export default BrandMark;
