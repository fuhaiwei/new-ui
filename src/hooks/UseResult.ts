import { Modal } from 'antd'
import { useEffect, useState } from 'react'

export interface Result<Data> {
  success: boolean
  message?: string
  data?: Data
  page?: Page
}

export interface Page {
  pageSize: number
  currentPage: number
  totalElements: number
}

async function handleResponse(res: Response) {
  if (!res.ok) {
    return Promise.reject({ name: 'HttpError', message: res.statusText })
  }
  try {
    const json: Result<any> = await res.json()
    if (!json.success) {
      return Promise.reject({ name: 'ServerError', message: json.message })
    } else {
      return Promise.resolve(json)
    }
  } catch (err: any) {
    return Promise.reject({ type: 'ParseError', message: err.message })
  }
}

export function useResult<T>(callback: () => Promise<Response>) {
  const [value, setValue] = useState<T>()
  function refresh() {
    callback()
      .then(handleResponse)
      .then(({ data }) => {
        setValue(data)
      })
      .catch(({ name, message }) => {
        Modal.error({ title: name, content: message })
      })
  }
  useEffect(refresh, [callback])
  return [value, refresh] as [T | undefined, () => void]
}
