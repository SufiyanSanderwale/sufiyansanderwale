import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted">The page you're looking for doesn't exist.</p>
        <div className="mt-6">
          <Link to="/" className="btn-primary btn-primary-hover">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted">Something went wrong. Try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary btn-primary-hover"
          >
            Try again
          </button>
          <a href="/" className="btn-ghost btn-ghost-hover">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: "Sufiyan Sanderwale | Java & Software Engineer | India",
      },
      {
        name: "description",
        content:
          "Explore the portfolio of Sufiyan Sanderwale, a Java Developer & Software Engineer. Discover key projects, technical skills, and professional certifications.",
      },
      {
        name: "keywords",
        content:
          "Java Developer, Software Engineer, Portfolio, India, Sufiyan Sanderwale, Full Stack Developer, Spring Boot, React, SQL, Belagavi",
      },
      { name: "author", content: "Sufiyan Sanderwale" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#050505" },
      {
        property: "og:title",
        content: "Sufiyan Sanderwale | Java & Software Engineer | India",
      },
      {
        property: "og:description",
        content:
          "Explore the portfolio of Sufiyan Sanderwale, a Java Developer & Software Engineer. Discover key projects, technical skills, and professional certifications.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sufiyansanderwale.vercel.app/" },
      { property: "og:image", content: "https://sufiyansanderwale.vercel.app/hero-sufiyan.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:site_name", content: "Sufiyan Sanderwale Portfolio" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: "https://sufiyansanderwale.vercel.app/" },
      {
        name: "twitter:title",
        content: "Sufiyan Sanderwale | Java & Software Engineer | India",
      },
      {
        name: "twitter:description",
        content:
          "Explore the portfolio of Sufiyan Sanderwale, a Java Developer & Software Engineer. Discover key projects, technical skills, and professional certifications.",
      },
      { name: "twitter:image", content: "https://sufiyansanderwale.vercel.app/hero-sufiyan.png" },
      { name: "twitter:creator", content: "@MyselfSufiyan" },
      { name: "twitter:site", content: "@MyselfSufiyan" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      {
        rel: "canonical",
        href: "https://sufiyansanderwale.vercel.app/",
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  // Structured Data (JSON-LD Schemas)
  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Sufiyan Sanderwale",
      jobTitle: "Software Developer",
      url: "https://sufiyansanderwale.vercel.app/",
      image: "https://sufiyansanderwale.vercel.app/hero-sufiyan.png",
      description:
        "Portfolio of Sufiyan Sanderwale, a Java Developer & Software Engineer based in India.",
      knowsAbout: [
        "Java",
        "Spring Boot",
        "Software Engineering",
        "SQL",
        "Web Development",
        "React",
        "TypeScript",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Belagavi",
        addressRegion: "Karnataka",
        addressCountry: "India",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Maratha Mandal Engineering College, Belagavi",
      },
      sameAs: [
        "https://github.com/SufiyanSanderwale",
        "https://www.linkedin.com/in/sufiyan-sanderwale",
        "https://x.com/MyselfSufiyan",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Sufiyan Sanderwale Portfolio",
      url: "https://sufiyansanderwale.vercel.app/",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://sufiyansanderwale.vercel.app/",
        },
      ],
    },
  ];

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
