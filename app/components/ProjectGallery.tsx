import Image from "next/image";
import type { ProjectScreenshot } from "../lib/projects";

export default function ProjectGallery({ screenshots }: { screenshots: ProjectScreenshot[] }) {
  return (
    <section className="project-gallery" aria-label="Project screenshots">
      <p className="eyebrow">Development screenshots</p>
      <div className="gallery-grid">
        {screenshots.map((screenshot, index) => (
          <figure key={screenshot.src} className={index === 0 ? "gallery-featured" : undefined}>
            <a className="gallery-image-link" href={screenshot.src} aria-label={`Open full-size screenshot: ${screenshot.title}`}>
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                width={screenshot.width}
                height={screenshot.height}
                sizes={index === 0 ? "(max-width: 700px) 100vw, 1100px" : "(max-width: 700px) 100vw, 550px"}
              />
            </a>
            <figcaption>
              <h3>{screenshot.title}</h3>
              <p>{screenshot.caption}</p>
              <a href={screenshot.src} className="text-action">View full-size image</a>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
