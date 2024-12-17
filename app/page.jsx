"use client";
import { useState, useEffect } from 'react'
import Image from "next/image"
import { Card } from "../components/ui/card"
import { MenuBar } from "../components/MenuBar"
import { AnimatedButton } from "../components/animated-button"
import { Testimonials } from "../components/testimonials"
import { BlogSection } from "../components/blog-section"
import { WriteBlogSection } from "../components/write-blog-section"
import { Footer } from "../components/footer"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog"
import { ScrollArea } from "../components/ui/scroll-area"
import { CurtainReveal } from "../components/CurtainReveal"
import React from 'react';

const features = [
  {
    title: "Color Coordination Tips",
    image: "/featurex.jpg",
    description: "Get Tips Of Color Coordination only with StyleMate",
    fullContent: `**Color Coordination Tips** 🌈

1. The Rule of 3
Stick to three colors per outfit for a clean, balanced look:
• Base color (dominant): Neutral tones like black, beige, or white.
• Accent color: A brighter shade that pops—like red, emerald, or mustard.
• Highlight color: Accessories (jewelry, shoes, or bags) in a complementary tone.
✨ Example: White top (base), navy trousers (accent), and red heels (highlight).

2. Monochrome Magic
Wearing different shades of the same color creates a polished, elongated look.
• Pair lighter shades on top and darker tones below for a slimming effect.
✨ Example: Light beige blazer, camel trousers, and tan pumps.

3. Complementary Colors
Colors opposite on the color wheel make you stand out while staying chic.
• Think blue & orange, green & pink, or purple & yellow.
• Add neutrals like black, white, or beige to tone it down.
✨ Example: Olive green top with a blush pink skirt and nude heels.

4. Neutral + Bold
Pair a neutral base with a bold, statement color.
• Neutral tones: White, beige, black, gray.
• Bold colors: Red, cobalt blue, or emerald green.
✨ Example: Black jumpsuit + bold red blazer = Instant elegance.

5. Color Blocking
Combine solid, contrasting blocks of colors in your outfit for a fun, edgy vibe.
• Stick to two to three bold shades—like fuchsia, mustard, and cobalt.
✨ Example: Cobalt blue trousers, a mustard top, and white sneakers.`
  },

  {
    title: "Get Styling Tips",
    image: "/feature2.png",
    description: "Style Smartly Style Better Style-Mate",
    fullContent: `Styling Tips 👗✨

1. Know Your Body Type
Dress for your shape to highlight your best features:
•	Apple: Emphasize your waist with A-line dresses or high-waisted pants.
•	Pear: Balance your silhouette with tops in bold colors and wide-leg trousers.
•	Rectangle: Add definition with belts, ruffles, and layered outfits.
•	Hourglass: Fitted clothes, wrap dresses, and V-necks work wonders.

2. Accessorize to Elevate
Accessories can completely transform your outfit:
•	Statement belts define your waist.
•	Layered necklaces add elegance to basics.
•	Bold bags or shoes bring a pop of color.
✨ Tip: Pair a simple black dress with gold hoops and a red clutch for instant glam.

3. Mix Textures for Depth
Combine fabrics like denim, silk, and leather to add dimension to your look.
•	Example: A soft knit sweater with a leather skirt creates effortless chic vibes.

4. Go Sustainable
Re-style and mix pieces from your wardrobe:
•	Use a scarf as a belt or headband.
•	Layer a summer dress over a turtleneck for fall.
•	Turn oversized shirts into a tied crop top.

5. Timeless Basics are Key
Build your wardrobe around essentials:
•	White shirt, black trousers, a denim jacket, and a little black dress.
•	These staples can be dressed up or down effortlessly.
✨ Tip: Add bold heels or a printed scarf to basics to create a fresh look.

6. Play with Proportions
Balance oversized and fitted pieces:
•	Example: Pair wide-leg pants with a tucked-in crop top or blazer.

7. Capsule Wardrobe Checklist 🧳
•	2 Neutral tops (white, beige)
•	2 Statement tops
•	2 Bottoms (one neutral, one bold)
•	1 Classic blazer
•	1 Pair of jeans
•	1 Little black dress (LBD)
•	2 Pairs of shoes (sneakers + heels)
✨ Tip: Mix and match these pieces for endless outfit possibilities.`
  },
  {
    title: "Sustainable Wardrobe and  Wardrobe Decluttering",
    image: "/feature3.png",
    description: "Eco-friendly fashion choices",
    fullContent: `Simple Steps to Make Your Wardrobe More Sustainable

Sustainable fashion doesn’t mean compromising on style; it’s about making smarter, planet-friendly choices. Here are a few simple tips to get you started:

Shop Your Closet
Before rushing to buy something new, take a look at what you already own. Mix and match items to create new outfit combinations and rediscover forgotten pieces.

Invest in Timeless Pieces
Choose versatile, high-quality clothing that won’t go out of style. Pieces like a classic white shirt, tailored blazer, or well-fitted jeans can be worn for years.

Buy Second-Hand or Thrift
Thrifting is sustainable and fun! Pre-loved clothes reduce waste and give you unique, affordable fashion finds.

Care for Your Clothes
Proper care extends the life of your clothes:

Wash clothes only when necessary.
Use cold water to save energy.
Air dry instead of tumble drying to prevent damage.
Upcycle, Repair, or Donate

Give old clothes a new purpose:

Upcycle: Turn jeans into tote bags, old t-shirts into cleaning cloths.
Repair: Sew up tears or replace buttons.
Donate: Clothes you no longer need can make a difference for someone else.

2. Are You Up for the Challenge?"

Small actions lead to big changes! Join our 30-Day Sustainable Fashion Challenge and transform your wardrobe habits.

Your Daily Tasks:

Day 1–5: Declutter mindfully. Identify clothes you wear regularly and items you haven’t touched in months.
Day 6–10: Plan 5 new outfit combinations using existing clothes.
Day 11–15: Try a week of wearing only thrifted or upcycled items.
Day 16–20: Learn a DIY trick: sew a button, patch up tears, or add a design to an old shirt.
Day 21–25: Sell or donate clothes you no longer wear.
Day 26–30: Share your sustainable wardrobe journey with us!
Get Involved: Post your progress on social media using the hashtag #MyEcoCloset and tag us to get featured!

3.DIY Fashion: Turn Old Clothes into Something New!"

Upcycling is not just eco-friendly; it’s a creative outlet that allows you to add a personal touch to your wardrobe. Here are three fun DIY ideas to try at home:

Upcycled Denim Tote Bag

Use old jeans to create a sturdy tote bag. Cut out the fabric, sew the sides, and add handles. Customize with patches or embroidery for extra flair.
T-Shirt Crop & Tie-Dye

Breathe life into old t-shirts! Cut off the bottom hem for a cropped look, and use natural dyes (like turmeric or coffee) for tie-dye effects.
Visible Mending for Tears

Don’t toss ripped clothes—make them trendy! Use colorful threads or patterned fabric patches to mend tears and create unique designs.
Visual Inspiration: Check out our step-by-step video tutorials [insert link] to help you get started.

4. "Eco-Friendly Brands to Love

Why Shop Sustainably?
By supporting sustainable brands, you:

Reduce waste and pollution.
Support ethical practices and fair wages.
Invest in clothes that last longer and are kinder to the environment.

5.  Why Sustainable Fashion Matters

Fashion is beautiful, but it’s also one of the most polluting industries in the world. Here are some eye-opening facts:

The fashion industry generates 92 million tons of textile waste annually.
Producing one pair of jeans uses 7,500 liters of water—enough for one person to drink for 7 years.
Fast fashion contributes to 10% of global carbon emissions.
Extending the life of clothes by just 9 months reduces their carbon footprint by 30%.

What Can You Do?
Every small step counts! Choose to shop sustainably, care for your clothes, and advocate for change.

6. What’s in Your Clothes? Eco-Friendly Fabrics 101

Understanding fabrics helps you make sustainable choices when shopping:

Organic Cotton: Grown without harmful pesticides, it’s softer and safer for you and the planet.
Hemp: A super-durable, low-water fabric that gets softer with every wash.
Tencel (Lyocell): Made from sustainably sourced wood pulp, it’s breathable and biodegradable.
Recycled Polyester: Created from plastic bottles and other waste materials.
Bamboo Fabric: Fast-growing bamboo makes this a renewable, soft, and moisture-wicking fabric.

Next time you shop, check the labels and choose fabrics that make a difference!`
  },
  {
    title: "Style Guide",
    image: "/feature4.jpg",
    description: "Personal styling advice",
    fullContent: `1. Ask Yourself These 3 Questions:

Do I wear it often?
Does it fit me well?
Does it bring me joy or confidence?

2. Start Small and Categorize:
Begin with accessories, shoes, or out-of-season clothes to build momentum.

3. “Wear or Toss” Challenge:
Place items you’re unsure of at the front of your closet. If you don’t wear them within 2 weeks, say goodbye!

4. Eco-Friendly Decluttering:

Donate: Local charities, thrift stores, and NGOs.
Sell: Use platforms like Poshmark, ThredUp, or Depop.
Recycle: Many brands offer take-back programs for old clothes.

More tips:
✅ Take everything out of your wardrobe and sort items into Keep, Donate, Sell, and Recycle.
✅ Try the “1-Year Rule”: If you haven’t worn it in a year, it’s time to let it go.
✅ Declutter duplicates—keep versatile pieces that pair well.
✅ Prioritize quality over quantity: Keep items that are durable and timeless.
✅ Organize by color and category to make dressing effortless.`
  },
  {
    title: "Color Matching",
    image: "/feature5.png",
    description: "Perfect color combinations",
    fullContent: `See Your Entire Wardrobe in One Place
No more digging through piles of clothes or forgetting about hidden gems in the back of your closet. The Virtual Walk-In Closet gives you a digital view of everything you own—tops, bottoms, dresses, accessories, and shoes—all neatly organized and available at a glance.
How it works:
• Upload pictures of your clothing and accessories.
• The website categorizes and organizes them for easy access.
• Navigate through your virtual wardrobe anytime, anywhere.
With this feature, you can effortlessly plan outfits for any occasion, saving time and eliminating the frustration of “I have nothing to wear!”.

Smart Outfit Recommendations
Your virtual closet doesn’t just store your clothes—it helps you style them too. StyleMate’s intelligent recommendation system creates fresh outfit combinations tailored to your preferences, mood, and body type.
Key benefits:
• Daily Outfit Suggestions: Receive outfit ideas based on your uploaded wardrobe. Whether it’s for work, casual outings, or special occasions, you’ll always know what to wear.
• Seasonal Styling: The app suggests outfits suited for the weather and current trends.
• Mix & Match: Discover new ways to wear the clothes you already own, maximizing their value and versatility.

Discover New Clothes That Match Your Style
One of the standout features of the Virtual Walk-In Closet is its ability to suggest new clothes that seamlessly fit into your existing wardrobe. Using AI and your personal style profile, StyleMate recommends items that:
• Complement your current outfits.
• Match your body type and personal style preferences.
• Fill any gaps in your wardrobe (like missing essentials or statement pieces).
This makes shopping smarter, not harder. Instead of impulse buys that don’t pair well with your existing clothes, StyleMate ensures every purchase adds value to your closet.
• If you have a pair of versatile jeans but lack a matching blazer, the app will suggest stylish options to complete the look.`
  },
  {
    title: "Outfit Planning",
    image: "/feature6.png",
    description: "Plan your looks ahead",
    fullContent: `1. Understand Your Style Preferences
The process begins by analyzing your unique style. When you sign up, StyleMate asks you a few simple questions:
• What’s your fashion style—minimalist, boho-chic, edgy, or classic?
• What colors, prints, and fabrics do you love (or avoid)?
• What is your body type and preferred fits?
By understanding your preferences, StyleMate builds a fashion profile that reflects you.
2. Sync Your Wardrobe
With the Virtual Closet feature, you can upload pictures of the clothes you already own. StyleMate scans your wardrobe and categorizes your pieces—tops, bottoms, dresses, shoes, and accessories. It then uses this information to suggest creative outfit ideas using what you already have.
• Forgot about an old dress? StyleMate brings it back to life with fresh styling suggestions.
• Too many clothes, but nothing to wear? StyleMate sorts and matches items seamlessly.

3. Outfit Suggestions for Every Occasion
Life is full of events, and StyleMate ensures you’re prepared for every moment.
• Workwear: Look polished with tailored outfits for the office that balance style and professionalism.
• Casual Days: Get effortless, comfortable looks perfect for brunches, shopping trips, or coffee dates.
• Special Events: Need something for a wedding, date night, or a formal event? StyleMate has you covered.
• Travel Looks: Save time on packing with curated travel-friendly outfits for every trip.
Simply select the occasion, and StyleMate will provide outfit ideas that fit the moment while staying true to your personal style.
`
  }
]

const heroImages = [
  "/image_virtual.jpg",
  "/image_virtual2.jpg",
  "/image_virtual3.jpg",
  "/image_virtual4.jpg"
];

export default function HomePage() {
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    (<div className="min-h-screen bg-[#F5F5DC]">
      <MenuBar />
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden">
        {heroImages.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Hero image ${index + 1}`}
            width={1920}
            height={1080}
            className={`absolute inset-0 object-cover w-full h-full transition-transform duration-1000 ease-in-out ${
              index === currentImageIndex ? 'translate-x-0' : 'translate-x-full'
            }`}
            priority />
        ))}
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Virtual Wardrobe Assistant
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Simplify Your Wardrobe, Redefine Your Style
          </p>
          <AnimatedButton size="lg" className="text-lg">
            Get Started
          </AnimatedButton>
        </div>
      </section>
      {/* Features Grid Section */}
      <section className="py-24 bg-[#9eb3a6]">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-16">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group hover:scale-105 transition-transform duration-300 backdrop-blur-sm rounded-lg cursor-pointer"
                onClick={() => setSelectedFeature(feature)}>

                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={300}
                    height={200}
                    className="object-cover rounded-lg w-full h-full" />
                </div>

                <div
                  className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-lg text-center mb-4">{feature.description}</p>
                  <AnimatedButton variant="secondary" size="sm">
                    Learn More
                  </AnimatedButton>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Feature Detail Modal */}
      <Dialog open={!!selectedFeature} onOpenChange={() => setSelectedFeature(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden bg-white text-black">
          <DialogHeader>
            <DialogTitle>{selectedFeature?.title}</DialogTitle>
            <DialogDescription>{selectedFeature?.description}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="mt-4 max-h-[calc(80vh-10rem)]">
            <div className="prose prose-sm max-w-none prose-headings:text-[#2F4F4F] prose-p:text-gray-600 prose-li:text-gray-600 px-6">
              {selectedFeature?.fullContent.split('\n').map((paragraph, index) => (
                <React.Fragment key={index}>
                  {paragraph.trim().startsWith('•') ? (
                    <ul className="list-disc ml-4">
                      <li>{paragraph.trim().substring(1)}</li>
                    </ul>
                  ) : paragraph.trim().startsWith('-') ? (
                    <ul className="list-disc ml-4">
                      <li>{paragraph.trim().substring(1)}</li>
                    </ul>
                  ) : paragraph.trim() ? (
                    <p className="mb-4">{paragraph}</p>
                  ) : (
                    <br />
                  )}
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      {/* About Section */}
      <CurtainReveal>
        <section className="py-24 bg-gray-50">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
                <Image
                  src="/aboutus.png"
                  alt="Organized wardrobe"
                  width={1200}
                  height={200}
                  className="object-cover" />
              </div>
              <Card className="p-8 shadow-xl bg-white/90 backdrop-blur-sm">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-3xl font-bold mb-8 text-[#2F4F4F]">About Us</h2>
                  <p className="mb-6 text-gray-700">
                    StyleMate is your ultimate outfit suggestion app, designed to solve the everyday
                    dilemma of "What do I wear?" and the challenge of organizing your closet. We
                    understand how overwhelming it can be to manage a cluttered wardrobe and find
                    the perfect outfit for any occasion.
                  </p>
                  <p className="mb-6 text-gray-700">
                    Our app helps you save time, embrace sustainable fashion, and elevate your
                    style with personalized outfit recommendations tailored to your mood, events,
                    and preferences. From a virtual closet to color coordination tips and wardrobe
                    decluttering advice, StyleMate is here to simplify your fashion choices and
                    help you make the most of your wardrobe.
                  </p>
                  <p className="text-xl font-semibold text-[#2F4F4F]">
                    Join us to redefine your style journey—one outfit at a time!
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </CurtainReveal>
      <Testimonials />
      <BlogSection />
      {/* <WriteBlogSection /> */}
      <Footer />
    </div>)
  );
}

