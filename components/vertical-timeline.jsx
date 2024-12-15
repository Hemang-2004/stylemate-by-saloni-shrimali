import { motion } from "framer-motion"

export function VerticalTimeline({
  items,
  onItemClick
}) {
  return (
    (<div className="relative">
      <div
        className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#556B2F]" />
      {items.map((item, index) => (
        <motion.div
          key={index}
          className={`flex items-center mb-8 ${
            index % 2 === 0 ? "flex-row-reverse" : ""
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}>
          <div className="w-1/2 px-4">
            <motion.div
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => onItemClick(item)}>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.content}</p>
            </motion.div>
          </div>
          <div className="w-1/2 flex justify-center">
            <div className="bg-[#556B2F] text-white rounded-full p-2 z-10">
              {item.date}
            </div>
          </div>
        </motion.div>
      ))}
    </div>)
  );
}

