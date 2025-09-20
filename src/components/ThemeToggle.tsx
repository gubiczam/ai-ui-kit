export function ThemeToggle() {
  const toggle = () => {
    const el = document.documentElement;
    const isDark = el.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };
  return (
    <button
      onClick={toggle}
      className="px-3 py-1.5 rounded-md border text-sm"
    >
      Light/Dark
    </button>
  );
}
