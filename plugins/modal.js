function _createModal(options) {
  const DAFAULT_WIDTH = '600px'
  const modal = document.createElement('div')
  modal.classList.add('vmodal')
  modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close='true'>
      <div class="modal-window" style='width: ${options.width || DAFAULT_WIDTH}'>
        <div class="modal-header">
          <span class="modal-title">${options.title || 'Window'}</span>
          ${options.closable ? `<span class="modal-close" data-close='true'>&times;</span>` : ''}
        </div>
        <div class="modal-body" data-content>
          ${options.content || ''}
        </div>
        <div class="modal-footer">
          <button>OK</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  `)
  document.body.appendChild(modal)
  return modal
}

$.modal = function(options) {
  const $modal = _createModal(options)
  let destroyed = false

const modal = {
  open(){
    if (destroyed) {
      return console.log('Modal is destroyed');
    }
    $modal.classList.add('open')
  },
  close(){
    $modal.classList.remove('open')
  }
}

  const listener = event => {
    if (event.target.dataset.close) {
      modal.close()
    }
  }
 
  $modal.addEventListener('click', listener)

  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal)
      $modal.removeEventListener('click', listener)
      destroyed = true
    },
    setContent(html) {
      $modal.querySelector('[data-content]').innerHTML = html
    }
  })
}