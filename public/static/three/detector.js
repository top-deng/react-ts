window.Detector={
  canvas: !! window.CanvasRenderingContext2D,
  webgl: ( function () {
    try {
      let canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) )
    } catch ( e ) {
      return false
    }

  } )(),
  webgl2: ( function () {
    try {
      let canvas = document.createElement( 'canvas' ); return !! ( window.WebGL2RenderingContext && ( canvas.getContext( 'webgl2' ) ) )
    } catch ( e ) {
      return false
    }
  } )(),
  workers: !! window.Worker,
  fileapi: window.File && window.FileReader && window.FileList && window.Blob,
  getWebGLErrorMessage: function () {
    let menage=''
    if ( ! this.webgl ) {
      menage=window.WebGLRenderingContext ?'您的显卡不支持WebGL,已为你自动却还兼任模式':'你的浏览器版本不支持WebGL,为了您的浏览效果，建议您换最新版本的浏览器访问。'
    }
    return menage
  },

  addGetWebGLMessage: function ( parameters ) {
    let parent, id, element
    parameters = parameters || {}
    parent = parameters.parent !== undefined ? parameters.parent : document.body
    id = parameters.id !== undefined ? parameters.id : 'oldie'
    element = Detector.getWebGLErrorMessage()
    element.id = id
    parent.appendChild( element )
  }
}
