import Image from 'next/image'

export function FoundersMessage() {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <Image
            className="h-full w-full object-cover md:w-48"
            src="/founder.jpg"
            alt="Founder's Image"
            width={192}
            height={192}
          />
        </div>
        <div className="p-8">
          <h2 className="text-3xl font-bold text-[#4A7A6F] mb-4">Founder's Message</h2>
          <div className="space-y-4 text-[#2F4F4F]">
            <p className="text-lg leading-relaxed">
              <strong className="text-[#4A7A6F]">StyleMate</strong> was created to solve the everyday frustration of <em className="font-semibold">"What do I wear?"</em> by addressing time waste, stress, and unused clothes in cluttered wardrobes. It tackles the challenge of finding perfect outfits while balancing busy schedules and highlights the environmental impact of fashion, the second-largest polluting industry globally.
            </p>
            
            <p className="text-lg leading-relaxed">
              By encouraging users to <strong className="text-[#4A7A6F]">reuse and restyle existing clothes</strong> through a virtual closet, StyleMate offers personalized outfit suggestions tailored to mood and events. It also provides <em className="font-semibold">smart decluttering tips</em>, combining technology with conscious fashion choices to help users save time, feel confident, and reduce their environmental footprint.
            </p>

            <p className="text-lg leading-relaxed">
              Ultimately, StyleMate makes everyday dressing effortless and sustainable.
            </p>
          </div>
          <div className="mt-6 flex items-center">
            <Image
              className="h-12 w-12 rounded-full object-cover mr-4"
              src="/founder.jpg"
              alt="Saloni Shrimali"
              width={48}
              height={48}
            />
            <div>
              <p className="text-lg font-semibold text-[#4A7A6F]">Saloni Shrimali</p>
              <p className="text-sm text-gray-600">Founder, StyleMate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

