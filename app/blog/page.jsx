'use client'

import { useState } from 'react';
import { MenuBar } from '../../components/MenuBar';
import { WriteBlogSection } from '../../components/write-blog-section';
import { BlogList } from '../../components/blog-list';
import { Button } from "../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState('read');

  return (
    <div className="min-h-screen bg-[#E6EFE9]">
      <MenuBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
        <h1 className="text-4xl font-bold text-[#2F4F4F] mb-8 text-center">Welcome To The StyleMate's Blog Section</h1>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="read">Read Blogs</TabsTrigger>
            <TabsTrigger value="write">Write a Blog</TabsTrigger>
          </TabsList>
          <TabsContent value="read">
            <BlogList />
          </TabsContent>
          <TabsContent value="write">
            <WriteBlogSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

