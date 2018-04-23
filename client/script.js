(function () {


  const request = (api) => (
    fetch(api)
      .then(res => res.json())
      .catch(err => {
        alert(JSON.stringify(err))
      })
  )

  const button = document.getElementById(`${'btnGetLong'}`);
  const container = document.getElementById(`${'container'}`);
  button.addEventListener('click', (e) => {
    container.innerHTML = ''
    Promise.all([
      request("/api/data1"),
      request("/api/data2"),
      request("/api/data3")
    ]).then(([{ data: d1 }, { data: d2 }, { data: d3 }]) => {
      container.innerHTML = `${d1}${d2}${d3}`;
      });
    setTimeout(() => {
      location.reload();
    }, 1500)
  })

})()