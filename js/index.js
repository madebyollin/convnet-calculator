var labels = Array.from(document.querySelectorAll("label"));

var $ = x => document.getElementById(x);

function toWH(x) {
  return (x) + "px";
}

function toDepth(depth) {
  var color = i => `hsl(0, 0%, ${40 + 40 * (i % 2)}%)`;
  var shadow = `1px 1px 0 ${color(0)}`;
  for (var i = 1; i < depth; i++) {
    shadow += `, ${i+1}px ${i+1}px 0 ${color(i)}`;
  }
  console.log(shadow);
  return shadow;
}

function updateDisplay() {
  var input = $("input");
  var output = $("output");
  var k = $("k").value;
  var f = $("f").value;
  var s = $("s").value;
  var p = $("p").value;
  var w = $("w").value;
  var h = $("h").value;
  var d = 128;
  input.style.width = toWH(w);
  input.style.height = toWH(h);
  input.style.boxShadow = toDepth(d);
  input.textContent = `${w}x${h}x${d}`;
  
  
  var wn = (w - f + 2 * p) / s + 1;
  var hn = (h - f + 2 * p) / s + 1;
  output.style.width = toWH(wn);
  output.style.height = toWH(hn);
  output.style.boxShadow = toDepth(k);
  output.textContent = `${wn}x${hn}x${k}`;
}

labels.map(x => {
  var value = document.createElement("span");
  value.classList.add("value");
  x.appendChild(value);
  var input = x.querySelector("input");
  var update = y => {
    value.textContent = input.value;
    updateDisplay();
  };
  input.addEventListener("input", update);
  update();
});
