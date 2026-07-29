/**
 * Cliente API genérico que elimina la duplicación en todos los servicios
 * Centraliza el manejo de errores y configuración de headers
 */

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions {
  method?: HTTPMethod;
  body?: any;
  headers?: Record<string, string>;
}

class ApiClient {
  private baseHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { method = "GET", body, headers = {} } = options;

    const config: RequestInit = {
      method,
      headers: { ...this.baseHeaders, ...headers },
    };

    if (body && method !== "GET") {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(endpoint, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || errorData.message || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    // Handle no content responses
    if (response.status === 204 || response.headers.get("content-length") === "0") {
      return {} as T;
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, { method: "POST", body: data });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, { method: "PUT", body: data });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, { method: "PATCH", body: data });
  }

  async delete<T = void>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const apiClient = new ApiClient();

// Helper functions para construcción de URLs comunes
export const buildAdminUrl = (postTypeSlug: string, resource: string, id?: string) => {
  let url = `/api/admin/${postTypeSlug}/${resource}`;
  if (id) url += `/${id}`;
  return url;
};

export const buildQueryUrl = (baseUrl: string, params: Record<string, string>) => {
  const queryString = new URLSearchParams(params).toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};
