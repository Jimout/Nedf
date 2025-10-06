"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

export interface TeamMember {
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
    github?: string;
    website?: string;
  };
  avatar?: string; // only store URL, not the actual File object
  email?: string;
}

export interface Review {
  id: string;
  name: string;
  position: string;
  profilePicture?: string;
  testimonial: string;
}

interface DataContextType {
  teamMembers: TeamMember[];
  reviews: Review[];
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (id: string, member: TeamMember) => void;
  deleteTeamMember: (id: string) => void;
  addReview: (review: Review) => void;
  updateReview: (id: string, review: Review) => void;
  deleteReview: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Smith",
    position: "Senior Developer",
    description:
      "Experienced full-stack developer with expertise in React, Node.js, and cloud technologies. Passionate about creating scalable solutions.",
    socialMedia: {
      linkedin: "https://linkedin.com/in/johnsmith",
      github: "https://github.com/johnsmith",
      website: "https://johnsmith.dev",
    },
    email: "johnsmith@example.com",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    position: "UI/UX Designer",
    description:
      "Creative designer focused on user-centered design principles. Specializes in creating intuitive and beautiful digital experiences.",
    socialMedia: {
      linkedin: "https://linkedin.com/in/sarahjohnson",
      twitter: "https://twitter.com/sarahdesigns",
    },
    email: "sarahjohnson@example.com",
  },
];

const initialReviews: Review[] = [
  {
    id: "1",
    name: "Emily Chen",
    position: "Marketing Director",
    testimonial:
      "Working with this team has been an absolute game-changer for our business. Their innovative approach and attention to detail exceeded all our expectations.",
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    position: "CEO",
    testimonial:
      "The professionalism and expertise demonstrated throughout our project was outstanding. I highly recommend their services to anyone looking for quality results.",
  },
  {
    id: "3",
    name: "Sarah Thompson",
    position: "Product Manager",
    testimonial:
      "From start to finish, the communication was excellent and the deliverables were top-notch. They truly understand what it takes to deliver exceptional work.",
  },
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedTeamMembers = localStorage.getItem("teamMembers");
      const savedReviews = localStorage.getItem("reviews");

      if (savedTeamMembers) {
        setTeamMembers(JSON.parse(savedTeamMembers));
      } else {
        setTeamMembers(initialTeamMembers);
      }

      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      } else {
        setReviews(initialReviews);
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      setTeamMembers(initialTeamMembers);
      setReviews(initialReviews);
    }
  }, []);

  // Save teamMembers safely (no File objects)
  useEffect(() => {
    if (teamMembers.length > 0) {
      try {
        const safeData = teamMembers.map(({ avatar, ...rest }) => ({
          ...rest,
          avatar: typeof avatar === "string" ? avatar : "",
        }));
        localStorage.setItem("teamMembers", JSON.stringify(safeData));
      } catch (error) {
        console.error("Error saving teamMembers:", error);
      }
    }
  }, [teamMembers]);

  // Save reviews safely
  useEffect(() => {
    if (reviews.length > 0) {
      try {
        localStorage.setItem("reviews", JSON.stringify(reviews));
      } catch (error) {
        console.error("Error saving reviews:", error);
      }
    }
  }, [reviews]);

  const addTeamMember = (member: TeamMember) => {
    setTeamMembers((prev) => [...prev, member]);
  };

  const updateTeamMember = (id: string, updatedMember: TeamMember) => {
    setTeamMembers((prev) =>
      prev.map((member) => (member.id === id ? updatedMember : member))
    );
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const addReview = (review: Review) => {
    setReviews((prev) => [...prev, review]);
  };

  const updateReview = (id: string, updatedReview: Review) => {
    setReviews((prev) =>
      prev.map((review) => (review.id === id ? updatedReview : review))
    );
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((review) => review.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        teamMembers,
        reviews,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addReview,
        updateReview,
        deleteReview,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
