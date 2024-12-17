'use client'

import { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { ImagePlus, Tag } from 'lucide-react';

export function WriteBlogSection() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [isDraft, setIsDraft] = useState(false);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the blog post data to your backend
    console.log({ title, content, category, tags, isDraft, featuredImage });
    // Reset form after submission
    setTitle('');
    setContent('');
    setCategory('');
    setTags('');
    setIsDraft(false);
    setFeaturedImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
  type="text"
  id="title"
  value={title}
  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
  placeholder="Enter your blog title"
  required
/>

      </div>

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
          placeholder="Write your blog content here..."
          required
          className="min-h-[200px]"
        />
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fashion">Fashion</SelectItem>
            <SelectItem value="style-tips">Style Tips</SelectItem>
            <SelectItem value="trends">Trends</SelectItem>
            <SelectItem value="sustainability">Sustainability</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="tags">Tags</Label>
        <div className="flex items-center space-x-2">
          <Tag className="text-[#4A7A6F]" />
          <Input
            type="text"
            id="tags"
            value={tags}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTags(e.target.value)}
            placeholder="Enter tags separated by commas"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="featuredImage">Featured Image</Label>
        <div className="mt-1 flex items-center space-x-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => document.getElementById('featuredImage')?.click()}
          >
            <ImagePlus className="mr-2 h-4 w-4" /> Upload Image
          </Button>
          <Input
            type="file"
            id="featuredImage"
            accept="image/*"
            className="hidden"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFeaturedImage(e.target.files?.[0] || null)}
          />
          {featuredImage && <span className="text-sm text-[#4A7A6F]">{featuredImage.name}</span>}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="draft"
          checked={isDraft}
          onCheckedChange={setIsDraft}
        />
        <Label htmlFor="draft">Save as draft</Label>
      </div>

      <Button type="submit" className="w-full bg-[#4A7A6F] hover:bg-[#2F4F4F]">
        {isDraft ? 'Save Draft' : 'Publish Blog'}
      </Button>
    </form>
  );
}

