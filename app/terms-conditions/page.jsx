import { NavBar } from "../../components/nav-bar"
import { Footer } from "../../components/footer"

export default function TermsConditionsPage() {
  return (
    (<div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-40">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6 text-[#2F4F4F]">Terms & Conditions</h1>
          <div className="prose prose-sm max-w-none">
            <p>Welcome to StyleMate! By using our website or app, you agree to abide by the following Terms & Conditions.</p>
            
            <h2>1. Use of the Service</h2>
            <ul>
              <li>StyleMate provides outfit suggestions, wardrobe organization tools, and styling tips.</li>
              <li>You agree to use the platform responsibly and not engage in misuse, such as unauthorized data uploads.</li>
            </ul>

            <h2>2. User Content</h2>
            <p>You own any content (e.g., images) you upload but grant StyleMate the right to store and process it for app functionality.</p>

            <h2>3. Account Responsibilities</h2>
            <ul>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>Notify us immediately of any unauthorized use of your account.</li>
            </ul>

            <h2>4. Intellectual Property</h2>
            <p>All app and website designs, content, and features are the property of StyleMate. Do not copy or reproduce any part without permission.</p>

            <h2>5. Limitation of Liability</h2>
            <p>StyleMate is not responsible for:</p>
            <ul>
              <li>Decisions made based on outfit recommendations.</li>
              <li>Any loss or damages arising from misuse of the app.</li>
            </ul>

            <h2>6. Modifications</h2>
            <p>We reserve the right to update these Terms & Conditions. Continued use after changes implies acceptance of the revised terms.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>)
  );
}

