const scrollDirective = {
    update: function (el, binding) {

        el._trackScroll = function () {
            let scrolled = window.pageYOffset;
            let curHeight = document.documentElement.clientHeight;
            let maxHeight = document.documentElement.scrollHeight;
            if (binding.value == 'top' || !binding.value) {
                if (scrolled > curHeight) {
                    el.style.display = 'block';
                }
                if (scrolled < curHeight) {
                    el.style.display = 'none';
                }
            }
            if (binding.value == 'bottom') {
                if (scrolled > curHeight) {
                    el.style.display = 'block';
                }
                if (scrolled < curHeight || scrolled >= maxHeight - curHeight) {
                    el.style.display = 'none';
                }
            }
        }
        
        el._scroll = function () {
            if (binding.value == 'top' || !binding.value) {
                if (window.pageYOffset > 0) {
                    window.scroll({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                }
            }
            if (binding.value == 'bottom') {
                if (window.pageYOffset < document.documentElement.scrollHeight) {
                    window.scroll({
                        top: document.documentElement.scrollHeight,
                        left: 0,
                        behavior: 'smooth'
                    });
                }
            }
        }
          
        window.addEventListener('scroll', el._trackScroll);
        el.addEventListener('click', el._scroll);
    },
    unbind: function (el) {
        window.removeEventListener('scroll', el._trackScroll);
        el.removeEventListener('click', el._scroll);
    }
  }

  export default scrollDirective;