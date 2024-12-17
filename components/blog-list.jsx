'use client'

import { useState } from 'react';
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Search } from 'lucide-react';

// Mock data for blog posts
const mockBlogPosts = [
  {
    id: 1,
    title: "10 Must-Have Items for Your Summer Wardrobe",
    excerpt: "Get ready for summer with these essential fashion pieces that will keep you stylish and comfortable all season long.",
    author: "Shreyas Biradar",
    date: "2024-06-15",
    category: "Fashion",
    tags: ["summer", "wardrobe", "essentials"],
    imageUrl: "summer1.jpg"
  },
  {
    id: 2,
    title: "How to Build a Sustainable Wardrobe",
    excerpt: "Learn how to create a wardrobe that's not only stylish but also environmentally friendly with these sustainable fashion tips.",
    author: "John Smith",
    date: "2023-06-10",
    category: "Sustainability",
    tags: ["sustainable", "eco-friendly", "fashion"],
    imageUrl: "wardrobeblogs.jpg"
  },
  // Add more mock blog posts here
];

export function BlogList() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = mockBlogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="search"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map(post => (
          <Card key={post.id} className="overflow-hidden">
            <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.excerpt}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-2">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.author}`} />
                  <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{post.author}</p>
                  <p className="text-xs text-gray-500">{post.date}</p>
                </div>
              </div>
              <Badge>{post.category}</Badge>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary">#{tag}</Badge>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

