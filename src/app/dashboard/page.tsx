'use client';

import { useState } from "react";
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Image, Mic, Video, PlusCircle } from "lucide-react";

type Project = {
  title: string;
  desc: string;
  date: string;
};

type SourceOption = {
  icon: React.ElementType;
  title: string;
  desc: string;
};

type Template = {
  title: string;
  desc: string;
};

const projects: Project[] = [
  {
    title: "Blog to Social Media",
    desc: "Convert blog post into Twitter threads, LinkedIn posts and Instagram captions",
    date: "Created 2 days ago"
  },
  {
    title: "Podcast Repurposing",
    desc: "Turn podcast episodes into blog posts, social snippets and quote images",
    date: "Created 1 week ago"
  }
];

const sources: SourceOption[] = [
  { icon: FileText, title: "Text/Blog", desc: "Convert written content into other formats" },
  { icon: Video, title: "Video", desc: "Repurpose video content across platforms" },
  { icon: Mic, title: "Audio/Podcast", desc: "Transform audio into multiple content types" },
  { icon: Image, title: "Images", desc: "Generate content from images and graphics" },
  { icon: Upload, title: "Upload Custom", desc: "Start with a custom content source" }
];

const templates: Template[] = [
  { title: "Blog to Social Bundle", desc: "Blog → Twitter + LinkedIn + Instagram" },
  { title: "Video Content Maximizer", desc: "Video → Shorts + Blog + Social posts" },
  { title: "Podcast Omnipresence", desc: "Podcast → Transcript + Blog + Newsletter" }
];

function ProjectCard({ title, desc, date }: Project) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{desc}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Continue Editing</Button>
      </CardFooter>
    </Card>
  );
}

function SourceCard({ icon: Icon, title, desc }: SourceOption) {
  return (
    <Card className="cursor-pointer hover:border-primary hover:shadow transition-all">
      <CardHeader>
        <Icon className="h-8 w-8 text-primary mb-2" />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function TemplateCard({ title, desc }: Template) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="outline" className="w-full">Use Template</Button>
      </CardFooter>
    </Card>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="px-4 py-8 md:px-20">
      <header className="mb-6">
        <h1 className="text-2xl md:text-4xl font-bold mb-1">GEN–TO–PASTE</h1>
        <p className="text-gray-500 text-sm md:text-base">
          Transform your content across multiple platforms with AI.
        </p>
      </header>

      <Tabs defaultValue="create" onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 flex flex-wrap gap-2">
          <TabsTrigger value="create">Create New</TabsTrigger>
          <TabsTrigger value="projects">My Projects</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
            <h2 className="text-xl font-semibold">Recent Projects</h2>
            <Button className="w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Create New Project</h2>
            <p className="text-gray-500 text-sm">
              Select your source content type to get started
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sources.map((source) => (
              <SourceCard key={source.title} {...source} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Content Templates</h2>
            <p className="text-gray-500 text-sm">
              Pre-defined templates to speed up your workflow
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <TemplateCard key={template.title} {...template} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
