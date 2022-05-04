import { Alert, Button, PageHeader, PageHeaderProps } from 'antd'

interface Props extends PageHeaderProps {
  error?: Error
  loading?: boolean
  refresh?: () => void
}

const defaultOnBack = () => window.history.back()

export function MyHeader(props: Props) {
  const { error, loading, refresh, children, extra, ...other } = props
  const button = refresh && (
    <Button loading={loading} onClick={refresh}>
      刷新
    </Button>
  )
  return (
    <PageHeader
      onBack={defaultOnBack}
      extra={
        <>
          {button}
          {extra}
        </>
      }
      {...other}
    >
      {error && <Alert type="error" message={`${error.name}: ${error.message}`} />}
      {children}
    </PageHeader>
  )
}
