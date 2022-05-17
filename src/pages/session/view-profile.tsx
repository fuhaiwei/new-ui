import { call } from '#A/store'
import { sessionLogout } from '#F/session/slice'
import { useOnceRequest } from '#H/use-once'
import * as renders from '#P/users/renders'
import { useWhyDidYouUpdate } from 'ahooks'
import { Alert, Button, Card } from 'antd'
import { findCurrnet } from './service'

export function Profile() {
  const { data: user, error, ...state } = useOnceRequest(findCurrnet)
  useWhyDidYouUpdate('Profile', { user, error, ...state })
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
          <p>ID: {renders.renderId(user)}</p>
          <p>Name: {renders.renderName(user)}</p>
          <p>Roles: {renders.renderRoles(user)}</p>
          <p>Enabled: {renders.renderEnabled(user)}</p>
          <p>CreateOn: {renders.renderCreateOn(user)}</p>
          <p>AccessOn: {renders.renderAccessOn(user)}</p>
        </>
      )}
    </Card>
  )
}
