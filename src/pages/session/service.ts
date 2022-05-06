import { fetchResult } from '#H/UseResult'
import { IUser } from '#P/users/service'

interface RegisterForm {
  username: string
  password: string
}

export function postRegister(form: RegisterForm) {
  return fetchResult<IUser>('/api/register', {
    method: 'POST',
    body: JSON.stringify(form),
    successText: 'Register Success',
    failureName: 'Register Failure',
  }).then((result) => result.data)
}

export function findCurrnet() {
  return fetchResult<IUser>('/api/session/current').then((result) => {
    const target = result.data as any
    result.data!.accessOn = target.lastLoggedIn
    result.data!.createOn = target.registerDate
    return result.data
  })
}
