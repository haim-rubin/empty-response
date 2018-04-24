(function () {


  const xhrRequest = (url, { method = 'GET', headers = {}, body } = {}) => (
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method , url)

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      })

      xhr.onload = () => {
        console.log(xhr.status, xhr.response, Object.keys(xhr.response));
        xhr.status >= 200 && xhr.status < 300
          ? resolve(xhr.response)
          : reject(xhr.response)
      }

      xhr.onerror = () => {
        reject(xhr.response)
      }

      xhr.send(body)
    })
  )

  const fetchRequest = (api) => (
    fetch(api)
      .then(res => res.json())
  )

  const fetchButton = document.getElementById(`${'btnFetch'}`)
  const xhrButton = document.getElementById(`${'btnXHR'}`)
  const container = document.getElementById(`${'container'}`)

  const getWith = request => Promise.all([
      request("/api/data1?seconds=2"),
      request("/api/data2?seconds=2"),
      request("/api/data3?seconds=2")
    ]).then(([{ data: d1 }, { data: d2 }, { data: d3 }]) => [d1, d2, d3]);
  const attach = (button, request, container, message, milli = 1500) => {
    button.addEventListener('click', (e) => {
      container.innerHTML = ''
      getWith(request)
        .then(([d1, d2, d3]) => {
          container.innerHTML = `${d1}${d2}${d3}`;
        })
        .catch(err => {
          alert(`${message}: ${JSON.stringify(err)}`);
        });

      setTimeout(() => {
        location.reload();
      }, milli)
    })
  }

  attach(fetchButton, fetchRequest, container, `This alert raised from in fetch it's catch when refreshig the page during fetch call, with an empty error`, 1500);
  attach(xhrButton, xhrRequest, container, `This alert raised from in XmlHttpRequest it's catch when refreshig the page during fetch call, with an empty error`, 2000);
})()
