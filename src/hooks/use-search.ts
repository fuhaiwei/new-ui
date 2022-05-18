import useUrlState, { Options } from '@ahooksjs/use-url-state'

interface ExtraOptions<T> {
  arrayNames?: string[]
  initialState?: T | (() => T)
}

export const useSerach = <T>(options: Options & ExtraOptions<T>) => {
  const { arrayNames, initialState, ...rest } = options
  const myOptions: Options = {
    stringifyOptions: { arrayFormat: 'comma' },
    parseOptions: { arrayFormat: 'comma' },
    ...rest,
  }
  const [state, setState] = useUrlState(initialState, myOptions)
  const array = state as any
  arrayNames?.forEach((name) => {
    array[name] = toArray(array[name])
  })
  return [state, setState] as const
}

function toArray(array: string[]) {
  return typeof array === 'string' ? [array] : array ?? []
}
