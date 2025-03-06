window.onscroll = function () {
    const button = document.getElementById("scrollToTop");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      button.classList.add("show");
    } else {
      button.classList.remove("show");
    }
  };

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }