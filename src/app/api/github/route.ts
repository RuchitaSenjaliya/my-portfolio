import { NextResponse } from "next/server";

interface GithubContributionNode {
  date: string;
  count: number;
  level: number;
}

export async function GET() {
  const username = process.env.GITHUB_USERNAME || "RuchitaSenjaliya";
  const token = process.env.GITHUB_PAT;

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers["Authorization"] = `token ${token}`;
  }

  try {
    // 1. Fetch general user profile data
    const profileRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
    });
    const profileData = profileRes.ok
      ? await profileRes.json()
      : { public_repos: 18, followers: 10 };

    // 2. Fetch public repository lists
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&type=owner`,
      {
        headers,
        next: { revalidate: 3600 },
      },
    );
    const reposData = reposRes.ok ? await reposRes.json() : [];

    // 3. Fetch contributions from public API
    const contribRes = await fetch(
      `https://github-contributions-api.jogruber.de/v4/RuchitaSenjaliya`,
      {
        next: { revalidate: 3600 },
      },
    );

    let contributions: GithubContributionNode[] = [];
    let totalCommits = 257;

    if (contribRes.ok) {
      const contribData = await contribRes.json();
      if (contribData.contributions) {
        // Return full array so client can filter by month or year dynamically
        contributions = contribData.contributions;
      }
      if (contribData.total) {
        const totals = Object.values(
          contribData.total as Record<string, number>,
        );
        totalCommits = totals.reduce((sum, val) => sum + val, 0);
      }
    }

    // 4. Count languages and compile statistics
    const languagesMap: Record<string, number> = {};
    let totalLangs = 0;

    reposData.forEach((repo: { language: string }) => {
      if (repo.language) {
        languagesMap[repo.language] = (languagesMap[repo.language] || 0) + 1;
        totalLangs++;
      }
    });

    const languages = Object.keys(languagesMap)
      .map((key) => ({
        name: key,
        percentage: Math.round((languagesMap[key] / totalLangs) * 100),
        color: getLanguageColor(key),
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 4);

    return NextResponse.json({
      publicRepos: profileData.public_repos || 18,
      followers: profileData.followers || 10,
      totalCommits: totalCommits || 257,
      languages: languages.length > 0 ? languages : defaultLanguages,
      contributions: contributions.length > 0 ? contributions : [],
    });
  } catch (error: unknown) {
    console.error("GitHub API error:", error);

    return NextResponse.json({
      publicRepos: 18,
      followers: 10,
      totalCommits: 257,
      languages: defaultLanguages,
      contributions: [],
      cachedFallback: true,
    });
  }
}

function getLanguageColor(lang: string): string {
  const colors: Record<string, string> = {
    TypeScript: "bg-blue-500",
    JavaScript: "bg-yellow-400",
    HTML: "bg-orange-500",
    CSS: "bg-indigo-500",
    CSS3: "bg-indigo-500",
    Vue: "bg-green-500",
    Python: "bg-blue-400",
    Java: "bg-red-400",
  };
  return colors[lang] || "bg-teal-400";
}

const defaultLanguages = [
  { name: "TypeScript / JS", percentage: 70, color: "bg-yellow-400" },
  { name: "React / Next.js", percentage: 85, color: "bg-blue-500" },
  { name: "Angular / Ionic", percentage: 55, color: "bg-red-500" },
  { name: "HTML / CSS / Tailwind", percentage: 90, color: "bg-teal-400" },
];
