(function(){
    var btn = document.getElementById('toggle-tema');
    var root = document.documentElement;
    function apply(theme){
      if(theme === 'dark'){
        root.setAttribute('data-theme','dark');
        btn.textContent = '☀️ Modo claro';
        btn.setAttribute('aria-pressed','true');
      } else {
        root.setAttribute('data-theme','light');
        btn.textContent = '🌙 Modo escuro';
        btn.setAttribute('aria-pressed','false');
      }
    }
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    apply(prefersDark ? 'dark' : 'light');
    btn.addEventListener('click', function(){
      var isDark = root.getAttribute('data-theme') === 'dark';
      apply(isDark ? 'light' : 'dark');
    });

    // aria-current no item de menu conforme a seção visível
    var sections = ['inicio','conteudo-principal','midias','sobre'].map(function(id){ return document.getElementById(id); });
    var links = Array.prototype.slice.call(document.querySelectorAll('nav.primary a'));
    if('IntersectionObserver' in window){
      var obs = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            links.forEach(function(l){ l.removeAttribute('aria-current'); });
            var match = links.find(function(l){ return l.getAttribute('href') === '#' + entry.target.id; });
            if(match){ match.setAttribute('aria-current','page'); }
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(function(s){ if(s){ obs.observe(s); } });
    }
  })();