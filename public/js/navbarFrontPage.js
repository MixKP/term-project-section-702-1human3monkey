
document.addEventListener('DOMContentLoaded', function () {
    const userDropdown = document.getElementById('userDropdown');
    const userIcon = document.getElementById('userIcon');

    userDropdown.addEventListener('show.bs.dropdown', function () {
        // userIcon.classList.remove('bg-light');
        userIcon.classList.add('bg-warning');
    });

    userDropdown.addEventListener('hide.bs.dropdown', function () {
        userIcon.classList.remove('bg-warning');
        // userIcon.classList.add('bg-light');
    });
});

if (window.innerWidth > 600) { // Check if the screen width is less than or equal to 768px (mobile responsive)
  document.getElementById("toggleSearch").addEventListener("click", function () {
    let form = document.getElementById("searchForm");
  
    form.classList.toggle("d-none");
    });
  } else {
    console.log("Mobile responsive");
    document.getElementById("toggleSearch").addEventListener("click", function () {
      let form = document.getElementById("searchForm");
      let logo = document.querySelector(".navbar-brand");
      let login = document.querySelector(".dropdown");
      let cart = document.querySelector(".cart");
  
      logo.classList.toggle("d-none");
      login.classList.toggle("d-none");
      cart.classList.toggle("d-none");
      form.classList.toggle("d-none");
    });
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".navbar-toggler-icon").addEventListener("click", function () {
      let logo = document.querySelector(".navbar-brand");
      logo.style.position = "absolute";
      logo.style.top = "5.5px"; // Added px unit
      logo.style.left = "50%";
      logo.style.transform = "translateX(-50%)";
    });
  });