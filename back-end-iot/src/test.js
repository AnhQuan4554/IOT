setInterval(function () {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('temperature').innerHTML = this.responseText;
    }
  };
  xhttp.open('GET', '/temperature', true);
  xhttp.send();
}, 100);
setInterval(function () {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('humidity').innerHTML = this.responseText;
    }
  };
  27;
  xhttp.open('GET', '/humidity', true);
  xhttp.send();
}, 1000);
setInterval(function () {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('lightsensor').innerHTML = this.responseText;
    }
  };
  xhttp.open('GET', '/lightsensor', true);
  xhttp.send();
}, 1000);
