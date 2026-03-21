import { NextResponse } from "next/server";

const blackList: string[] = ["Jupyter Notebook", "TeX", "Makefile"];

export async function GET() {
    const username = "aryelsoares";
    const projAmount = 20;
    const projLangs = 5;

    // Query
    const query = `
      query {
        user(login: "${username}") {
          repositories(first: ${projAmount}, orderBy: {field: UPDATED_AT, direction: DESC}, isFork: false) {
            nodes {
              name
              languages(first: ${projLangs}) {
                edges {
                  size
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
        const res: Response = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                "Content-Type": "application/json",
                "User-Agent": "nextjs-app"
            },
            body: JSON.stringify({ query }),
            next: { revalidate: 86400 } // 24h
        });

        const { data } = await res.json();
        const repos = data.user.repositories.nodes;
        let languageTotals: Record<string, number> = {};

        repos.forEach((repo: any) => {
            repo.languages.edges.forEach((langEdge: any) => {
                const langName = langEdge.node.name;
                const size = langEdge.size;

                if (!blackList.includes(langName)) {
                    languageTotals[langName] = (languageTotals[langName] || 0) + size
                }
            });
        });

        // Bytes sum
        const totalBytes = Object.values(languageTotals).reduce((a, b) => a + b, 0);

        // Data sorted
        const sorted = Object.entries(languageTotals)
            .map(([name, bytes]) => ({
                name,
                percentage: Number(((bytes / totalBytes) * 100).toFixed(2))
            }))
            .sort((a, b) => b.percentage - a.percentage)
            .reduce((acc, curr) => {
                acc[curr.name] = curr.percentage;
                return acc;
            }, {} as Record<string, number>);
        
        return NextResponse.json(sorted);

    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}