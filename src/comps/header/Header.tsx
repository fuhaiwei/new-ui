import { Alert, Button, PageHeader, PageHeaderProps } from 'antd'

interface Props extends PageHeaderProps {
  error?: { name: string; message: string }
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
    <div className="MyHeader">
      <PageHeader
        onBack={defaultOnBack}
        extra={
          <>
            {button}
            {extra}
          </>
        }
        {...other}
      />
      {error && <Alert type="error" message={`${error.name}: ${error.message}`} />}
    </div>
  )
}
