n(){
    pc.isMobile = function() {
        return /Android/i.test(navigator.userAgent) ||
            /iPhone|iPad|iPod/i.test(navigator.userAgent);
    };
})();
