const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {},
): Promise<T> {
    console.log(API_BASE_URL);
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultHeaders = {
        "Content-Type": "application/json",
    };

    const response = await fetch(url, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
    }

    return data;
}
