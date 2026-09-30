'use strict';

const citations = {
  fpga: `@article{liu2025cloudfpga,
  title   = {Watch Out for the Inherent Vulnerabilities in Developing Multi-tenant Cloud-FPGA: Communication Protocols},
  author  = {Liu, Ziyu and Luo, Yukui and Zhang, Yuheng and Duan, Shijin and Xu, Xiaolin},
  journal = {ACM Transactions on Design Automation of Electronic Systems},
  volume  = {30},
  number  = {1},
  pages   = {13:1--13:24},
  year    = {2025},
  doi     = {10.1145/3702324}
}`,
  tbnet: `@inproceedings{liu2024tbnet,
  title     = {{TBNet}: A Neural Architectural Defense Framework Facilitating {DNN} Model Protection in Trusted Execution Environments},
  author    = {Liu, Ziyu and Zhou, Tong and Luo, Yukui and Xu, Xiaolin},
  booktitle = {Proceedings of the 61st ACM/IEEE Design Automation Conference},
  pages     = {1--6},
  year      = {2024},
  doi       = {10.1145/3649329.3658251},
  url       = {https://arxiv.org/abs/2405.03974}
}`,
  mirrornet: `@inproceedings{liu2023mirrornet,
  title     = {{MirrorNet}: A {TEE}-Friendly Framework for Secure On-device {DNN} Inference},
  author    = {Liu, Ziyu and Luo, Yukui and Duan, Shijin and Zhou, Tong and Xu, Xiaolin},
  booktitle = {2023 IEEE/ACM International Conference on Computer Aided Design (ICCAD)},
  pages     = {1--9},
  year      = {2023},
  doi       = {10.1109/ICCAD57390.2023.10323746},
  url       = {https://arxiv.org/abs/2311.09489}
}`
};

const themeToggle = document.querySelector('.theme-toggle');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
let chosenTheme = null;
try { chosenTheme = localStorage.getItem('ziyu-theme'); } catch { /* Storage is optional. */ }
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`;
  themeToggle.setAttribute('aria-label', label);
  themeToggle.title = label;
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#171e1a' : '#f8f9f6';
}
setTheme(chosenTheme === 'dark' || chosenTheme === 'light' ? chosenTheme : (systemDark.matches ? 'dark' : 'light'));
themeToggle.hidden = false;
themeToggle.addEventListener('click', () => {
  chosenTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(chosenTheme);
  try { localStorage.setItem('ziyu-theme', chosenTheme); } catch { /* Storage is optional. */ }
});
systemDark.addEventListener('change', event => {
  if (!chosenTheme) setTheme(event.matches ? 'dark' : 'light');
});

const dialog = document.querySelector('#citation-dialog');
const citationText = document.querySelector('#citation-text');
const copyStatus = document.querySelector('#copy-status');
const copyButton = document.querySelector('#copy-citation');
if (typeof dialog.showModal === 'function') {
  document.querySelectorAll('.bib-trigger').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => {
      citationText.textContent = citations[button.dataset.bib];
      copyStatus.textContent = '';
      copyButton.textContent = 'Copy citation';
      dialog.showModal();
    });
  });
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(citationText.textContent);
      copyButton.textContent = 'Copied ✓';
      copyStatus.textContent = 'Citation copied to clipboard.';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(citationText);
      selection.removeAllRanges();
      selection.addRange(range);
      citationText.focus();
      copyStatus.textContent = 'Citation selected. Press Ctrl+C or ⌘C to copy.';
    }
  });
}

const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = navLinks.map(link => document.querySelector(link.hash));
let scheduled = false;
function updateNavigation() {
  let active = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 150) active = section;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) active = sections[sections.length - 1];
  navLinks.forEach(link => {
    if (link.hash === `#${active.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
}, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();
document.querySelector('#current-year').textContent = new Date().getFullYear();
