import $ from 'jQuery'
var SH = {}
export default SH
SH.ajax = {

  callRemote (api, payload, type, callback) {
    let data = ''
    if (payload) {
      data = JSON.stringify(payload)
    }
    $.ajax({
      url: api,
      headers: {'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU5NTMxODQ4MX0.IxP2CR-cCmX3LgbMle0dBVrLIamPNGx4VG25FPw7GCfmNaB0Xm4ZsdZ_ULikLJpXoq80nuoDSGcX6IMpvnqFQw'},
      type: type,
      contentType: 'application/json',
      data: data,
      success: function (data, textStatus) {
        if (callback) {
          return callback(data, textStatus)
        }
      },
      error: function (data, textStatus, jqXHR) {
        if (callback) {
          return callback(data.responseJSON, textStatus)
        }
      }
    })
  }
}
