'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; // Updated from 'next/router'
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Upload, FileText, Image, Mic, Video, PlusCircle,
  Clock, Star, ChevronRight, Search, Settings,
  BarChart, Zap, Bookmark, TrendingUp, Share2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

// Types
type Project = {
  id: string;
  title: string;
  desc: string;
  date: string;
  progress: number;
  category: string;
  starred?: boolean;
};

type SourceOption = {
  id: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  route: string;
  popular?: boolean;
};

type Template = {
  id: string;
  title: string;
  desc: string;
  category: string;
  usageCount: number;
};

type DashboardStats = {
  totalProjects: number;
  completedProjects: number;
  savedTime: string;
  contentPieces: number;
};

// Sample data
const projects: Project[] = [
  {
    id: "proj-1",
    title: "Blog to Social Media",
    desc: "Convert blog post into Twitter threads, LinkedIn posts and Instagram captions",
    date: "Created 2 days ago",
    progress: 65,
    category: "Social Media",
    starred: true
  },
  {
    id: "proj-2",
    title: "Podcast Repurposing",
    desc: "Turn podcast episodes into blog posts, social snippets and quote images",
    date: "Created 1 week ago",
    progress: 90,
    category: "Content Marketing"
  },
  {
    id: "proj-3",
    title: "Newsletter Series",
    desc: "Weekly newsletter from blog content with custom illustrations",
    date: "Created 3 days ago",
    progress: 30,
    category: "Email Marketing"
  },
  {
    id: "proj-4",
    title: "YouTube Script",
    desc: "Converting research paper into engaging video script with timestamps",
    date: "Created yesterday",
    progress: 15,
    category: "Video Content"
  }
];

const sources: SourceOption[] = [
  {
    id: "source-1",
    icon: FileText,
    title: "Text/Blog",
    desc: "Convert written content into other formats",
    route: "/create/text",
    popular: true
  },
  {
    id: "source-2",
    icon: Video,
    title: "Video",
    desc: "Repurpose video content across platforms",
    route: "/create/video"
  },
  {
    id: "source-3",
    icon: Mic,
    title: "Audio/Podcast",
    desc: "Transform audio into multiple content types",
    route: "/create/audio",
    popular: true
  },
  {
    id: "source-4",
    icon: Image,
    title: "Images",
    desc: "Generate content from images and graphics",
    route: "/create/image"
  },
  {
    id: "source-5",
    icon: Upload,
    title: "Upload Custom",
    desc: "Start with a custom content source",
    route: "/create/custom"
  },
  {
    id: "source-6",
    icon: BarChart,
    title: "Data/Analytics",
    desc: "Convert data insights into visual content",
    route: "/create/data"
  }
];

const templates: Template[] = [
  {
    id: "temp-1",
    title: "Blog to Social Bundle",
    desc: "Blog → Twitter + LinkedIn + Instagram",
    category: "Social Media",
    usageCount: 2457
  },
  {
    id: "temp-2",
    title: "Video Content Maximizer",
    desc: "Video → Shorts + Blog + Social posts",
    category: "Video Marketing",
    usageCount: 1893
  },
  {
    id: "temp-3",
    title: "Podcast Omnipresence",
    desc: "Podcast → Transcript + Blog + Newsletter",
    category: "Podcast Marketing",
    usageCount: 1582
  },
  {
    id: "temp-4",
    title: "Lead Magnet Creator",
    desc: "Blog posts → Downloadable PDF guide",
    category: "Lead Generation",
    usageCount: 985
  },
  {
    id: "temp-5",
    title: "Weekly Newsletter",
    desc: "Content curation → Engaging newsletter",
    category: "Email Marketing",
    usageCount: 1203
  }
];

const dashboardStats: DashboardStats = {
  totalProjects: 27,
  completedProjects: 18,
  savedTime: "47 hours",
  contentPieces: 134
};

// Reusable animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Components
function StatsCard() {
  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-500">Total Projects</p>
          <h3 className="text-3xl font-bold">{dashboardStats.totalProjects}</h3>
          <div className="mt-2 flex items-center text-xs text-green-600">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>+4 this month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-white border-green-100">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-500">Completed</p>
          <h3 className="text-3xl font-bold">{dashboardStats.completedProjects}</h3>
          <div className="mt-2 flex items-center text-xs text-green-600">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>67% completion rate</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-500">Time Saved</p>
          <h3 className="text-3xl font-bold">{dashboardStats.savedTime}</h3>
          <div className="mt-2 flex items-center text-xs text-green-600">
            <Clock className="h-3 w-3 mr-1" />
            <span>+7 hours this week</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-500">Content Pieces</p>
          <h3 className="text-3xl font-bold">{dashboardStats.contentPieces}</h3>
          <div className="mt-2 flex items-center text-xs text-green-600">
            <Share2 className="h-3 w-3 mr-1" />
            <span>Across 8 platforms</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ProjectCard({ id, title, desc, date, progress, category, starred = false }: Project) {
  const [isStarred, setIsStarred] = useState(starred);

  return (
    <motion.div variants={fadeInUp}>
      <Card className="h-full border-l-4 hover:shadow-md transition-all duration-300"
        style={{ borderLeftColor: category === "Social Media" ? "#3b82f6" :
                                 category === "Content Marketing" ? "#10b981" :
                                 category === "Email Marketing" ? "#8b5cf6" : "#f59e0b" }}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <Badge variant="outline" className="mb-2">
                {category}
              </Badge>
              <CardTitle className="text-lg">{title}</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsStarred(!isStarred)}
              className="h-8 w-8"
            >
              <Star className={`h-5 w-5 ${isStarred ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
            </Button>
          </div>
          <CardDescription className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {date}
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-2">
          <p className="text-sm text-gray-600 mb-3">{desc}</p>
          <div className="flex items-center justify-between text-xs mb-1">
            <span>Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </CardContent>

        <CardFooter className="pt-2">
          <Button variant="default" className="w-full">
            Continue Editing
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function SourceCard({ icon: Icon, title, desc, route, popular = false }: SourceOption) {
  const router = useRouter();

  return (
    <motion.div variants={fadeInUp}>
      <Card
        onClick={() => router.push(route)}
        className="cursor-pointer hover:border-primary hover:shadow-md transition-all duration-300 h-full relative overflow-hidden group"
      >
        {popular && (
          <div className="absolute top-0 right-0">
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 rounded-tl-none rounded-br-none">
              Popular
            </Badge>
          </div>
        )}

        <CardHeader className="pb-2">
          <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </CardHeader>

        <CardFooter className="pt-0">
          <Button variant="ghost" className="p-0 h-auto text-primary group-hover:underline">
            Get Started <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function TemplateCard({ id, title, desc, category, usageCount }: Template) {
  const [saved, setSaved] = useState(false);

  return (
    <motion.div variants={fadeInUp}>
      <Card className="h-full hover:shadow-md transition-all duration-300">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <Badge variant="outline" className="mb-2">
                {category}
              </Badge>
              <CardTitle className="text-lg">{title}</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSaved(!saved)}
              className="h-8 w-8"
            >
              <Bookmark className={`h-5 w-5 ${saved ? "fill-primary text-primary" : "text-gray-300"}`} />
            </Button>
          </div>
          <CardDescription className="flex items-center text-xs">
            <Zap className="h-3 w-3 mr-1" />
            Used by {usageCount.toLocaleString()} creators
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-2">
          <p className="text-sm text-gray-600">{desc}</p>
        </CardContent>

        <CardFooter className="pt-2 flex gap-2">
          <Button variant="default" className="w-full">
            Use Template
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("create");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [filteredTemplates, setFilteredTemplates] = useState(templates);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Filter projects when search term changes
  useEffect(() => {
    if (searchTerm) {
      setFilteredProjects(projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category.toLowerCase().includes(searchTerm.toLowerCase())
      ));

      setFilteredTemplates(templates.filter(template =>
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.category.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredProjects(projects);
      setFilteredTemplates(templates);
    }
  }, [searchTerm]);

  // Handle tab change with analytics tracking
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Analytics tracking would go here in a real app
    console.log(`Tab changed to: ${value}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            GEN–TO–PASTE
          </h1>
          <p className="text-gray-500">
            Transform your content across multiple platforms with AI.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9 w-64"
              placeholder="Search projects & templates"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>API Integrations</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Avatar>
            <AvatarImage src="/avatar-placeholder.jpg" alt="User Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Mobile search - visible only on small screens */}
      <div className="md:hidden mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          className="pl-9"
          placeholder="Search projects & templates"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Stats Section */}
      {activeTab === "projects" && <StatsCard />}

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-6 flex gap-1">
          <TabsTrigger value="create">Create New</TabsTrigger>
          <TabsTrigger value="projects">My Projects</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6 animate-in fade-in-50 duration-300">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-2">
            <div>
              <h2 className="text-xl font-semibold flex items-center">
                My Projects
                <Badge variant="secondary" className="ml-2">
                  {filteredProjects.length}
                </Badge>
              </h2>
              {searchTerm && (
                <p className="text-sm text-gray-500">
                  Showing results for "{searchTerm}"
                </p>
              )}
            </div>
            <Button className="w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium">No projects found</h3>
              <p className="text-gray-500 mb-4">
                We couldn't find any projects matching your search.
              </p>
              <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="create" className="space-y-6 animate-in fade-in-50 duration-300">
          <div>
            <h2 className="text-xl font-semibold">Create New Project</h2>
            <p className="text-gray-500 text-sm">
              Select your source content type to get started
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {sources.map((source) => (
              <SourceCard key={source.id} {...source} />
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6 animate-in fade-in-50 duration-300">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-2">
            <div>
              <h2 className="text-xl font-semibold flex items-center">
                Content Templates
                <Badge variant="secondary" className="ml-2">
                  {filteredTemplates.length}
                </Badge>
              </h2>
              {searchTerm && (
                <p className="text-sm text-gray-500">
                  Showing results for "{searchTerm}"
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <select className="px-3 py-2 border rounded-md text-sm">
                <option>All Categories</option>
                <option>Social Media</option>
                <option>Video Marketing</option>
                <option>Email Marketing</option>
                <option>Lead Generation</option>
              </select>
              <select className="px-3 py-2 border rounded-md text-sm">
                <option>Most Popular</option>
                <option>Newest</option>
                <option>Recommended</option>
              </select>
            </div>
          </div>

          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium">No templates found</h3>
              <p className="text-gray-500 mb-4">
                We couldn't find any templates matching your search.
              </p>
              <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {filteredTemplates.map((template) => (
                <TemplateCard key={template.id} {...template} />
              ))}
            </motion.div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}