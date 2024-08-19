export const scrollTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}