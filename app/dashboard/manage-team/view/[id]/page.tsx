"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Edit, Linkedin, Twitter, Github, Globe } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useData } from "@/lib/data-context";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  description: string;
  socialMedia: {
    instagram?: string;
    tiktok?: string;
    behance?: string;
    pinterest?: string;
    linkedin?: string;
    twitter?: string;
  };
  avatar?: string;
}

export default function ViewTeamMemberPage() {
  const params = useParams();
  const memberId = params.id as string;
  const { teamMembers } = useData();
  const member = teamMembers.find((m) => m.id === memberId);

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return <Linkedin className="w-4 h-4" />;
      case "twitter":
        return <Twitter className="w-4 h-4" />;
      case "github":
        return <Github className="w-4 h-4" />;
      case "website":
        return <Globe className="w-4 h-4" />;
      default:
        return <span className="w-4 h-4 text-gray-600 text-xs">{platform[0].toUpperCase()}</span>;
    }
  };

  if (!member) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Team Member Details</h1>
            <Link
              href="/dashboard/manage-team"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>
          </div>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Team member not found</h2>
            <p className="text-gray-600">The requested team member could not be found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/manage-team"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Team Member Details</h1>
        </div>
        <Link href={`/dashboard/manage-team/edit/${member.id}`}>
          <Button className="bg-[#001F4B] hover:bg-[#001F4B]/90">
            <Edit className="w-4 h-4 mr-2" />
            Edit Member
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            {/* Avatar or initials */}
            {member.avatar ? (
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-[#001F4B] rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-xl">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </span>
              </div>
            )}

            <div>
              <CardTitle className="text-2xl">{member.name}</CardTitle>
              <Badge className="mt-2 bg-[#001F4B]">{member.position}</Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {member.description && (
            <div>
              <Label className="text-sm font-medium text-gray-700">Description</Label>
              <p className="text-gray-900 mt-1 leading-relaxed">{member.description}</p>
            </div>
          )}

          {member.socialMedia && Object.keys(member.socialMedia).length > 0 && (
            <div>
              <Label className="text-sm font-medium text-gray-700">Social Media</Label>
              <div className="flex flex-wrap gap-3 mt-3">
                {Object.entries(member.socialMedia).map(
                  ([platform, url]) =>
                    url && (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        {getSocialIcon(platform)}
                        <span className="text-sm font-medium capitalize">{platform}</span>
                      </a>
                    ),
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
