document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("mainHeader");
    const openingSection = document.getElementById("opening");
    const mainContent = document.getElementById("mainContent");

    // 스크롤 이벤트를 감지하여 헤더 표시
    window.addEventListener("scroll", function () {
        if (window.scrollY > openingSection.clientHeight - 50) {
            document.body.classList.add("scrolled");
        } else {
            document.body.classList.remove("scrolled");
        }
    });

    // 스크롤 다운 인디케이터 클릭 시 스크롤 이동
    document.getElementById("scrollDownIndicator").addEventListener("click", function () {
        window.scrollTo({
            top: mainContent.offsetTop,
            behavior: "smooth"
        });
    });
});
