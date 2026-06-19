import { log } from 'console';
import { NextResponse } from 'next/server';

export async function GET() {
  const username = process.env.GITHUB_USERNAME || 'RuchitaSenjaliya';
  const token = process.env.GITHUB_PAT;

  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  };

  // If GITHUB_PAT is set in env variables, add authorization headers to support higher rate limits
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  try {
    // 1. Fetch general user profile data
    const profileRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 }, // Cache on server for 1 hour
    });

    if (!profileRes.ok) {
      throw new Error(`GitHub Profile API responded with status: ${profileRes.status}`);
    }

    const profileData = await profileRes.json();

    // 2. Fetch public repository lists
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=owner`, {
      headers,
      next: { revalidate: 3600 }, // Cache on server for 1 hour
    });    

    if (!reposRes.ok) {
      throw new Error(`GitHub Repos API responded with status: ${reposRes.status}`);
    }

    const reposData = await reposRes.json();

    // 3. Count languages and compile statistics
    const languagesMap: Record<string, number> = {};
    let totalLangs = 0;

    reposData.forEach((repo: any) => {
      if (repo.language) {
        languagesMap[repo.language] = (languagesMap[repo.language] || 0) + 1;
        totalLangs++;
      }
    });

    // Translate counts to percentages
    const languages = Object.keys(languagesMap)
      .map((key) => ({
        name: key,
        percentage: Math.round((languagesMap[key] / totalLangs) * 100),
        color: getLanguageColor(key),
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 4); // Show top 4 languages used

    return NextResponse.json({
      publicRepos: profileData.public_repos || 18,
      followers: profileData.followers || 10,
      totalCommits: 1424, // Mock/estimate count (REST api lacks aggregate commit endpoints without heavy rate limit usage)
      languages: languages.length > 0 ? languages : defaultLanguages,
    });
  } catch (error: any) {
    console.error('GitHub API error:', error);
    
    // Return graceful fallback mock data so the dashboard doesn't break if rate limited or offline
    return NextResponse.json({
      publicRepos: 18,
      followers: 10,
      totalCommits: 1424,
      languages: defaultLanguages,
      cachedFallback: true,
    });
  }
}

// Map standard coding languages to Tailwind styling colors
function getLanguageColor(lang: string): string {
  const colors: Record<string, string> = {
    'TypeScript': 'bg-blue-500',
    'JavaScript': 'bg-yellow-400',
    'HTML': 'bg-orange-500',
    'CSS': 'bg-indigo-500',
    'CSS3': 'bg-indigo-500',
    'Vue': 'bg-green-500',
    'Python': 'bg-blue-400',
    'Java': 'bg-red-400',
  };
  return colors[lang] || 'bg-teal-400';
}

const defaultLanguages = [
  { name: 'TypeScript / JS', percentage: 70, color: 'bg-yellow-400' },
  { name: 'React / Next.js', percentage: 85, color: 'bg-blue-500' },
  { name: 'Angular / Ionic', percentage: 55, color: 'bg-red-500' },
  { name: 'HTML / CSS / Tailwind', percentage: 90, color: 'bg-teal-400' },
];
