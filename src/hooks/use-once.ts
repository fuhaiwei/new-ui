import { useRequest } from 'ahooks'
import { debounce } from 'lodash'
import { useCallback, useEffect } from 'react'

export function useOnceService(service: () => void, deps: React.DependencyList) {
  const callback = useCallback(debounce(service, 50), [service, ...deps])
  useEffect(callback, [callback])
}

type UseRequest = typeof useRequest

export const useOnceRequest: UseRequest = (service, options, plugins) => {
  const myOptions = {
    ...options,
    debounceWait: 50,
  }
  return useRequest(service, myOptions, plugins)
}
