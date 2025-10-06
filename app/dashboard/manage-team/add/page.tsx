"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useData } from "@/lib/data-context";
import ConfirmationModal from "@/components/Confirmation-modal";

import { 
  FaInstagram, 
  FaTiktok, 
  FaBehance, 
  FaPinterest, 
  FaLinkedin, 
  FaTwitter 
} from "react-icons/fa";

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

export default function AddTeamMemberPage() {
  const router = useRouter();
  const { addTeamMember } = useData();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [newMember, setNewMember] = useState<Partial<TeamMember>>({
    name: "",
    position: "",
    description: "",
    socialMedia: {},
    avatar: "",
  });

  const socialPlatforms: Record<string, React.ReactNode> = {
    instagram: <FaInstagram className="w-4 h-4" />,
    tiktok: <FaTiktok className="w-4 h-4" />,
    behance: <FaBehance className="w-4 h-4" />,
    pinterest: <FaPinterest className="w-4 h-4" />,
    linkedin: <FaLinkedin className="w-4 h-4" />,
    twitter: <FaTwitter className="w-4 h-4" />,
  };

  // Handle avatar upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewMember({ ...newMember, avatar: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleAddMember = () => {
    if (newMember.name && newMember.position && newMember.description) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmAdd = () => {
    const memberToAdd: TeamMember = {
      id: Date.now().toString(),
      name: newMember.name!,
      position: newMember.position!,
      description: newMember.description!.slice(0, 85), // max 85 chars
      socialMedia: newMember.socialMedia || {},
      avatar: newMember.avatar,
    };
    addTeamMember(memberToAdd);
    setShowConfirmation(false);
    router.push("/dashboard/manage-team");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/manage-team">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Team
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add Team Member</h1>
          <p className="text-gray-600 mt-2">Add a new member to your team</p>
        </div>
      </div>

      {/* Card */}
      <Card>
        <CardHeader>
          <CardTitle>Team Member Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Avatar */}
          <div className="flex flex-col items-center space-y-2">
            <Label>Profile Photo</Label>
            <label className="cursor-pointer">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-gray-300 bg-gray-100 flex items-center justify-center">
                {newMember.avatar ? (
                  <img src={newMember.avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-3xl">+</span>
                )}
              </div>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            <p className="text-sm text-gray-500">Click above to upload photo</p>
          </div>

          {/* Name & Position */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={newMember.name || ""}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                placeholder="Enter full name"
              />
            </div>
            <div>
              <Label htmlFor="position">Position *</Label>
              <Input
                id="position"
                value={newMember.position || ""}
                onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
                placeholder="Enter job position"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={newMember.description || ""}
              onChange={(e) =>
                setNewMember({ ...newMember, description: e.target.value.slice(0, 85) })
              }
              placeholder="Brief description (max 85 chars)"
              rows={3}
            />
            <p className="text-sm text-gray-500">{newMember.description?.length || 0}/85 characters</p>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Social Media Links</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(socialPlatforms).map((platform) => (
                <div key={platform} className="flex items-center gap-2">
                  {socialPlatforms[platform]}
                  <Input
                    placeholder={`${platform} profile URL`}
                    value={newMember.socialMedia?.[platform as keyof typeof newMember.socialMedia] || ""}
                    onChange={(e) =>
                      setNewMember({
                        ...newMember,
                        socialMedia: {
                          ...newMember.socialMedia,
                          [platform]: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Link href="/dashboard/manage-team">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button onClick={handleAddMember} className="bg-[#001F4B] hover:bg-[#001F4B]/90">
              Add Member
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmAdd}
        title="Add Team Member"
        message={`Are you sure you want to add ${newMember.name} to the team?`}
        type="add"
      />
    </div>
  );
}
