interface RequestOptions extends RequestInit {
  responseType?: "json" | "blob";
}

export const request = async <T>(
  url: string,
  options: RequestOptions
): Promise<T> => {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Erro na requisição");
    }

    if (options.responseType === "blob") {
      return (await res.blob()) as T;
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};
