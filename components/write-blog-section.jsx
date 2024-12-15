'use client'

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, ImageIcon } from 'lucide-react'
import { motion } from "framer-motion"

const fonts = [
  "Arial", "Helvetica", "Times New Roman", "Courier New", "Verdana", "Georgia", "Palatino",
  "Garamond", "Bookman", "Comic Sans MS", "Trebuchet MS", "Arial Black", "Impact"
]

export function WriteBlogSection() {
  const [font, setFont] = useState(fonts[0])

  return (
    (<section className="py-24 bg-[#F5F5DC] flex items-center justify-center mx-auto">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-16 text-[#2F4F4F]">Write Your Own Blog</h2>
        <div className="bg-white rounded-lg shadow-xl p-8">
          <Input className="text-2xl font-bold mb-4" placeholder="Enter your blog title" />
          <div className="flex flex-wrap gap-2 mb-4">
            <Select value={font} onValueChange={setFont}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                {fonts.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Underline className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <AlignRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ImageIcon className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            className="min-h-[300px] mb-4"
            placeholder="Write your blog content here..."
            style={{ fontFamily: font }} />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="w-full">Publish Blog</Button>
          </motion.div>
        </div>
      </div>
    </section>)
  );
}

