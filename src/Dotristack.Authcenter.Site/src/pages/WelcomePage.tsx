import React from "react";
import { LogOut, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

interface WelcomePageProps {
  orgName?: string;
  userName?: string;
  userEmail?: string;
  userRole?: string;
}

const WelcomePage: React.FC<WelcomePageProps> = ({
  orgName = "DoTriStack",
  userName = "Loki",
  userEmail = "Dativerse@gmail.com",
  userRole = "User",
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Minimal Header */}
      <header className="border-b py-4">
        <div className="container flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-medium">{orgName}</h1>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{userName}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="px-2 py-1.5">
                <p className="text-xs font-medium">{userEmail}</p>
                <p className="text-xs text-muted-foreground">{userRole}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-8 px-4 max-w-2xl mx-auto">
        <h2 className="text-xl font-medium mb-6">Welcome, {userName}</h2>

        <p className="text-sm text-muted-foreground mb-8">
          You're signed in with SSO. Access your applications below.
        </p>

        <div className="space-y-3">
          {/* App 1 */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <button className="w-full text-left px-4 py-3 hover:bg-accent/50 transition-colors flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Document Portal</h3>
                  <p className="text-xs text-muted-foreground">
                    Access company documents
                  </p>
                </div>
                <svg
                  className="h-5 w-5 text-muted-foreground"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </CardContent>
          </Card>

          {/* App 2 */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <button className="w-full text-left px-4 py-3 hover:bg-accent/50 transition-colors flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Analytics</h3>
                  <p className="text-xs text-muted-foreground">
                    View reports and metrics
                  </p>
                </div>
                <svg
                  className="h-5 w-5 text-muted-foreground"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </CardContent>
          </Card>

          {/* App 3 */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <button className="w-full text-left px-4 py-3 hover:bg-accent/50 transition-colors flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Calendar</h3>
                  <p className="text-xs text-muted-foreground">
                    Manage appointments
                  </p>
                </div>
                <svg
                  className="h-5 w-5 text-muted-foreground"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            Last login: {new Date().toLocaleDateString()}
          </p>
          <Button variant="outline" size="sm">
            Help
          </Button>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-4 px-4">
        <div className="container max-w-2xl mx-auto">
          <p className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} {orgName}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
