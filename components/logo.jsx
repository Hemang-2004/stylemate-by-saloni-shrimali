import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-1 z-1000">  {/* Adjusted z-index */}
      <div className="relative w-10 h-26"> {/* Adjusted height */}
        <Image
          src="/logo.png"
          alt="StyleMate Logo"
          width={40}  // Adjust the width accordingly if needed
          height={80}  // Adjusted height to blend better with navbar
          className="object-contain" />
      </div>
      <span
        className="font-serif text-2xl tracking-wide bg-gradient-to-r from-[#556B2F] to-[#3A4A1C] bg-clip-text text-transparent font-bold">
        StyleMate
      </span>
    </Link>
  );
}
