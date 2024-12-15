import Link from "next/link"
import { Facebook, Twitter, Instagram } from 'lucide-react'
import ContactPage from "../app/contact/page";
export function Footer() {
  return (
    (<footer className="bg-[#2F4F4F] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">StyleMate</h3>
            <p className="text-sm">Your personal style companion for wardrobe organization and outfit suggestions</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/about" className="hover:underline">About Us</Link></li>
              <li><Link href="/blog" className="hover:underline">Blog</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300"><Facebook /></a>
              <a href="#" className="hover:text-gray-300"><Twitter /></a>
              <a href="#" className="hover:text-gray-300"><Instagram /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-sm text-center">&copy; 2023 StyleMate Productions. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <Link href="/privacy-policy" className="text-sm hover:underline">Privacy Policy</Link>
            <Link href="/terms-conditions" className="text-sm hover:underline">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>)
  );
}

