class UploadAdapter {
  constructor (loader) {
    // Save Loader instance to update upload progress.
    this.loader = loader
  }

  abort () {
    // Reject promise returned from upload() method.
  }
}

export default UploadAdapter
