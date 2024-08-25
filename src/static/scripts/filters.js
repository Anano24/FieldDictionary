const filterContents = document.querySelectorAll('.filter-content')

filterContents.forEach((filterContent) => {
  const resetFiltersButton = filterContent.querySelector(
    '.reset-filters-button'
  )

  resetFiltersButton?.addEventListener('click', () => {
    const checkboxes = filterContent.querySelectorAll('input[type=checkbox]')

    checkboxes.forEach((checkbox) => (checkbox.checked = 0))
  })
})


// Example for debugging
console.log('Filter Contents:', filterContents);
console.log('Reset Button:', resetFiltersButton);
