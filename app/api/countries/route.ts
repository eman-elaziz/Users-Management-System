import { NextResponse } from "next/server";

interface CountryApiItem {
  name: string;
  alpha2Code: string;
}

interface SelectOption {
  label: string;
  value: string;
}

const COUNTRIES_API =
  "https://countries.dev/countries?fields=name,alpha2Code&sort=name";

const DEFAULT_LIMIT = 10;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const pageParam = Number(searchParams.get("page"));
    const limitParam = Number(searchParams.get("limit"));
    const search = searchParams.get("search")?.trim() ?? "";

    const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

    const limit =
      Number.isFinite(limitParam) && limitParam > 0
        ? Math.min(limitParam, 50)
        : DEFAULT_LIMIT;

    const response = await fetch(COUNTRIES_API, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }

    const countries = (await response.json()) as CountryApiItem[];

    // Remove duplicate country codes
    const uniqueCountries = Array.from(
      new Map(
        countries.map((country) => [country.alpha2Code, country]),
      ).values(),
    );

    const filteredCountries = search
      ? uniqueCountries.filter((country) =>
          country.name.toLowerCase().includes(search.toLowerCase()),
        )
      : uniqueCountries;

    const total = filteredCountries.length;
    const totalPages = Math.ceil(total / limit);

    const start = (page - 1) * limit;

    const paginatedCountries = filteredCountries.slice(start, start + limit);

    const data: SelectOption[] = paginatedCountries.map((country) => ({
      label: country.name,
      value: country.alpha2Code,
    }));

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    console.error("Countries API error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch countries",
      },
      {
        status: 500,
      },
    );
  }
}
