async function makeFetch(endpoint) {
  await fetch(endpoint, {
    method: 'POST'
  });
  location.reload();
}

window.onload = () => {
  document.querySelectorAll('.box').forEach(box => {
    const upButton = box.querySelector('.up');
    const downButton = box.querySelector('.down');
    const deleteButton = box.querySelector('.delete');
    const filename = box.querySelector('.filename').textContent;

    upButton.onclick = () => makeFetch(`/up/${filename}`);
    downButton.onclick = () => makeFetch(`/down/${filename}`);
    deleteButton.onclick = () => makeFetch(`/delete/${filename}`);
  });
};
