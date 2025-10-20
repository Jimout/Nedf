"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)
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
      <div className="min-h-screen bg-gray-50 dark:bg-[#15171a] font-['Montserrat']">
        <div className="w-full p-4 sm:p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
              <Button variant="ghost" size="sm" className="p-2 text-gray-600 dark:text-[#ec1e24] hover:text-gray-800 dark:hover:text-white" onClick={() => router.back()}>
                <ArrowLeftIcon />
              </Button>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#001F4B] dark:text-[#ec1e24] uppercase tracking-wide">Edit Team Member</h1>
            </div>
            <Card className="mb-8 dark:bg-[#1a1d23] dark:border-gray-700">
              <CardContent className="py-12 text-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Team member not found
                </h2>
                <p className="text-gray-600 dark:text-white/80">
                  The requested team member could not be found.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
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
    <div className="min-h-screen bg-gray-50 dark:bg-[#15171a] font-['Montserrat']">
      <div className="w-full p-4 sm:p-6">
        <div className="w-full space-y-6">
          <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <Button variant="ghost" size="sm" className="p-2 text-gray-600 dark:text-[#ec1e24] hover:text-gray-800 dark:hover:text-white" onClick={() => router.back()}>
              <ArrowLeftIcon />
            </Button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#001F4B] dark:text-[#ec1e24] uppercase tracking-wide">Edit Team Member</h1>
          </div>

          <Card className="mb-8 dark:bg-[#1a1d23] dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#001F4B] dark:text-white font-medium">Team Member Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* Avatar / Profile Picture */}
              <div className="flex flex-col items-center space-y-2">
                <label className="cursor-pointer">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-gray-300 dark:border-white/50 bg-gray-100 dark:bg-[#1a1d23] flex items-center justify-center">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Avatar Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 dark:text-white/60 text-3xl">+</span>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-500 dark:text-white/60">Click above to change photo</p>
              </div>

              {/* Name & Position */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 dark:text-white/80">Name <span className="text-[#ec1e24] dark:text-[#ec1e24]">*</span></Label>
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
                  <Label htmlFor="position" className="text-gray-700 dark:text-white/80">Position <span className="text-[#ec1e24] dark:text-[#ec1e24]">*</span></Label>
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
                <Label htmlFor="description" className="text-gray-700 dark:text-white/80">Description (max 85 characters)</Label>
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
                <Label className="text-base font-semibold text-gray-700 dark:text-white/80">Social Media Links</Label>
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
                      <span className="text-gray-600 dark:text-white/80"><Icon className="w-5 h-5" /></span>
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
                  className="bg-[#001F4B] dark:bg-[#ec1e24] hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24]/90 text-white"
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
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmSave}
        type="update"
        title="Update Team Member"
        message={`Are you sure you want to update ${formData.name}'s information?`}
      />
    </div>
  );
}
