export function Footer() {
  return (
    <footer className="text-center text-gray-700 dark:text-gray-300 py-6 text-sm md:text-base">
      <p>
        Todos os direitos reservados © {new Date().getFullYear()} -{" "}
        <span className="hover:text-black duration-500 hover:cursor-pointer">
          Prius Sistemas
        </span>
      </p>
    </footer>
  );
}
