import { SiteHeader } from "@/components/site-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Code2, Users, School } from "lucide-react";

const Info = () => {
  return (
    <>
      <title>Info | Pulse</title>
      <meta name="description" content="Pulse information" />
      <SiteHeader siteName="Info" />

      <div className="flex flex-1 flex-col min-h-screen">
        <div className="@container/main flex flex-1 flex-col items-center gap-10 p-6 md:p-12 text-left max-w-5xl mx-auto w-full">

          <div className="flex flex-col items-center text-center space-y-6 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="h-32 w-32 bg-white md:h-40 md:w-40 relative rounded-full p-4 shadow-xl border border-slate-100 flex items-center justify-center">
              <img
                src="/img/iuh.png"
                alt="IUH Logo"
                className="object-contain w-full h-full"
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Pulse Recommendation
              </h1>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <School className="h-4 w-4" />
                <span className="text-lg font-medium">Industrial University of Ho Chi Minh City</span>
              </div>
            </div>

            <Badge variant="secondary" className="px-6 py-1.5 text-sm font-semibold shadow-sm">
              Capstone Project 2025
            </Badge>
          </div>

          {/* System Info */}
          <Card className="w-full border-none shadow-lg  backdrop-blur-sm overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <Code2 className="h-6 w-6" />
                </div>
                System Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7 text-muted-foreground text-lg">
                Pulse is an advanced recommendation engine built to personalize the e-commerce experience. By leveraging powerful algorithms like <strong>ALS</strong>, <strong>SVD</strong>, and <strong>Hybrid Models</strong>, the system analyzes shopping cart behavior to suggest the most relevant products in real-time, helping users discover what they need faster.
              </p>
            </CardContent>
          </Card>

          <div className="w-full space-y-8">
            <div className="flex items-center justify-center gap-3">
              <div className="h-px bg-slate-200 flex-1" />
              <h2 className="text-3xl font-bold text-center text-slate-300 flex items-center gap-2">
                <Users className="h-8 w-8 text-blue-500" />
                Meet the Authors
              </h2>
              <div className="h-px bg-slate-200 flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-blue-500 overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-5 pb-6">
                  <Avatar className="h-20 w-20 border-4 border-blue-50 shadow-md group-hover:scale-105 transition-transform duration-300">
                    <AvatarImage src="/img/cuong-avatar.png" alt="Nguyễn Đức Cường" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xl font-bold">NC</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <CardTitle className="text-2xl">Nguyễn Đức Cường</CardTitle>
                    <CardDescription className="flex items-center gap-1.5 text-blue-600 font-medium">
                      <GraduationCap className="h-4 w-4" />
                      Student
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="py-6 border-t border-slate-100">
                  <div className="grid gap-3 text-sm font-medium text-slate-300">
                    <p>Backend Architecture</p>
                    <p>AI Model Development</p>
                    <p>Frontend Engineering</p>
                    <p>System Optimization</p>
                  </div>
                </CardContent>
              </Card>

              {/* Author 2 */}
              <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-indigo-500 overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-5 pb-6">
                  <Avatar className="h-20 w-20 border-4 border-indigo-50 shadow-md group-hover:scale-105 transition-transform duration-300">
                    <AvatarImage src="/img/nam-avatar.png" alt="Lê Đình Nam" />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white text-xl font-bold">LN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <CardTitle className="text-2xl">Lê Đình Nam</CardTitle>
                    <CardDescription className="flex items-center gap-1.5 text-indigo-600 font-medium">
                      <GraduationCap className="h-4 w-4" />
                      Student
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="py-6 border-t border-slate-100">
                  <div className="grid gap-3 text-sm font-medium text-slate-300">
                    <p>UI/UX Design</p>
                    <p>Client Integration</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground pt-8 pb-4">
            © 2025 Pulse Project. Developed at Industrial University of Ho Chi Minh City.
          </p>

        </div>
      </div>
    </>
  );
};

export default Info;