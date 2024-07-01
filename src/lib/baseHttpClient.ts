export const baseHttpClient = {
  async get<T>(
    url: string,
    options: RequestInit | undefined,
    responseTypeValidator: TypeValidator<object, T>,
  ): Promise<ApiResponse<T>> {
    return request(url, responseTypeValidator, options)
  },

  async post<T>(
    url: string,
    body: object,
    options: RequestInit | undefined,
    responseTypeValidator: TypeValidator<object, T>,
  ): Promise<ApiResponse<T>> {
    return request(url, responseTypeValidator, {
      method: 'POST',
      ...(body === null ? {} : { body: JSON.stringify(body) }),
      ...options,
    })
  },
}

type TypeValidator<T, D> = (
  responseData: T,
) => { isValid: true; data: D } | { isValid: false; error: any }

const request = async <T>(
  url: string,
  responseTypeValidator: TypeValidator<object, T>,
  options?: RequestInit,
): Promise<ApiResponse<T>> => {
  const mergedOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  }

  try {
    const res = await fetch(url, mergedOptions)
    if (!res.ok) {
      const errorResponse = await res.json()
      if (errorResponse === undefined) {
        return {
          error: {
            reason: 'RequestNotReachedServer',
            message: `Request did not reach the server: ${res.url}:${res.status}`,
          },
          data: undefined,
        }
      } else {
        return {
          error: {
            reason: errorResponse.error.reason,
            message: `Request failed: ${res.url}:${res.status} `,
          },
          data: undefined,
        }
      }
    }
    const rowResponseData = await res.json()

    const validatorResult = responseTypeValidator(rowResponseData)
    if (!validatorResult.isValid) {
      return {
        error: {
          reason: 'ValidationError',
          message: 'Response data is invalid',
        },
        data: undefined,
      }
    }

    return {
      error: undefined,
      data: validatorResult.data,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: {
          reason: 'ApiClientInternalError',
          message: error.message,
        },
        data: undefined,
      }
    } else {
      return {
        error: {
          reason: 'ApiClientInternalError',
          message: 'Unknown error occured',
        },
        data: undefined,
      }
    }
  }
}

export type ApiResponse<T> =
  | {
      error: ApiError
      data: undefined
    }
  | {
      error: undefined
      data: T
    }

type ApiError = {
  reason: string
  message: string
}
