import { NavBar } from "../../components/nav-bar"
import { Footer } from "../../components/footer"

export default function PrivacyPolicyPage() {
  return (
    (<div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-40">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6 text-[#2F4F4F]">Privacy Policy</h1>
          <div className="prose prose-sm max-w-none">
            <p>At StyleMate, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and app.</p>
            
            <h2>1. Information We Collect</h2>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, and contact details provided during registration.</li>
              <li><strong>Usage Data:</strong> Information about your device, browsing patterns, and app usage.</li>
              <li><strong>Uploaded Content:</strong> Any images or wardrobe-related data uploaded to the virtual closet.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use your data to:</p>
            <ul>
              <li>Provide outfit recommendations and enhance your user experience.</li>
              <li>Manage and improve the app and website functionality.</li>
              <li>Communicate updates, offers, and personalized content.</li>
            </ul>

            <h2>3. Data Sharing</h2>
            <p>We do not sell or share your personal information with third parties unless:</p>
            <ul>
              <li>Required by law.</li>
              <li>Necessary to improve services via trusted partners (e.g., analytics providers).</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>We implement advanced security measures to protect your information. However, no system can guarantee 100% security.</p>

            <h2>5. Your Rights</h2>
            <p>You may access, modify, or delete your personal data anytime. For assistance, contact us using the details mentioned in the Contact Us section of the website.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>)
  );
}

