export const navigate = [
  {
    link: 'link_list',
    target_ID: 'section_list',
  },
  {
    link: 'add_link',
    target_ID: 'add_section',
  },
  {
    link: 'contact_link',
    target_ID: 'contact_section',
  },
];

export const navigationLinks = () => {
  navigate.forEach((navigation) => {
    const link = document.getElementById(navigation.link);

    link.addEventListener('click', (e) => {
      e.preventDefault();

      const sections = document.querySelectorAll('main > section');
      sections.forEach((section) => {
        section.classList.add('_display_f_');
      });

      const target = document.getElementById(navigation.target_ID);
      target.classList.remove('_display_f_');
    });
  });
};
