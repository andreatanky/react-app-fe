import { Searchbar, type SearchbarProps } from '../../../components/search/Searchbar'

import { useHomeSearch } from '../hooks/useHomeSearch'

type HomeSearchInputProps = Omit<SearchbarProps, 'query' | 'onQueryChange'>

export const HomeSearchInput = ({
  onSubmit,
  ...rest
}: HomeSearchInputProps) => {
  const { query, setQuery } = useHomeSearch()

  return (
    <Searchbar
      {...rest}
      query={query}
      onQueryChange={setQuery}
      onSubmit={onSubmit}
    />
  )
}
