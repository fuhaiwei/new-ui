import { call } from '#A/store'
import { sessionLogout } from '#F/session/slice'
import { useOnceRequest } from '#H/use-once'
import { IUser } from '#P/users/service'
import { useWhyDidYouUpdate } from 'ahooks'
import { Alert, Button, Card } from 'antd'
import dayjs from 'dayjs'
import { findCurrnet } from './service'

export function Profile() {
  const { data: user, error, ...state } = useOnceRequest(findCurrnet)
  useWhyDidYouUpdate('Profile', { ...state, error, user })
  return (
    <Card
      title="Profile"
      style={{ width: 320 }}
      extra={
        <Button type="link" onClick={() => call(sessionLogout())}>
          Logout
        </Button>
      }
    >
      {error && <Alert type="error" message={`${error.name}: ${error.message}`} />}
      {user && (
        <>
          <p>ID: {renderId(user)}</p>
          <p>Name: {renderName(user)}</p>
          <p>Roles: {renderRoles(user)}</p>
          <p>Enabled: {renderEnabled(user)}</p>
          <p>CreateOn: {renderCreateOn(user)}</p>
          <p>AccessOn: {renderAccessOn(user)}</p>
        </>
      )}
    </Card>
  )
}

export function renderId(row: IUser) {
  return row.id
}

export function renderName(row: IUser) {
  return row.username
}

export function renderRoles(row: IUser) {
  return row.roles.join(',')
}

export function renderEnabled(row: IUser) {
  return row.enabled ? 'Enabled' : 'Disabled'
}

export function renderCreateOn(row: IUser) {
  return dayjs(row.createOn).format('YY-MM-DD HH:mm:ss')
}

export function renderAccessOn(row: IUser) {
  if (row.accessOn === undefined) return '---'
  return dayjs(row.accessOn).format('YY-MM-DD HH:mm:ss')
}
