// ===== main.js =====
(function(){
  const btnMenu = document.getElementById('btnMenu');
  const nav = document.getElementById('menuPrincipal');
  if (btnMenu && nav) {
    btnMenu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btnMenu.setAttribute('aria-expanded', String(open));
    });
  }

  // Dropdown
  document.querySelectorAll('.nav__item--has-dropdown').forEach(item => {
    const btn = item.querySelector('.nav__dropdown-btn');
    const dropdown = item.querySelector('.nav__dropdown');
    if (!btn || !dropdown) return;
    btn.addEventListener('click', () => {
      const visible = dropdown.style.display === 'block';
      dropdown.style.display = visible ? 'none' : 'block';
      btn.setAttribute('aria-expanded', String(!visible));
    });
    document.addEventListener('click', (e)=>{
      if(!item.contains(e.target)){
        dropdown.style.display = 'none';
        btn.setAttribute('aria-expanded','false');
      }
    });
  });

  // Modal
  function openModal(sel){
    const m = document.querySelector(sel);
    if(!m) return;
    m.classList.add('open');
    m.setAttribute('aria-hidden','false');
    const focusable = m.querySelector('button, a, input, select, textarea');
    if (focusable) focusable.focus();
  }
  function closeModal(el){
    const m = el.closest('.modal');
    if(!m) return;
    m.classList.remove('open');
    m.setAttribute('aria-hidden','true');
  }
  document.querySelectorAll('[data-open-modal]').forEach(btn=>{
    btn.addEventListener('click', ()=> openModal(btn.getAttribute('data-open-modal')));
  });
  document.querySelectorAll('[data-close-modal], .modal__backdrop').forEach(btn=>{
    btn.addEventListener('click', ()=> closeModal(btn));
  });

  // Toast
  const toastC = document.querySelector('.toast-container');
  const btnToast = document.getElementById('btnToast');
  if(btnToast && toastC){
    btnToast.addEventListener('click', ()=>{
      const t = document.createElement('div');
      t.className = 'toast';
      t.role = 'status';
      t.textContent = 'Olá! Eu sou um toast.';
      toastC.appendChild(t);
      setTimeout(()=> t.remove(), 3500);
    });
  }

  // Validação do form
  const form = document.getElementById('demoForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const required = form.querySelectorAll('[required]');
      let ok = true;
      required.forEach(field=>{
        if(!field.checkValidity()){
          field.classList.add('is-invalid');
          field.classList.remove('is-valid');
          ok = false;
        } else {
          field.classList.remove('is-invalid');
          field.classList.add('is-valid');
        }
      });
      if(ok){
        if(toastC){
          const t = document.createElement('div');
          t.className = 'toast';
          t.role = 'status';
          t.textContent = 'Formulário válido!';
          toastC.appendChild(t);
          setTimeout(()=> t.remove(), 3000);
        }
        form.reset();
        required.forEach(f=> f.classList.remove('is-valid'));
      }
    });
  }
})();
