import type { CmsPortfolioProject } from "@/lib/cms/types"
import type { PortfolioProject } from "@/lib/landing-portfolio-projects"

export function cmsProjectToDetail(project: CmsPortfolioProject): PortfolioProject {
  return {
    id: project.id,
    title: project.title,
    year: project.year,
    client: project.client,
    location: project.location,
    area: project.area,
    topology: project.topology,
    role: project.role,
    status: project.status,
    inspiration: project.inspiration,
    description: project.description,
    features: project.features,
    materials: project.materials,
    colorPalette: project.colorPalette,
    beforeAfterImages: [project.beforeImage, project.afterImage],
    galleryImages: project.galleryImages,
    galleryAlts: project.galleryImages.map((_, index) => `${project.title} ${index + 1}`),
  }
}

export function cmsProjectToSeo(project: CmsPortfolioProject) {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.beforeImage || project.galleryImages[0] || "/room1.jpg",
  }
}
