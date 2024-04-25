import './index.css'

const FilterData = props => {
  const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }
  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }
  const {searchInput} = props
  return (
    <div className="filter-container">
      <input
        value={searchInput}
        type="search"
        className="input-element-filter"
        placeholder="Search"
        onChange={onChangeSearchInput}
        onKeyDown={onEnterSearchInput}
      />
    </div>
  )
}

export default FilterData;