import styled from '@emotion/styled'
import Label from '../../../../components/labels/Label'
import interpunct from '@/assets/icons/interpunct.svg'

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.3rem;
  color: var(--color-on-surface-variant);
  font-size: 0.9rem;
`

const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
`

const Separator = styled.img`
  width: 4px;
  height: 4px;
  margin-top: 4px;
`

const Spacer = styled.span`
  flex: 1;
  min-width: 1rem;
`

const Badges = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const ProductCardHeader = ({
  publishedDisplay,
  expired,
  isUrgent,
}: {
  publishedDisplay: string | null
  expired: boolean
  isUrgent: boolean
}) => (
  <MetaRow>
    {publishedDisplay && (
      <>
        <MetaItem>Published {publishedDisplay}</MetaItem>
        <Separator src={interpunct} alt="" aria-hidden="true" />
      </>
    )}

    <MetaItem>{expired ? 'Expired' : 'Expires in 4 days'}</MetaItem>
    <Spacer />
    <Badges>
      {isUrgent && (
        <Label
          text="Urgent"
          backgroundColor="var(--color-secondary)"
          textColor="var(--color-on-primary, #0f172a)"
        />
      )}
    </Badges>
  </MetaRow>
)

export default ProductCardHeader
