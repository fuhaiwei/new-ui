import { Alert, Button, PageHeader, PageHeaderProps, Space } from 'antd'

interface Props extends PageHeaderProps {
  error?: { name: string; message: string }
  loading?: boolean
  refresh?: () => void
}

const defaultOnBack = () => window.history.back()

export function MyHeader(props: Props) {
  const { error, loading, refresh, title, ...other } = props
  const lastTitle = (
    <Space>
      {title}
      {refresh && (
        <Button loading={loading} onClick={refresh}>
          刷新
        </Button>
      )}
    </Space>
  )
  return (
    <div className="MyHeader">
      <PageHeader title={lastTitle} onBack={defaultOnBack} {...other} />
      {error && <Alert type="error" message={`${error.name}: ${error.message}`} />}
    </div>
  )
}
