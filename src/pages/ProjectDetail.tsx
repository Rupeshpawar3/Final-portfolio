import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projectsData } from "@/data/projectsData";
import { motion } from "framer-motion";
import ImageSlider from "@/components/ImageSlider";
import GraphicDesignShowcase from "@/components/GraphicDesignShowcase";
import InfiniteCircleViewer from "@/components/InfiniteCircleViewer";
import BouncyCardViewer from "@/components/BouncyCardViewer";
import HumanExeProject from "@/components/HumanExeProject";
import DigitalArtProject from "@/components/DigitalArtProject";
import UiUxProject from "@/components/UiUxProject";
import ThreeDModelingProject from "@/components/ThreeDModelingProject";
import MentalHealthProject from "@/components/MentalHealthProject";

const ProjectDetail = () => {
  const { slug } = useParams();

  const project = slug ? projectsData[slug] : null;

  if (slug === "human.exe---ai-awareness-project" && project) {
    return <HumanExeProject project={project} />;
  }

  if (slug === "digital-art" && project) {
    return <DigitalArtProject project={project} />;
  }

  if (slug === "visual-design" && project) {
    return <UiUxProject project={project} />;
  }

  if (slug === "3d-modeling" && project) {
    return <ThreeDModelingProject project={project} />;
  }

  if (slug === "mental-health-activity" && project) {
    return <MentalHealthProject project={project} />;
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/#work">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/#work"
            state={{ skipIntro: true }}
            className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Project Header */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">{project.title}</span>
            </h1>
            <p className="text-xl text-foreground/70 mb-6">
              {project.description}
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 glass-panel text-sm font-medium border border-primary/30"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-foreground/50">Year: {project.year}</p>
          </motion.div>

          {/* Image Slider / Circular Viewer / Bouncy Cards */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {project.slug === 'digital-art' ? (
              <BouncyCardViewer images={project.gallery} />
            ) : project.driveImageIds ? (
              <InfiniteCircleViewer imageIds={project.driveImageIds} />
            ) : (
              <ImageSlider images={project.gallery} projectTitle={project.title} />
            )}
          </motion.div>

          {/* Embedded PDF Viewer */}
          {project.embedPdf && (
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="glass-panel p-4 md:p-8">
                <h2 className="font-display text-2xl font-bold mb-6">
                  <span className="gradient-text">Document Preview</span>
                </h2>
                <div className="relative w-full overflow-hidden rounded-xl border border-white/10 h-[75vh] min-h-[600px]">
                  <iframe 
                    src={project.embedPdf} 
                    className="absolute -top-[56px] left-0 w-full h-[calc(100%+56px)] border-0"
                    allow="autoplay"
                    title="PDF Document Viewer"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          )}

          {/* YouTube Video Section */}
          {project.youtubeVideoId && (
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <div className="glass-panel p-4 md:p-8">
                <h2 className="font-display text-2xl font-bold mb-6">
                  <span className="gradient-text">Project Video</span>
                </h2>
                <div className="relative w-full overflow-hidden rounded-xl border border-white/10 aspect-video bg-black/20">
                  <iframe 
                    src={`https://www.youtube.com/embed/${project.youtubeVideoId}`}
                    title="YouTube Video Player"
                    className="absolute top-0 left-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </motion.div>
          )}

          {/* Illustration Section for Digital Art */}
          {project.slug === 'digital-art' && (
            <motion.div
              className="mb-12 space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="glass-panel p-6 md:p-12">
                <div className="text-center mb-10">
                  <h2 className="font-display text-4xl font-bold mb-4">
                    <span className="gradient-text">Illustrations & Process</span>
                  </h2>
                  <p className="text-foreground/70 max-w-2xl mx-auto">
                    A deeper look into the developmental process and high-fidelity artwork.
                  </p>
                </div>

                {/* Hero GIF Showcase */}
                <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center bg-black/40 mb-12">
                  <img
                    src="/illustration.gif"
                    alt="Process Animation"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: '75vh' }}
                  />
                </div>

                {/* Masonry Grid for Drive Images */}
                {project.illustrationImageIds && project.illustrationImageIds.length > 0 && (
                  <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    {project.illustrationImageIds.map((id, index) => (
                      <motion.div
                        key={id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                        className="break-inside-avoid relative group rounded-xl overflow-hidden border border-white/10 bg-black/20"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                        <img
                          src={`https://drive.google.com/thumbnail?id=${id}&sz=w1000`}
                          alt={`Illustration artwork ${index + 1}`}
                          className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Graphic Design Specific Additions */}
          {project.slug === 'graphic-design' && (
            <GraphicDesignShowcase />
          )}

          {/* Project Details Section */}
          <motion.div
            className="glass-panel p-8 md:p-12 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="font-display text-3xl font-bold mb-6">
              <span className="gradient-text">Project Details</span>
            </h2>
            <div className="prose prose-invert max-w-none">
              {project.details.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-foreground/70 text-lg leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
