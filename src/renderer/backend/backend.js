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
        'Authorization': 'Bearer ' + localStorage.getItem('token')},
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
