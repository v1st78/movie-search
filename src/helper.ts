const addToSaved = (id: number) => {
  const saved = JSON.parse(localStorage.getItem('saved') || '[]');

  saved.push(id);

  localStorage.setItem('saved', JSON.stringify(saved));
}

const removeFromSaved = (idToRemove: number) => {
  let saved: number[] = JSON.parse(localStorage.getItem('saved') || '[]');

  saved = saved.filter(id => id !== idToRemove);

  localStorage.setItem('saved', JSON.stringify(saved));
}

export {addToSaved, removeFromSaved}