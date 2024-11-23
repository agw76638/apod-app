const side = document.getElementById('slide-out');

side.innerHTML = `
    <li><a href="index.html">APOD</a></li>
    <li><a href="randomAPOD.html"> Random APOD Generator</a></li>
    <li><a href="calendar.html">Calendar</a></li>
`;

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {
    // specify options here
  });
});

// Initialize collapsible (uncomment the lines below if you use the dropdown variation)
// var collapsibleElem = document.querySelector('.collapsible');
// var collapsibleInstance = M.Collapsible.init(collapsibleElem, {
//  // specify options here
// });
