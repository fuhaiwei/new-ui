import { Button, PageHeader, PageHeaderProps } from 'antd'

interface Props extends PageHeaderProps {
  loading?: boolean
  refresh?: () => void
}

const defaultOnBack = () => window.history.back()

export function MyHeader(props: Props) {
  const { loading, refresh, extra, ...other } = props
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
    />
  )
}
