'use client';
import { useState } from "react"
import { VerticalTimeline } from "./vertical-timeline"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { AnimatePresence } from "framer-motion";
import { ScrollArea } from "./ui/scroll-area"

const blogPosts = [
  {
    date: "May 15, 2024",
    title: "From Clutter to Chic: Master the Art of Wardrobe Organization",
    content: "Discover how to transform your cluttered closet into a well-organized fashion haven...",
    image: "/blog1.png",
    fullContent: `
      <h1>From Clutter to Chic: Master the Art of Wardrobe Organization</h1>

      <p>Have you ever looked at your wardrobe full of clothes and felt like you have nothing to wear? You're not alone. A cluttered wardrobe is one of the biggest barriers to effortless styling. The secret to a stress-free and stylish life lies in wardrobe organization. By creating a streamlined and functional closet, you can unlock endless outfit possibilities, rediscover old favorites, and save precious time.</p>

      <h3>Step 1: Declutter with Purpose</h3>
      <p>Begin by taking everything out of your wardrobe. Yes, everything. Divide your clothes into three piles: Keep, Donate, and Recycle. Ask yourself:</p>
      <ul>
        <li>Do I love this piece?</li>
        <li>Does it fit me well?</li>
        <li>Have I worn it in the past six months?</li>
      </ul>
      <p>Anything that doesn't make the cut belongs in the Donate or Recycle pile. This step clears out the unnecessary, making space for the pieces you truly love.</p>

      <h3>Step 2: Categorize Your Wardrobe</h3>
      <p>Once you've narrowed it down to the essentials, organize your closet by categories: workwear, casuals, party outfits, and seasonal pieces. This system makes it easy to locate exactly what you need.</p>
      <p>For an extra layer of organization, sort items by color. Not only does this make your wardrobe look aesthetically pleasing, but it also helps in creating color-coordinated outfits effortlessly.</p>

      <h3>Step 3: Embrace the Digital Wardrobe</h3>
      <p>Here's where technology comes in. StyleMate's Virtual Closet feature allows you to digitize your wardrobe. Upload pictures of your clothes, and the app organizes them for you. The best part? It suggests outfits based on what you already own.</p>

      <h3>Step 4: Maintain Your Closet</h3>
      <p>Wardrobe organization isn't a one-time activity. Make it a habit to reassess your closet every three months. This practice ensures you stay on top of your fashion game and avoid accumulating unnecessary clutter.</p>

      <h3>The StyleMate Advantage</h3>
      <p>With StyleMate, wardrobe organization becomes effortless. The app doesn't just help you manage your closet; it enhances your styling experience. From outfit suggestions to decluttering tips, StyleMate is your ultimate fashion companion.</p>

      <p>Ready to go from cluttered to chic? Let StyleMate guide you through your style journey. Your dream wardrobe is just a few steps away!</p>
    `
  },
  {
    date: "June 2, 2024",
    title: "Dress for Every Mood: How Personalised Outfit Suggestions Can Transform Your Style",
    content: "Learn how personalized outfit suggestions can transform your style...",
    image: "/blog2.png",
    fullContent: `
      <h2>Dress for Every Mood: How Personalised Outfit Suggestions Can Transform Your Style</h2>

      <p>Fashion is more than just clothes—it's an expression of who you are and how you feel. But what happens when your mood says one thing and your wardrobe says another? Enter personalized outfit suggestions, the game-changer that lets your style adapt to your emotions.</p>

      <h3>Why Mood Matters in Fashion?</h3>
      <p>Your outfit is a reflection of your state of mind. Feeling confident? You might reach for bold colors and sharp silhouettes. Craving comfort? Cozy knits and neutral tones might be your go-to. The beauty of personalized styling lies in its ability to align your look with your mood.</p>

      <h3>Mood-Driven Styling in Action</h3>
      <p>Imagine this: it's a gloomy Monday morning, and you're not feeling your best. Instead of defaulting to the same old jeans and t-shirt, your personalized outfit suggestion highlights a chic but comfortable sweater-dress paired with sneakers. It's effortless yet elevates your vibe.</p>
      <p>For a night out, your mood might call for something daring—a leather jacket over a sleek jumpsuit, accessorized with statement earrings. Personalized suggestions help you take the guesswork out of styling, making every outfit feel just right.</p>

      <h3>How StyleMate Helps?</h3>
      <p>StyleMate uses advanced algorithms to match your mood and preferences with outfits in your wardrobe. Whether it's a sunny brunch date or a high-stakes meeting, the app ensures you're dressed to impress.</p>

      <h3>The Benefits of Mood-Based Dressing</h3>
      <ol>
        <li><strong>Boosted Confidence:</strong> When you feel good in your outfit, it shows.</li>
        <li><strong>Time-Saving:</strong> No more wasting time debating what to wear.</li>
        <li><strong>Creative Expression:</strong> Experiment with styles that align with how you feel.</li>
      </ol>

      <p>Personalized outfit suggestions aren't just a luxury—they're a necessity. Let StyleMate elevate your style, one mood at a time.</p>
    `
  },
  {
    date: "July 10, 2024",
    title: "Fashion That Fits: Understanding Your Personal Style and Body Type",
    content: "Understand your personal style and body type for a perfect wardrobe...",
    image: "/blog3.jpeg",
    fullContent: `
    <h2>Fashion That Fits: Understanding Your Personal Style and Body Type</h2>

    <p>Fashion is not just about wearing the latest trends—it's about feeling great in what you wear. The foundation of great style is understanding your personal style and body type. When you dress in a way that highlights your unique features and resonates with your personality, you unlock a world of confidence, creativity, and authenticity.</p>
    
    <h3>Why Understanding Your Body Type is Essential</h3>
    <p>Not all outfits suit every body shape, and that's perfectly okay! By identifying your body type, you can play to your strengths and dress in a way that flatters your natural silhouette. This isn't about rules—it's about guidelines that help you feel and look your best.</p>
    
    <h3>Common Body Types and Styling Tips</h3>
    
    <h4>1. Pear Shape</h4>
    <ul>
      <li><strong>Characteristics:</strong> Narrow shoulders and a wider hip area.</li>
      <li><strong>Styling Tips:</strong>
        <ul>
          <li>Highlight your waistline with A-line skirts or high-waisted trousers.</li>
          <li>Opt for structured tops, ruffles, or puff sleeves to draw attention to your upper body.</li>
          <li>Use darker shades for bottoms and brighter or patterned tops to create balance.</li>
        </ul>
      </li>
    </ul>
    
    <h4>2. Hourglass Shape</h4>
    <ul>
      <li><strong>Characteristics:</strong> Well-defined waist with proportional shoulders and hips.</li>
      <li><strong>Styling Tips:</strong>
        <ul>
          <li>Accentuate your curves with fitted dresses and wrap tops.</li>
          <li>Choose high-waisted jeans or skirts to emphasize your waist.</li>
          <li>Avoid overly baggy clothing that hides your natural silhouette.</li>
        </ul>
      </li>
    </ul>
    
    <h4>3. Rectangle Shape</h4>
    <ul>
      <li><strong>Characteristics:</strong> Straight body shape with minimal curves.</li>
      <li><strong>Styling Tips:</strong>
        <ul>
          <li>Add dimension with layered outfits, like a cropped jacket over a flowy dress.</li>
          <li>Use belts to cinch your waist and create the illusion of curves.</li>
          <li>Opt for peplum tops, pleated skirts, or flared trousers for added volume.</li>
        </ul>
      </li>
    </ul>
    
    <h4>4. Apple Shape</h4>
    <ul>
      <li><strong>Characteristics:</strong> Broader upper body with a less defined waistline.</li>
      <li><strong>Styling Tips:</strong>
        <ul>
          <li>Choose empire-waist dresses that flow away from the midsection.</li>
          <li>Use V-neck tops to elongate your frame and draw attention upward.</li>
          <li>Opt for tunics or A-line silhouettes to create a balanced look.</li>
        </ul>
      </li>
    </ul>
    
    <h3>Defining Your Personal Style</h3>
    <p>Fashion is an extension of your personality. Whether you lean toward clean, modern lines or prefer bold, eclectic patterns, defining your personal style allows you to express yourself authentically.</p>
    
    <h4>Common Style Archetypes:</h4>
    <ol>
      <li><strong>Minimalist:</strong> Clean cuts, neutral tones, and timeless pieces.</li>
      <li><strong>Boho-Chic:</strong> Flowy fabrics, earthy tones, and intricate details.</li>
      <li><strong>Edgy:</strong> Leather jackets, studded accessories, and statement pieces.</li>
      <li><strong>Classic:</strong> Tailored blazers, elegant dresses, and subtle sophistication.</li>
      <li><strong>Trendy:</strong> The latest colors, patterns, and cuts that dominate the runway.</li>
    </ol>
    
    <p>To find your style, take inspiration from your wardrobe. Which pieces do you wear most often? Which outfits make you feel your best? Combine this with visual inspiration from fashion magazines or social media platforms to refine your unique aesthetic.</p>
    
    <h3>The Confidence of Dressing for You</h3>
    <p>Fashion is ultimately about you. The more you understand your body type and personal style, the more you can make confident, intentional choices. When your clothes complement your natural beauty and align with your inner self, you don't just wear the outfit—you own it.</p>
    
    <p>With StyleMate, embracing your unique style has never been easier. It's not just about looking good; it's about feeling empowered every time you step out.</p>
    
    <p>Ready to elevate your wardrobe? Let StyleMate be your guide. Together, we'll redefine what it means to dress for success—one perfectly curated outfit at a time!</p>
    
    `
  },
  {
    date: "August 5, 2024",
    title: "The Sustainable Closet: How to Look Great and Save the Planet",
    content: "Discover how to build a sustainable wardrobe that's stylish and eco-friendly...",
    image: "/blog4.png",
    fullContent: `
      <h2>The Sustainable Closet: How to Look Great and Save the Planet</h2>

      <p>The fashion industry, celebrated for its creativity and trends, is also one of the world's largest polluters. Yet, in the face of environmental challenges, there's a growing shift toward sustainable fashion. Imagine a wardrobe that not only helps you look fabulous but also contributes to a healthier planet. This vision is what a sustainable closet offers—a way to merge style with responsibility.</p>

      <h3>What is a Sustainable Closet?</h3>
      <p>A sustainable closet is built on mindful choices, prioritizing quality over quantity, and reducing waste. It emphasizes:</p>
      <ul>
        <li><strong>Maximizing what you already own:</strong> Learning to restyle and reuse your clothes creatively.</li>
        <li><strong>Investing in timeless pieces:</strong> Choosing versatile, durable items that never go out of style.</li>
        <li><strong>Supporting ethical brands:</strong> Opting for brands that focus on environmentally friendly production and fair labor practices.</li>
      </ul>
      <p>Sustainability in fashion isn't just a passing trend—it's a necessity for a better future, both for the planet and for generations to come.</p>

      <h3>Step 1: Rediscover Your Wardrobe</h3>
      <p>Chances are, your closet holds hidden gems—pieces you've forgotten about or think are out of fashion. Start by decluttering and organizing. Here's how:</p>
      <ol>
        <li><strong>Sort through your wardrobe:</strong> Separate items you love, occasionally wear, and no longer need.</li>
        <li><strong>Style rotation:</strong> Rotate your clothing seasonally or monthly to bring older items to the forefront.</li>
        <li><strong>Create new combinations:</strong> Experiment with pairing items you wouldn't normally wear together.</li>
      </ol>
      <p><strong>Pro Tip:</strong> Use a virtual closet tool like StyleMate to digitally organize your wardrobe. The app helps you rediscover pieces and provides fresh outfit ideas based on your collection.</p>

      <h3>Step 2: Mix and Match for Maximum Impact</h3>
      <p>A hallmark of a sustainable closet is versatility. Focus on building a wardrobe where each item can serve multiple purposes. For example:</p>
      <ul>
        <li><strong>The Classic White Shirt:</strong>
          <ul>
            <li>Pair with tailored pants and a blazer for a professional look.</li>
            <li>Tuck into a midi skirt for a chic dinner outfit.</li>
            <li>Dress down with distressed jeans and sneakers for a casual day out.</li>
          </ul>
        </li>
        <li><strong>A Neutral Blazer:</strong>
          <ul>
            <li>Throw it over a floral dress for brunch.</li>
            <li>Combine it with a graphic tee and trousers for an edgy vibe.</li>
          </ul>
        </li>
      </ul>
      <p>StyleMate's outfit suggestion feature can help you unlock endless combinations, ensuring your wardrobe always feels fresh without adding new items.</p>

      <h3>Step 3: Say No to Fast Fashion</h3>
      <p>Fast fashion is inexpensive and trendy but comes at a high cost to the environment. The production processes often involve harmful chemicals, excessive water usage, and exploitative labor practices.</p>
      <p>Instead of succumbing to fast fashion:</p>
      <ul>
        <li><strong>Focus on quality:</strong> Invest in well-made clothing that lasts longer and retains its shape and color.</li>
        <li><strong>Choose timeless over trendy:</strong> Avoid fleeting trends and go for classic styles that you can wear for years.</li>
        <li><strong>Support ethical brands:</strong> Look for labels committed to sustainable production, fair trade, and eco-friendly materials.</li>
      </ul>

      <h3>Step 4: Leverage Technology for Sustainable Styling</h3>
      <p>StyleMate is more than an app—it's your personal stylist and sustainability partner. Here's how it helps:</p>
      <ul>
        <li><strong>Virtual Closet:</strong> Upload your wardrobe to track what you own and avoid unnecessary purchases.</li>
        <li><strong>Outfit Recommendations:</strong> Maximize your wardrobe by combining existing items into new looks.</li>
        <li><strong>Eco-Friendly Tips:</strong> Get reminders to repair, reuse, or donate items rather than discarding them.</li>
      </ul>
      <p>With StyleMate, the focus shifts from "What should I buy next?" to "How can I use what I already have better?"</p>

      <h3>Sustainability Made Stylish</h3>
      <p>A sustainable wardrobe doesn't mean sacrificing style—it's about redefining how you approach fashion. Each piece of clothing you choose to wear, repair, or restyle is a step toward reducing waste and environmental impact.</p>
      <p>Benefits of a Sustainable Closet:</p>
      <ul>
        <li><strong>Cost-Effective:</strong> Save money by buying less and investing in quality pieces.</li>
        <li><strong>Unique Style:</strong> Personalize your wardrobe with curated combinations rather than mass-produced trends.</li>
        <li><strong>Environmental Impact:</strong> Contribute to reducing fashion's carbon footprint and waste.</li>
      </ul>

      <h3>Join the Sustainable Fashion Movement</h3>
      <p>Your wardrobe is more powerful than you think—it can transform both your style and the planet. By adopting sustainable practices, you not only elevate your fashion game but also support a movement that values ethics and the environment.</p>
      <p>Take the first step with StyleMate, and redefine how you shop, style, and wear your clothes. Let's make sustainability not just a choice, but a lifestyle—because looking great and saving the planet go hand in hand.</p>
    `
  }
]
export function BlogSection() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <section className="py-24 bg-[#E6EFE9]">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-16 text-[#2F4F4F]">Our Selected Blogs</h2>
        <VerticalTimeline items={blogPosts} onItemClick={setSelectedPost} />
        <AnimatePresence>
          {selectedPost && (
            <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
                <DialogHeader>
                  <DialogTitle>{selectedPost.title}</DialogTitle>
                  <DialogDescription>{selectedPost.date}</DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-4 max-h-[calc(80vh-10rem)]">
                  <div
                    className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-[#2F4F4F] prose-p:text-gray-600 prose-li:text-gray-600"
                    dangerouslySetInnerHTML={{ __html: selectedPost.fullContent }}
                  />
                </ScrollArea>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}


// const BlogWrite = () => {
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedPost, setSelectedPost] = useState(null);

//   const openFullContentDialog = (post) => {
//     setSelectedPost(post);
//     setOpenDialog(true);
//   };

//   return (
//     <div>
//       <VerticalTimeline posts={blogPosts} onClickPost={openFullContentDialog} />

//       <AnimatePresence>
//         {openDialog && selectedPost && (
//           <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
//             <DialogHeader>
//               <DialogTitle>{selectedPost.title}</DialogTitle>
//               <DialogDescription>{selectedPost.date}</DialogDescription>
//             </DialogHeader>
//             <DialogContent>
//               <ScrollArea>
//                 <div
//                   className="content"
//                   dangerouslySetInnerHTML={{ __html: selectedPost.fullContent }}
//                 />
//               </ScrollArea>
//             </DialogContent>
//           </Dialog>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Blog;
