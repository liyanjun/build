
function load(){
    var lodingTpl = ` <div id="loading3">
          <div class="demo3"></div>
          <div class="demo3"></div>
        <div class="demo3"></div>
           <div class="demo3"></div>
           <div class="demo3"></div>
          <div class="demo3"></div>
          <div class="demo3"></div>
          <div class="demo3"></div>
      </div>`
    $('body').append(lodingTpl)
}

function removeLoad () {
    $('#loading3').remove()
}