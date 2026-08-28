export interface Country {
  name: string;
  code: string;
}

interface CountriesResponse {
  data: Country[];
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

export async function getCountries(
  page: number,
  search = "",
): Promise<CountriesResponse> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: "10",
  });

  if (search) {
    params.set("search", search);
  }

  const response = await fetch(`/api/countries?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  return response.json() as Promise<CountriesResponse>;
}
