import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'mahmud886';
  const per_page = searchParams.get('per_page') || '6';
  const sort = searchParams.get('sort') || 'updated';

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=${per_page}&sort=${sort}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          Accept: 'application/vnd.github.v3+json',
          // Use an environment variable if available to increase rate limits
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          }),
        },
      }
    );

    if (!res.ok) {
      throw new Error(`GitHub API responded with status ${res.status}`);
    }

    const repos = await res.json();
    
    // Filter out forks and transform data if necessary
    const filteredRepos = repos.filter((repo: any) => !repo.fork).map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      language: repo.language,
      topics: repo.topics || [],
      updated_at: repo.updated_at,
    }));

    return NextResponse.json({ repositories: filteredRepos });
  } catch (error: any) {
    console.error('Failed to fetch GitHub repos:', error);
    return NextResponse.json({ error: error.message, repositories: [] }, { status: 500 });
  }
}
