"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useData } from "@/lib/data-context";
import ConfirmationModal from "@/components/Confirmation-modal";
import { FaInstagram, FaTiktok, FaBehance, FaPinterest, FaLinkedin, FaTwitter } from "react-icons/fa";

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
  avatar?: string | File;
}

export default function EditTeamMemberPage() {
  const params = useParams();
  const router = useRouter();
  const memberId = params.id as string;
  const { teamMembers, updateTeamMember } = useData();
  const memberData = teamMembers.find((m) => m.id === memberId);

  const [formData, setFormData] = useState<TeamMember>({
    id: memberId,
    name: "",
    position: "",
    description: "",
    socialMedia: {},
    avatar: "",
  });

  const [preview, setPreview] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (memberData) {
      setFormData({ ...memberData });
      setPreview((memberData.avatar as string) || "");
    }
  }, [memberData]);

  if (!memberData) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/manage-team"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Team Member</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Team member not found
            </h2>
            <p className="text-gray-600">
              The requested team member could not be found.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveMember = () => {
    if (formData.name && formData.position) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmSave = () => {
    let avatarUrl = formData.avatar as string;
    if (formData.avatar instanceof File) {
      avatarUrl = URL.createObjectURL(formData.avatar);
    }

    updateTeamMember(memberId, { ...formData, avatar: avatarUrl });
    setShowConfirmation(false);
    router.push(`/dashboard/manage-team/view/${memberId}`);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href={`/dashboard/manage-team/view/${memberId}`}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Team Member</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Team Member Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* Avatar / Profile Picture */}
              <div className="flex flex-col items-center space-y-2">
                <Label>Profile Photo</Label>
                <label className="cursor-pointer">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-gray-300 bg-gray-100 flex items-center justify-center">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Avatar Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-3xl">+</span>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-500">Click above to change photo</p>
              </div>

              {/* Name & Position */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position *</Label>
                  <Input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="Enter job position"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description (max 85 characters)</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value.slice(0, 85) })
                  }
                  placeholder="Brief description about the team member"
                  rows={4}
                />
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Social Media Links</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { platform: "instagram", Icon: FaInstagram },
                    { platform: "tiktok", Icon: FaTiktok },
                    { platform: "behance", Icon: FaBehance },
                    { platform: "pinterest", Icon: FaPinterest },
                    { platform: "linkedin", Icon: FaLinkedin },
                    { platform: "twitter", Icon: FaTwitter },
                  ].map(({ platform, Icon }) => (
                    <div key={platform} className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-gray-600" />
                      <Input
                        id={platform}
                        name={platform}
                        value={formData.socialMedia?.[platform as keyof typeof formData.socialMedia] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            socialMedia: { ...formData.socialMedia, [platform]: e.target.value },
                          })
                        }
                        placeholder={`${platform} profile URL`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <Button
                  type="button"
                  onClick={handleSaveMember}
                  className="bg-[#001F4B] hover:bg-[#001F4B]/90"
                >
                  Save Changes
                </Button>
                <Link href={`/dashboard/manage-team/view/${memberId}`}>
                  <Button variant="outline">Cancel</Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmSave}
        type="update"
        title="Update Team Member"
        message={`Are you sure you want to update ${formData.name}'s information?`}
      />
    </>
  );
}
